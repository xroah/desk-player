import { ReactNode } from "react"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MuiDialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"

interface DialogProps {
    open: boolean
    title?: string
    showCancel?: boolean
    children?: ReactNode
    onClose?: VoidFunction
    onOk?: VoidFunction
}

export default function Dialog(
    {
        open,
        children,
        title,
        showCancel,
        onOk,
        onClose
    }: DialogProps
) {
    return (
        <MuiDialog open={!!open} onClose={onClose} >
            <DialogTitle css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: 300
            }}>
                <span>{title}</span>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    showCancel ? (
                        <Button onClick={onClose} variant="outlined">
                            取消
                        </Button>
                    ) : null
                }
                <Button
                    onClick={onOk}
                    variant="contained"
                    autoFocus>
                    确定
                </Button>
            </DialogActions>
        </MuiDialog>
    )
}