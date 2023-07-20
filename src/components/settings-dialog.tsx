import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";

export default function SettingsDialog() {
    useEffect(
        () => {
            invoke("get_settings").then(ret => {
                if (ret) {
                    console.log(JSON.parse(ret as string))
                }
            })
        },
        []
    )

    return null
}