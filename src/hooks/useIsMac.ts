import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

let os: string = ""

export default function useIsMac() {
    const [isMac, setIsMac] = useState(false)

    useEffect(
        () => {
            if (!os) {
                invoke("get_os").then(_os => {
                    os = _os as string

                    setIsMac(os === "macos")
                })
            } else {
                setIsMac(os === "macos")
            }
        },
        []
    )

    return isMac
}