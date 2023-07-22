import { invoke } from "@tauri-apps/api"
import { appWindow } from "@tauri-apps/api/window"
import { useCallback, useEffect } from "react"

export default function Hotkey() {
    const handleKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            const key = ev.key.toLowerCase()

            if (ev.metaKey) {
                switch (key) {
                    case "q":
                        invoke("exit")
                        break
                    case "w":
                        invoke("hide_window")
                        break
                }
                return
            }
        },
        []
    )

    useEffect(
        () => {
            let unlisten = () => {}

            appWindow.listen("exit", () => {
                invoke("exit")
            }).then(f => unlisten = f)
            document.addEventListener("keydown", handleKeyDown)

            return () => {
                document.removeEventListener("keydown", handleKeyDown)
                unlisten()
            }
        },
        [handleKeyDown]
    )

    return null
}