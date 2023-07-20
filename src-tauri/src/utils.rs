use tauri::{AppHandle, Wry, Manager};

pub fn show_main_window(app: &AppHandle<Wry>) {
    if let Some(w) = app.get_window("main") {
        let _ = w.show();
        let _ = w.unminimize();
        w.set_focus().unwrap_or_else(|_| println!("Focused error!"));
    }
}

pub fn get_home_dir() -> String {
    if let Some(h) = home::home_dir() {
        if let Some(s) = h.to_str() {
            return s.to_string()
        }
    }

    String::new()
}

pub fn get_app_dir() -> String {
    format!("{}/.rplayer", get_home_dir())
}