use tauri::{App, GlobalShortcutManager, Manager};

use crate::utils::show_main_window;

pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>>  {
    let show_handle = app.handle();
    let hide_handle = app.handle();
    let mut gsm = app.global_shortcut_manager();

    gsm.register("CommandOrControl+Alt+S", move || {
        show_main_window(&show_handle);
    }).unwrap_or_else(|_| ());
    gsm.register("CommandOrControl+Alt+H", move || {
        if let Some(w) = hide_handle.get_window("main") {
            let _ = w.hide();
            let _ = w.emit("fucking_hide", "");
        }
    }).unwrap_or_else(|_| ());

    Ok(())
}