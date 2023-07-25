import { useSelector } from "react-redux"
import  SmartDisplayOutlinedIcon  from "@mui/icons-material/SmartDisplayOutlined"
import { RootState } from "../../store"

export default function Paused() {
    const paused = useSelector(
        (state: RootState) => state.player.paused
    )

    if (!paused) {
        return null
    }

    return (
        <div css={{
            position: "absolute",
            right: 50,
            bottom: 60,
            lineHeight: 0,
            color: "white",
            zIndex: 100,
            fontSize: 100
        }}>
            <SmartDisplayOutlinedIcon fontSize="inherit"/>
        </div>
    )
}