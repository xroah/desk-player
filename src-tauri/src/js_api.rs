use std::{env, fs as stdFS, path::Path, process};

use tauri::Manager;

use crate::utils;
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

fn get_settings_file() -> String {
    let app_dir = utils::get_app_dir();
    format!("{app_dir}/settings.json")
}

#[tauri::command]
pub fn get_settings() -> String {
    let settings_file = get_settings_file();
    let settings_file = Path::new(settings_file.as_str());

    if settings_file.exists() {
        let json = stdFS::read_to_string(settings_file);

        return match json {
            Ok(s) => s,
            _ => String::new(),
        };
    }

    String::new()
}

#[tauri::command]
pub fn save_settings(settings: String) {
    let settings_file = get_settings_file();
    let _ = stdFS::write(settings_file, settings);
}
