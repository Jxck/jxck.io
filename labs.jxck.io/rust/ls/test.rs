use std::fmt;

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

fn h(size: u64) -> String {
    match size {
        size if size > 1024 * 1024 => {
            let m = size / (1024 * 1024);
            format!("{}M", m)
        }
        size if size > 1024 => {
            let k = size / 1024;
            format!("{}K", k)
        }
        _ => format!("{}B", size),
    }
}

fn main() {
    let user: Mode = Mode(true, false, false);
    let group: Mode = Mode(false, true, false);
    let other: Mode = Mode(false, false, true);
    let mode: Modes = Modes(user, group, other);
    println!("{}", mode);

    let size: u64 = 1024 * 1024 * 10;
    println!("{}", h(size));
}
