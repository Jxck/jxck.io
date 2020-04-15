extern crate chrono;
extern crate libc;

use chrono::offset::Utc;
use chrono::DateTime;
use std::cmp;
use std::env;
use std::ffi::CStr;
use std::fmt;
use std::fs;
use std::os::unix::fs::{FileTypeExt, MetadataExt};
use std::path::PathBuf;

struct Mode(bool, bool, bool);
struct Modes(Mode, Mode, Mode);

impl fmt::Display for Mode {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let Mode(r, w, x) = self;
        let r = match r {
            true => "r",
            false => "-",
        };
        let w = match w {
            true => "w",
            false => "-",
        };
        let x = match x {
            true => "x",
            false => "-",
        };
        write!(f, "{}{}{}", r, w, x)
    }
}

impl fmt::Display for Modes {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let Modes(user, group, other) = self;
        write!(f, "{}{}{}", user, group, other)
    }
}

#[derive(PartialEq, PartialOrd, Eq, Ord)]
enum FileType {
    Dir,
    Pipe,
    Socket,
    Block,
    Char,
    Sym,
    Exec,
    File,
}

struct Node {
    entry: fs::DirEntry,
    file_type: FileType,
    modes: Modes,
}

fn get_cstr(ptr: *const libc::c_char) -> String {
    let cstr = unsafe { CStr::from_ptr(ptr) };
    cstr.to_str().unwrap().to_string()
}

impl Node {
    fn new(entry: fs::DirEntry) -> Node {
        let (file_type, modes) = Node::file_type(&entry);
        let node = Node {
            entry,
            file_type,
            modes,
        };
        return node;
    }

    fn file_type(entry: &fs::DirEntry) -> (FileType, Modes) {
        let file_type = entry.file_type().unwrap();
        let modes: Modes = Node::permission(&entry);
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
        } else if Node::is_exec(&modes) {
            FileType::Exec
        } else {
            FileType::File
        };
        return (file_type, modes);
    }

    fn permission(entry: &fs::DirEntry) -> Modes {
        let mode: u32 = entry.metadata().unwrap().mode();
        let user: Mode = Mode(
            mode & 0b100000000 > 0, // r
            mode & 0b010000000 > 0, // w
            mode & 0b001000000 > 0, // x
        );
        let group: Mode = Mode(
            mode & 0b000100000 > 0, // r
            mode & 0b000010000 > 0, // w
            mode & 0b000001000 > 0, // x
        );
        let other: Mode = Mode(
            mode & 0b000000100 > 0, // r
            mode & 0b000000010 > 0, // w
            mode & 0b000000001 > 0, // x
        );
        return Modes(user, group, other);
    }

    fn is_exec(modes: &Modes) -> bool {
        return match modes {
            Modes(Mode(_, _, true), _, _) => true,
            Modes(_, Mode(_, _, true), _) => true,
            Modes(_, _, Mode(_, _, true)) => true,
            _ => false,
        };
    }

    unsafe fn user_group(&self) -> (String, String) {
        let uid = self.entry.metadata().unwrap().uid();
        let gid = self.entry.metadata().unwrap().gid();
        let pw_name = (*libc::getpwuid(uid)).pw_name;
        let gr_name = (*libc::getgrgid(gid)).gr_name;
        let username = get_cstr(pw_name);
        let groupname = get_cstr(gr_name);
        return (username, groupname);
    }

    fn size(&self) -> u64 {
        return self.entry.metadata().unwrap().len();
    }

    fn human_size(&self) -> String {
        let size = self.size();
        let mega: u64 = 1024 * 1024;
        match size {
            size if size > mega => {
                let m: f64 = (size as f64) / (mega as f64);
                format!("{:5.1}M", m)
            }
            size if size > 1024 => {
                let k: f64 = (size as f64) / (1024 as f64);
                format!("{:5.1}K", k)
            }
            _ => format!("{:5}B", size),
        }
    }

    fn mtime(&self) -> String {
        let mtime: std::time::SystemTime = self.entry.metadata().unwrap().modified().unwrap();
        let datetime: DateTime<Utc> = mtime.into();
        return format!("{}", datetime.format("%Y-%m-%d %H:%M"));
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
                // TODO: map() ?
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

fn list_nodes(path: &str) -> Vec<Node> {
    let mut nodes: Vec<Node> = fs::read_dir(path)
        .unwrap()
        .map(|d| Node::new(d.unwrap()))
        .collect();
    nodes.sort_unstable();
    return nodes;
}

fn print_nodes(nodes: Vec<Node>, opt: Opt) {
    match opt {
        Opt {
            all: true,
            human: false,
        } => {
            for node in nodes {
                // all
                let (owner, group) = unsafe { node.user_group() };
                let size = node.size();
                let mtime = node.mtime();
                println!(
                    "{} {:>6} {}\t{:>6} {} {}",
                    node.modes, owner, group, size, mtime, node
                );
            }
        }

        Opt {
            all: true,
            human: true,
        } => {
            for node in nodes {
                // all
                let (owner, group) = unsafe { node.user_group() };
                let size = node.human_size();
                let mtime = node.mtime();
                println!(
                    "{} {:>6} {} {} {} {}",
                    node.modes, owner, group, size, mtime, node
                );
            }
        }

        Opt { all: _, human: _ } => {
            for node in nodes {
                // normal
                println!("{}", node);
            }
        }
    }
}

struct Opt {
    all: bool,
    human: bool,
}

fn opt_parse() -> (String, Opt) {
    let args: Vec<String> = env::args().collect();

    // Opt { all: true };
    let (path, opt): (&str, Opt) = match args.as_slice() {
        // no arguments passed
        [_] => (
            ".",
            Opt {
                all: false,
                human: false,
            },
        ),

        [_, ref first] => {
            if first == "-a" {
                (
                    ".",
                    Opt {
                        all: true,
                        human: false,
                    },
                )
            } else if first == "-ah" {
                (
                    ".",
                    Opt {
                        all: true,
                        human: true,
                    },
                )
            } else {
                (
                    &first,
                    Opt {
                        all: false,
                        human: false,
                    },
                )
            }
        }

        [_, ref first, ref second] => {
            if first == "-a" {
                (
                    &second,
                    Opt {
                        all: true,
                        human: false,
                    },
                )
            } else if first == "-ah" {
                (
                    &second,
                    Opt {
                        all: true,
                        human: true,
                    },
                )
            } else {
                (
                    &second,
                    Opt {
                        all: false,
                        human: false,
                    },
                )
            }
        }

        _ => (
            ".",
            Opt {
                all: false,
                human: false,
            },
        ),
    };
    return (path.to_string(), opt);
}

fn main() {
    let (path, opt) = opt_parse();
    let nodes = list_nodes(&path);
    print_nodes(nodes, opt);
}
