use std::{path::Path, process, env};

use tauri::Manager;

#[tauri::command]
pub fn exists_path(path: String) -> bool {
    let p = Path::new(path.as_str());

    p.exists()
}

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

#[tauri::command]
pub fn get_filename(pathname: String) -> String {
    let path = Path::new(pathname.as_str());

    if let Some(filename) = path.file_name() {
        return match filename.to_str() {
            Some(filename) => filename.to_string(),
            None => String::new()
        }
    }

    String::new()
}