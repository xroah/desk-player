import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { TauriEvent, listen, Event } from "@tauri-apps/api/event"
import { RootState } from "../../store"
import { invoke } from "@tauri-apps/api"
import { setSrc } from "../../store/player"

export default function Player() {
    const vRef = useRef<HTMLVideoElement | null>(null)
    const src = useSelector((state: RootState) => state.player.src)
    const dispatch = useDispatch()
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
            const unlisten = listen(TauriEvent.WINDOW_FILE_DROP, handleFileDrop)

            return () => {
                unlisten.then(f => f())
            }
        },
        []
    )

    if (!src) {
        return null
    }


    return (
        <div css={{
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
                src={convertFileSrc(src)} />
        </div>
    )
}