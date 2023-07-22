import { useCallback, useEffect } from "react"
import { invoke } from "@tauri-apps/api"
import { appWindow } from "@tauri-apps/api/window"
import useOpenFile from "./useOpenFile"
import { show as showDialog } from "../store/settings-dialog"
import { useDispatch } from "react-redux"
import useIsMac from "./useIsMac"

export default function useHotkey() {
    const openFile = useOpenFile()
    const dispatch = useDispatch()
    const isMac = useIsMac()
    const handleKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            const key = ev.key.toLowerCase()

            if ((isMac && ev.metaKey) || (!isMac && ev.ctrlKey)) {
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