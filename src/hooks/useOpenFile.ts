import { open as openFileDialog } from "@tauri-apps/api/dialog"
import { useDispatch } from "react-redux"
import { setSrc } from "../store/player"
import { invoke } from "@tauri-apps/api"

export default function useOpenFile() {
    const dispatch = useDispatch()

    return () => {
        openFileDialog({
            filters: [{
                name: "mp4 files",
                extensions: ["mp4"]
            }]
        }).then(file => {
            if (!file) {
                return
            }

            dispatch(setSrc(file))
            invoke("get_filename", { pathname: file }).then(n => {
                invoke("set_title", { title: n })
            })
        })
    }
}