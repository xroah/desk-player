use std::{env, process};

use tauri::Manager;
pub mod fs;

#[tauri::command]
pub fn exit() {
    process::exit(0)
}

#[tauri::command]
pub fn get_os() -> &'static str {
    env::consts::OS
}

#[tauri::command]
pub fn hide_window(app_handle: tauri::AppHandle) {
    if let Some(win) = app_handle.get_window("main") {
        let _ = win.hide();
    }
}

#[tauri::command]
pub fn set_title(app_handle: tauri::AppHandle, title: String) {
    if let Some(win) = app_handle.get_window("main") {
        let _ = win.set_title(title.as_str());
    }
}
