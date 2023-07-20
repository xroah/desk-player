import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import Dialog from "./dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { hide } from "../store/settings-dialog";

export default function SettingsDialog() {
    const state = useSelector(
        (state: RootState) => state.settingsDialog
    )
    const dispatch = useDispatch()
    const handleClose = () => dispatch(hide())

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

    return (
        <Dialog
            open={state.open}
            title="设置"
            onClose={handleClose}
            showCancel>
            设置
        </Dialog>
    )
}