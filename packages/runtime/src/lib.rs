// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(feature = "cef", tauri_runtime_cef::cef_entry_point)]
pub fn run() {
    #[cfg(feature = "wry")]
    let builder = tauri::Builder::default().runtime(tauri_runtime_wry::Wry::default());

    #[cfg(feature = "cef")]
    let builder = tauri::Builder::default().runtime(tauri_runtime_cef::Cef::default());

    builder
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
