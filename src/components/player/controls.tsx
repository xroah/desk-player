import {
    ForwardedRef,
    MouseEvent,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import { formatTime } from "../../utils"
import Fade from "@mui/material/Fade"
import { Toggle, ToggleProps } from "./toggle"

export interface ControlRef {
    setProgress: (p: number) => void
    show: VoidFunction
    hide: VoidFunction
}

interface ControlsProps extends ToggleProps {
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
            onToggle,
            ...props
        }: ControlsProps,
        ref: ForwardedRef<unknown>
    ) => {
        const [visible, setVisible] = useState(false)
        const [progress, setProgress] = useState(0)
        const isMouseDown = useRef(false)
        const mouseEntered = useRef(false)
        const timeIdRef = useRef(-1)

        const hide = useCallback(
            () => {
                if (!isMouseDown.current && !mouseEntered.current) {
                    setVisible(false)
                }
            },
            []
        )
        const delayHide = useCallback(
            () => {
                clearTimeout()

                timeIdRef.current = window.setTimeout(
                    () => {
                        timeIdRef.current = -1

                        hide()
                    },
                    3000
                )
            },
            []
        )
        const show = useCallback(
            () => {
                clearTimeout()
                setVisible(true)

                delayHide()
            },
            []
        )
        const handleSliderChange = (_: unknown, v: number | number[]) => {
            setProgress(v as number)
            onSliderChange?.(v as number)
        }
        const handleSliderChangeCommitted = () => {
            isMouseDown.current = false

            delayHide()
        }
        const handleMouseDown = () => {
            isMouseDown.current = true
        }
        const handleMouseEnterOrLeave = (ev: MouseEvent) => {
            if (ev.type === "mouseenter") {
                mouseEntered.current = true
            } else {
                mouseEntered.current = false

                delayHide()
            }
        }
        const clearTimeout = () => {
            if (timeIdRef.current !== -1) {
                window.clearTimeout(timeIdRef.current)

                timeIdRef.current = -1
            }
        }

        useEffect(
            () => {
                show()
            },
            []
        )

        useImperativeHandle(
            ref,
            () => {
                return {
                    setProgress(p: number) {
                        if (isMouseDown.current) {
                            return
                        }

                        setProgress(p)
                    },
                    show,
                    hide
                }
            },
            []
        )

        return (
            <Fade in={visible}>
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
                            opacity: 0,
                            transition: "opacity .15s"
                        },
                        "& .MuiSlider-root:hover .MuiSlider-thumb": {
                            opacity: 1
                        }
                    }}
                    onMouseEnter={handleMouseEnterOrLeave}
                    onMouseLeave={handleMouseEnterOrLeave}
                    {...props}>
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        style={{ color: "#fff", height: 20 }}>
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
                                step={.1}
                                onChange={handleSliderChange}
                                onChangeCommitted={handleSliderChangeCommitted} />
                        </div>
                        <div className="time">{formatTime(duration)}</div>
                    </Stack>
                    <div css={{
                        display: "flex",
                        button: {
                            margin: "0 10px",
                            color: "#fff"
                        },
                        svg: {
                            width: 36,
                            height: 36
                        }
                    }}>
                        <div>
                            <Toggle onToggle={onToggle}/>
                        </div>
                    </div>
                </div>
            </Fade>
        )
    }
)