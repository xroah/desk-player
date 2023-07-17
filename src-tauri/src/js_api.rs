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