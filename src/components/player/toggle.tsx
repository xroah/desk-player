import IconButton from "@mui/material/IconButton"
import PlayArrow from "@mui/icons-material/PlayArrow"
import Pause from "@mui/icons-material/Pause"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

export interface ToggleProps {
    onToggle?: VoidFunction
}

export function Toggle(
    { onToggle }: ToggleProps
) {
    const paused = useSelector(
        (state: RootState) => state.player.paused
    )

    return (
        <IconButton onClick={onToggle}>
            {paused ? <PlayArrow /> : <Pause />}
        </IconButton>
    )
}