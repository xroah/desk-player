import {
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState
} from "react"
import Slider from "@mui/material/Slider"

export interface ControlRef {
    setProgress: (p: number) => void
}

interface ControlsProps {
    onSliderChange?: (v: number) => void
}

export default forwardRef(
    (
        {
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
                        position: "relative",
                        height: "100%"
                    }}>
                    <div
                        css={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%"
                        }}
                        onMouseDown={handleMouseDown}>
                        <Slider
                            value={progress}
                            onChange={handleSliderChange}
                            onChangeCommitted={handleSliderChangeCommitted} />
                    </div>
                </div>
            </div>
        )
    }
)