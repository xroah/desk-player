use tauri::{AppHandle, Wry, Manager};

pub fn show_main_window(app: &AppHandle<Wry>) {
    if let Some(w) = app.get_window("main") {
        let _ = w.show();
        let _ = w.unminimize();
        w.set_focus().unwrap_or_else(|_| println!("Focused error!"));
    }
}