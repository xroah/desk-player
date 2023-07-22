import { useCallback, useEffect } from "react"
import { invoke } from "@tauri-apps/api"
import { appWindow } from "@tauri-apps/api/window"
import useOpenFile from "./useOpenFile"
import { show as showDialog } from "../store/settings-dialog"
import { useDispatch } from "react-redux"

export default function useHotkey() {
    const openFile = useOpenFile()
    const dispatch = useDispatch()
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
                    case "o":
                        openFile()
                        break
                    case ",":
                        dispatch(showDialog())
                }
                return
            }
        },
        [dispatch, openFile]
    )

    useEffect(
        () => {
            let unlisten = () => { }

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
}