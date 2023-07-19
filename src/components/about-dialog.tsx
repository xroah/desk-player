import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { hide } from "../store/about-dialog"

export default function AboutDialog() {
    const open = useSelector(
        (rootState: RootState) => rootState.aboutDialog.open
    )
    const dispatch = useDispatch()
    const handleClose = () => dispatch(hide())

    return (
        <Dialog open={!!open} onClose={handleClose} >
            <DialogTitle>
                关于RPlayer
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    关于
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    autoFocus>
                    关闭
                </Button>
            </DialogActions>
        </Dialog>
    )
}