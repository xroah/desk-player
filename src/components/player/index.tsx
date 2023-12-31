import {
    MouseEvent,
    SyntheticEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { TauriEvent, listen, Event } from "@tauri-apps/api/event"
import { RootState } from "../../store"
import { invoke } from "@tauri-apps/api"
import { setPaused, setSrc } from "../../store/player"
import Controls, { ControlRef } from "./controls"
import Paused from "./paused"

export default function Player() {
    const vRef = useRef<HTMLVideoElement | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const src = useSelector((state: RootState) => state.player.src)
    const controlRef = useRef<ControlRef>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const handlePlay = () => dispatch(setPaused(false))
    const handlePause = () => dispatch(setPaused(true))
    const handleTimeUpdate = (ev: SyntheticEvent<HTMLVideoElement>) => {
        const t = ev.target as HTMLVideoElement
        const progress = t.currentTime / t.duration * 100

        controlRef.current?.setProgress(progress)
        setCurrentTime(t.currentTime)
    }
    const handleSliderChange = (value: number) => {
        const { current: v } = vRef

        v!.currentTime = value / 100 * v!.duration
    }
    const handleDurationChange = () => {
        setDuration(vRef.current!.duration)
    }
    const handleFileDrop = useCallback(
        async (e: Event<string[]>) => {
            const src = e.payload[0]

            if (src) {
                if (await invoke("is_file", { pathname: src })) {
                    dispatch(setSrc(src))
                } else if (await invoke("is_dir", { pathname: src })) {
                    const files = await invoke(
                        "read_dir",
                        { pathname: src }
                    ) as string[]

                    console.log("files in dir>>>>>", files)
                    dispatch(setSrc(files[0]))
                }
            }

            console.log("payload=====>", e.payload)
        },
        []
    )
    const toggle = () => {
        const video = vRef.current!

        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleMouseMove = () => {
        controlRef.current?.show()
    }

    useEffect(
        () => {
            if (src) {
                vRef.current?.load()
                vRef.current?.play()
            }
        },
        [src]
    )

    useEffect(
        () => {
            let unlisten = () => { }
            listen(TauriEvent.WINDOW_FILE_DROP, handleFileDrop)
                .then(f => unlisten = f)

            return () => unlisten()
        },
        []
    )

    if (!src) {
        return null
    }

    return (
        <div
            css={{
                position: "relative",
                height: 0,
                flexGrow: 1,
                backgroundColor: "#000"
            }}
            ref={elRef}
            onMouseMove={handleMouseMove}>
            <video
                css={{
                    width: "100%",
                    height: "100%"
                }}
                ref={vRef}
                src={convertFileSrc(src)}
                onClick={toggle}
                onContextMenu={handleContextMenu}
                onTimeUpdate={handleTimeUpdate}
                onPlay={handlePlay}
                onPause={handlePause}
                onDurationChange={handleDurationChange} />
            <Paused />
            <Controls
                ref={controlRef}
                fullscreenEl={elRef}
                currentTime={currentTime}
                duration={duration}
                onToggle={toggle}
                onSliderChange={handleSliderChange} />
        </div>
    )
}