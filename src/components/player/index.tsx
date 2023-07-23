import {
    MouseEvent,
    SyntheticEvent,
    useCallback,
    useEffect,
    useRef
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { TauriEvent, listen, Event } from "@tauri-apps/api/event"
import { RootState } from "../../store"
import { invoke } from "@tauri-apps/api"
import { setSrc } from "../../store/player"
import Controls, { ControlRef } from "./controls"

export default function Player() {
    const vRef = useRef<HTMLVideoElement | null>(null)
    const src = useSelector((state: RootState) => state.player.src)
    const controlRef = useRef<ControlRef>(null)
    const dispatch = useDispatch()
    const handleTimeUpdate = (ev: SyntheticEvent<HTMLVideoElement>) => {
        const t = ev.target as HTMLVideoElement
        const progress = t.currentTime / t.duration * 100

        controlRef.current?.setProgress(progress)
    }
    const handleSliderChange = (value: number) => {
        const { current: v } = vRef

        v!.currentTime = value / 100 * v!.duration
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
    const handleClick = () => {
        const video = vRef.current!

        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()

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
        <div css={{
            position: "relative",
            height: 0,
            flexGrow: 1,
            backgroundColor: "#000"
        }}>
            <video
                css={{
                    width: "100%",
                    height: "100%"
                }}
                ref={vRef}
                src={convertFileSrc(src)}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                onTimeUpdate={handleTimeUpdate} />
            <Controls
                ref={controlRef}
                onSliderChange={handleSliderChange} />
        </div>
    )
}