extern crate glob;
extern crate rand;

use glob::glob;
use std::fmt;
use std::fs;
use std::os::unix::fs::{FileTypeExt, MetadataExt};
use std::path::PathBuf;

type UserMode = (bool, bool, bool);
type GroupMode = (bool, bool, bool);
type OtherMode = (bool, bool, bool);
type Mode = (UserMode, GroupMode, OtherMode);

struct Node {
    entry: fs::DirEntry,
    file_type: fs::FileType,
}
impl Node {
    fn new(entry: fs::DirEntry) -> Node {
        let file_type = entry.file_type().unwrap();
        let node = Node {
            entry: entry,
            file_type: file_type,
        };
        return node;
    }
    fn is_dir(&self) -> bool {
        return self.file_type.is_dir();
    }
    #[allow(dead_code)]
    fn is_file(&self) -> bool {
        return self.file_type.is_file();
    }
    #[allow(dead_code)]
    fn is_fifo(&self) -> bool {
        return self.file_type.is_fifo();
    }
    fn is_socket(&self) -> bool {
        return self.file_type.is_socket();
    }
    fn is_block_device(&self) -> bool {
        return self.file_type.is_block_device();
    }
    fn is_char_device(&self) -> bool {
        return self.file_type.is_char_device();
    }
    fn is_symlink(&self) -> bool {
        return self.file_type.is_symlink();
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
    fn permission(&self) -> Mode {
        let mode: u32 = self.entry.metadata().unwrap().mode();
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
    fn is_exec(&self) -> bool {
        let mode: Mode = self.permission();
        return match mode {
            ((_, _, true), _, _) => true,
            (_, (_, _, true), _) => true,
            (_, _, (_, _, true)) => true,
            _ => false,
        };
    }
}

impl fmt::Display for Node {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        if self.is_dir() {
            // dir -> navy
            write!(f, "\x1b[0;34m{}\x1b[0m", self.file_name())
        } else if self.is_symlink() {
            let link = std::fs::read_link(self.path()).unwrap();
            // sym -> cyan
            write!(
                f,
                "\x1b[0;36m{} -> {}\x1b[0m",
                self.file_name(),
                link.display()
            )
        } else if self.is_exec() {
            // exec -> red
            write!(f, "\x1b[0;31m{}\x1b[0m", self.file_name())
        } else if self.is_socket() {
            // socket -> yellow
            write!(f, "\x1b[1;33m{}\x1b[0m", self.file_name())
        } else if self.is_block_device() {
            // block -> pink
            write!(f, "\x1b[1;35m{}\x1b[0m", self.file_name())
        } else if self.is_char_device() {
            // char -> aqua
            write!(f, "\x1b[1;36m{}\x1b[0m", self.file_name())
        } else if self.is_fifo() {
            // pipe -> orange
            write!(f, "\x1b[1;31m{}\x1b[0m", self.file_name())
        } else {
            write!(f, "{}", self.path().file_name().unwrap().to_str().unwrap())
        }
    }
}

#[allow(dead_code)]
fn mapped() {
    let dir_entries: Vec<fs::DirEntry> = fs::read_dir(".").unwrap().map(|d| d.unwrap()).collect();
    for entry in dir_entries {
        let node: Node = Node::new(entry);
        println!("{}", node);
    }
}

#[allow(dead_code)]
fn sorted() {
    let mut entries: Vec<std::path::PathBuf> = fs::read_dir(".")
        .unwrap()
        .map(|entry| entry.unwrap().path())
        .collect();
    entries.sort_unstable();
    for entry in entries {
        println!("{:?}", entry);
    }
}
#[allow(dead_code)]
fn files() {
    for entry in glob("./*").expect("Failed to read glob pattern") {
        let path = entry.unwrap();
        println!("{}", path.display());
        let ext: &str = match path.extension() {
            None => "",
            Some(ext) => ext.to_str().unwrap(),
        };
        println!("{:?}", ext);
    }
}

fn main() {
    mapped();
}
