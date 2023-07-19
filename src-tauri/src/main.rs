// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

use home;
use rplayer::{js_api, setup, tray};
use tauri::WindowEvent;

fn main() {
    println!(
        "Home dir ======> {:?}",
        home::home_dir()
            .unwrap_or_else(|| PathBuf::new())
            .to_str()
            .unwrap_or_else(|| "")
    );
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
            js_api::exists_path,
            js_api::exit,
            js_api::get_os,
            js_api::hide_window,
            js_api::set_title,
            js_api::get_filename
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
