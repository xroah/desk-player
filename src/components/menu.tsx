import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import FileOpenIcon from "@mui/icons-material/FileOpenOutlined"
import FolderOpenIcon from "@mui/icons-material/FolderOpenOutlined"
import InfoIcon from "@mui/icons-material/InfoOutlined"
import SettingsIcon from "@mui/icons-material/SettingsOutlined"
import ExitIcon from "@mui/icons-material/ExitToAppOutlined"
import { invoke } from "@tauri-apps/api"
import { open as openDialog } from "@tauri-apps/api/dialog"
import { useDispatch } from "react-redux"
import { setSrc } from "../store/player-slice"

export default function AppMenu() {
    const [open, setOpen] = useState(false)
    const [isMac, setIsMac] = useState(false)
    const dispatch = useDispatch()
    const handleClick = () => setOpen(o => !o)
    const handleClose = () => setOpen(false)
    const btnRef = useRef(null)
    const shortCutPrefix = useMemo(
        () => isMac ? "⌘" : "Ctrl+",
        [isMac]
    )
    const handleExit = () => {
        invoke("exit")
    }
    const handleOpenFile = async () => {
        handleClose()

        const file = await openDialog({
            filters: [{
                name: "mp4 files",
                extensions: ["mp4"]
            }]
        })

        dispatch(setSrc(file))
    }

    useEffect(
        () => {
            invoke("get_os").then(os => setIsMac(os === "macos"))
        },
        []
    )

    return (
        <>
            <IconButton
                ref={btnRef}
                onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={btnRef.current}
                onClose={handleClose}
                open={open}
                css={{userSelect: "none"}}>
                <MenuList sx={{ width: 220 }} dense>
                    <MenuItem onClick={handleOpenFile}>
                        <ListItemIcon>
                            <FileOpenIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>打开</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            {shortCutPrefix + "O"}
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <FolderOpenIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>打开文件夹</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>设置</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            {shortCutPrefix + ","}
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>关于</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleExit}>
                        <ListItemIcon>
                            <ExitIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>退出</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            {shortCutPrefix + "Q"}
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}