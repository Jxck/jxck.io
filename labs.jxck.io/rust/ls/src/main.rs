extern crate glob;
extern crate rand;

use std::cmp;
use std::fmt;
use std::fs;
use std::os::unix::fs::{FileTypeExt, MetadataExt};
use std::path::PathBuf;

type UserMode = (bool, bool, bool);
type GroupMode = (bool, bool, bool);
type OtherMode = (bool, bool, bool);
type Mode = (UserMode, GroupMode, OtherMode);

#[derive(PartialEq, PartialOrd, Eq, Ord)]
enum FileType {
    // TODO: 値いらない？
    Dir = 1,
    Pipe = 2,
    Socket = 3,
    Block = 4,
    Char = 5,
    Sym = 6,
    Exec = 7,
    File = 8,
}

#[allow(dead_code)]
struct Node {
    entry: fs::DirEntry,
    file_type: FileType,
    mode: Mode,
}
impl Node {
    fn new(entry: fs::DirEntry) -> Node {
        let (file_type, mode) = Node::file_type(&entry);
        let node = Node {
            entry,
            file_type,
            mode,
        };
        return node;
    }
    fn file_type(entry: &fs::DirEntry) -> (FileType, Mode) {
        let file_type = entry.file_type().unwrap();
        let mode = Node::permission(&entry);
        let file_type: FileType = if file_type.is_dir() {
            FileType::Dir
        } else if file_type.is_fifo() {
            FileType::Pipe
        } else if file_type.is_socket() {
            FileType::Socket
        } else if file_type.is_block_device() {
            FileType::Block
        } else if file_type.is_char_device() {
            FileType::Char
        } else if file_type.is_symlink() {
            FileType::Sym
        } else if Node::is_exec(mode) {
            FileType::Exec
        } else {
            FileType::File
        };
        return (file_type, mode);
    }
    fn permission(entry: &fs::DirEntry) -> Mode {
        let mode: u32 = entry.metadata().unwrap().mode();
        let user: UserMode = (
            mode & 0b100000000 > 0, // r
            mode & 0b010000000 > 0, // w
            mode & 0b001000000 > 0, // x
        );
        let group: GroupMode = (
            mode & 0b000100000 > 0, // r
            mode & 0b000010000 > 0, // w
            mode & 0b000001000 > 0, // x
        );
        let other: OtherMode = (
            mode & 0b000000100 > 0, // r
            mode & 0b000000010 > 0, // w
            mode & 0b000000001 > 0, // x
        );
        return (user, group, other);
    }
    fn is_exec(mode: Mode) -> bool {
        return match mode {
            ((_, _, true), _, _) => true,
            (_, (_, _, true), _) => true,
            (_, _, (_, _, true)) => true,
            _ => false,
        };
    }
    fn path(&self) -> PathBuf {
        return self.entry.path();
    }
    fn file_name(&self) -> String {
        return self
            .path()
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .to_string(); // ??
    }
    // fn is_dir(&self) -> bool {
    //     return self.file_type.is_dir();
    // }
    // #[allow(dead_code)]
    // fn is_file(&self) -> bool {
    //     return self.file_type.is_file();
    // }
    // #[allow(dead_code)]
    // fn is_fifo(&self) -> bool {
    //     return self.file_type.is_fifo();
    // }
    // fn is_socket(&self) -> bool {
    //     return self.file_type.is_socket();
    // }
    // fn is_block_device(&self) -> bool {
    //     return self.file_type.is_block_device();
    // }
    // fn is_char_device(&self) -> bool {
    //     return self.file_type.is_char_device();
    // }
    // fn is_symlink(&self) -> bool {
    //     return self.file_type.is_symlink();
    // }
}

impl Eq for Node {}

impl cmp::Ord for Node {
    fn cmp(&self, other: &Self) -> cmp::Ordering {
        // sort by file_type
        match self.file_type.cmp(&other.file_type) {
            cmp::Ordering::Less => cmp::Ordering::Less,
            cmp::Ordering::Greater => cmp::Ordering::Greater,
            cmp::Ordering::Equal => {
                // sort by file name in number or string
                let self_name = self.file_name();
                let other_name = &other.file_name();
                return match self_name.parse::<u8>() {
                    Ok(self_num) => match &other_name.parse::<u8>() {
                        Ok(other_num) => self_num.cmp(other_num),
                        Err(_) => self_name.cmp(other_name),
                    },
                    Err(_) => self_name.cmp(other_name),
                };
            }
        }
    }
}

impl cmp::PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.path() == other.path()
    }
}

impl cmp::PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<cmp::Ordering> {
        Some(self.cmp(other))
    }
}

impl fmt::Display for Node {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self.file_type {
            FileType::Dir => write!(f, "\x1b[0;34m{}\x1b[0m", self.file_name()), // dir -> navy
            FileType::Pipe => write!(f, "\x1b[1;31m{}\x1b[0m", self.file_name()), // pipe -> orange
            FileType::Socket => write!(f, "\x1b[1;33m{}\x1b[0m", self.file_name()), // socket -> yellow
            FileType::Block => write!(f, "\x1b[1;35m{}\x1b[0m", self.file_name()),  // block -> pink
            FileType::Char => write!(f, "\x1b[1;36m{}\x1b[0m", self.file_name()),   // char -> aqua
            FileType::Sym => {
                // sym -> cyan
                let link = std::fs::read_link(self.path()).unwrap();
                write!(
                    f,
                    "\x1b[0;36m{}\x1b[0m -> {}",
                    self.file_name(),
                    link.display()
                )
            }
            FileType::Exec => write!(f, "\x1b[0;31m{}\x1b[0m", self.file_name()), // exec -> red
            _ => write!(f, "{}", self.path().file_name().unwrap().to_str().unwrap()), // file
        }
    }
}

#[allow(dead_code)]
fn list(path: &str) {
    let mut nodes: Vec<Node> = fs::read_dir(path)
        .unwrap()
        .map(|d| Node::new(d.unwrap()))
        .collect();

    nodes.sort_unstable();
    for node in nodes {
        println!("{}", node);
    }
}

use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let mut path = ".";
    if args.len() > 1 {
        path = &args[1];
    }
    list(path);
}
