use std::{fs, path::Path, vec};

#[tauri::command]
pub fn exists_path(path: String) -> bool {
    let p = Path::new(path.as_str());

    p.exists()
}

#[tauri::command]
pub fn get_filename(pathname: String) -> String {
    let path = Path::new(pathname.as_str());

    if let Some(filename) = path.file_name() {
        return match filename.to_str() {
            Some(filename) => filename.to_string(),
            None => String::new(),
        };
    }

    String::new()
}

#[tauri::command]
pub fn is_file(pathname: String) -> bool {
    let path = Path::new(pathname.as_str());

    path.is_file()
}

#[tauri::command]
pub fn is_dir(pathname: String) -> bool {
    let path = Path::new(pathname.as_str());

    path.is_dir()
}

#[tauri::command]
pub fn read_dir(pathname: String) -> Vec<String> {
    let path = Path::new(pathname.as_str());
    let mut ret: Vec<String> = vec![];

    if !path.exists() {
        return ret;
    }

    match fs::read_dir(path) {
        Ok(files) => {
            for f in files {
                match f {
                    Ok(entry) => {
                        let path = entry.path();

                        if let Some(path) = path.to_str() {
                            ret.push(String::from(path));
                        }
                    }
                    _ => (),
                }
            }

            ret
        }
        _ => ret,
    }
}
