extern crate glob;
extern crate rand;

use glob::glob;
use std::fs::{read_dir, DirEntry};
use std::os::unix::fs::{FileTypeExt, MetadataExt};
// struct Node {
//     name: String,
//     stat: String,
//     all: bool,
//     human: bool,
//     tab: bool,
// }

type UserMode = (bool, bool, bool);
type GroupMode = (bool, bool, bool);
type OtherMode = (bool, bool, bool);
type Mode = (UserMode, GroupMode, OtherMode);

fn permission(mode: u32) -> Mode {
    let user: UserMode = (
        mode & 0b100000000 == 0,
        mode & 0b010000000 == 0,
        mode & 0b001000000 == 0,
    );
    let group: GroupMode = (
        mode & 0b000100000 == 0,
        mode & 0b000010000 == 0,
        mode & 0b000001000 == 0,
    );
    let other: OtherMode = (
        mode & 0b000000100 == 0,
        mode & 0b000000010 == 0,
        mode & 0b000000001 == 0,
    );
    return (user, group, other);
}

#[allow(dead_code)]
fn mapped() {
    let dir_entries: Vec<DirEntry> = read_dir(".").unwrap().map(|d| d.unwrap()).collect();
    println!("{:?}", dir_entries);
    for entry in dir_entries {
        let file_type = entry.file_type().unwrap();
        let mode: u32 = entry.metadata().unwrap().mode();
        let mode: Mode = permission(mode);
        println!(
            r#"
path: {:?}
    return 1 if dir?: {}
    return 2 if fifo?: {}
    return 3 if socket?: {}
    return 4 if block?: {}
    return 5 if char?: {}
    return 6 if sym?: {}
    return 7 if exec?:
    return 8 if file?: {}
    mode: {:?}
            "#,
            entry.path(),
            file_type.is_dir(),
            file_type.is_fifo(),
            file_type.is_socket(),
            file_type.is_block_device(),
            file_type.is_char_device(),
            file_type.is_symlink(),
            file_type.is_file(),
            mode
        );
    }
}

#[allow(dead_code)]
fn sorted() {
    let mut entries: Vec<std::path::PathBuf> = read_dir(".")
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
