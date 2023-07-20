import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { hide } from "../store/about-dialog"
import Dialog from "./dialog"

export default function AboutDialog() {
    const open = useSelector(
        (rootState: RootState) => rootState.aboutDialog.open
    )
    const dispatch = useDispatch()
    const handleClose = () => dispatch(hide())

    return (
        <Dialog
            open={open}
            title="关于RPlayer"
            onClose={handleClose}
            onOk={handleClose} >
            关于
        </Dialog>
    )
}