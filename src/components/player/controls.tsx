import {
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState
} from "react"
import Slider from "@mui/material/Slider"
import { formatTime } from "../../utils"

export interface ControlRef {
    setProgress: (p: number) => void
}

interface ControlsProps {
    currentTime: number
    duration: number
    onSliderChange?: (v: number) => void
}

export default forwardRef(
    (
        {
            currentTime,
            duration,
            onSliderChange,
            ...props
        }: ControlsProps,
        ref: ForwardedRef<unknown>
    ) => {
        const [progress, setProgress] = useState(0)
        const isMouseDown = useRef(false)
        const handleSliderChange = (_: unknown, v: number | number[]) => {
            setProgress(v as number)
            onSliderChange?.(v as number)
        }
        const handleSliderChangeCommitted = () => {
            isMouseDown.current = false
        }
        const handleMouseDown = () => {
            isMouseDown.current = true
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    setProgress(p: number) {
                        if (isMouseDown.current) {
                            return
                        }

                        setProgress(p)
                    }
                }
            },
            []
        )

        return (
            <div
                css={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 80,
                    padding: "0 20px",
                    backgroundImage: "linearGradient(to top, black, rgba(0, 0, 0, 0))",
                    zIndex: 20,
                    "& .MuiSlider-thumb": {
                        width: 16,
                        height: 16
                    }
                }}
                {...props}>
                <div
                    css={{
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        "& > div": {
                            flexShrink: 0,
                            lineHeight: 1
                        }
                    }}>
                    <div className="time">{formatTime(currentTime)}</div>
                    <div
                        css={{
                            flexGrow: 1,
                            margin: "0 15px"
                        }}
                        onMouseDown={handleMouseDown}>
                        <Slider
                            style={{ verticalAlign: "middle" }}
                            value={progress}
                            onChange={handleSliderChange}
                            onChangeCommitted={handleSliderChangeCommitted} />
                    </div>
                    <div className="time">{formatTime(duration)}</div>
                </div>
            </div>
        )
    }
)