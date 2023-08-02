import IconButton from "@mui/material/IconButton"
import FullScreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { useState } from "react"
import { appWindow } from "@tauri-apps/api/window"

export default function Fullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const handleClick = () => {
        let f = !isFullscreen

        appWindow.setFullscreen(f).then(
            () => setIsFullscreen(f)
        )
    }

    return (
        <IconButton onClick={handleClick}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullScreenIcon />}
        </IconButton>
    )
}