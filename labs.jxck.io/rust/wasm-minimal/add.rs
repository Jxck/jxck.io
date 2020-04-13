#![no_main]    // this file does not contain a main function
#![no_std]     // we will not be using libstd

#[no_mangle]   // we do not want to mangle the symbol when exporting
pub extern fn add(a: i32, b: i32) -> i32 {
    a + b
}

// we need to specify the panic handler because we are not using libstd
use core::panic::PanicInfo;
#[panic_handler]
fn panic(_panic: &PanicInfo<'_>) -> !{ loop {} }

