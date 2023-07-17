import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { RootState } from "../../store"

export default function Player() {
    const vRef = useRef<HTMLVideoElement | null>(null)
    const src = useSelector((state: RootState) => state.player.src)

    useEffect(
        () => {
            vRef.current?.load()
            vRef.current?.play()
        },
        [src]
    )

    if (!src) {
        return null
    }


    return (
        <video
            ref={vRef}
            src={convertFileSrc(src)}
            controls />
    )
}