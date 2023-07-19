import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { RootState } from "../../store"

export default function Player() {
    const vRef = useRef<HTMLVideoElement | null>(null)
    const src = useSelector((state: RootState) => state.player.src)

    useEffect(
        () => {
            if (src) {
                vRef.current?.load()
                vRef.current?.play()
            }
        },
        [src]
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