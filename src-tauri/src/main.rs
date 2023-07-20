// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::Path};

use rplayer::{js_api, setup, tray, utils};
use tauri::WindowEvent;

fn main() {
    let app_dir = utils::get_app_dir();
    let app_dir = Path::new(app_dir.as_str());

    if !app_dir.exists() {
        let _ = fs::create_dir(app_dir);
    }

    tauri::Builder::default()
        .setup(setup::init)
        .system_tray(tray::build())
        .on_system_tray_event(tray::handle_system_tray_event)
        .on_window_event(|event| match event.event() {
            WindowEvent::CloseRequested { api, .. } => {
                let win = event.window();

                if win.label() == "main" {
                    let _ = win.hide();
                    api.prevent_close();
                }
            }
            _ => (),
        })
        .invoke_handler(tauri::generate_handler![
            js_api::exit,
            js_api::get_os,
            js_api::hide_window,
            js_api::set_title,
            js_api::fs::exists_path,
            js_api::fs::get_filename,
            js_api::fs::is_dir,
            js_api::fs::is_file,
            js_api::fs::read_dir,
            js_api::get_settings,
            js_api::save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
