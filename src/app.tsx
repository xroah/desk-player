import AppMenu from "./components/menu"
import GlobalStyles from "./components/global-styles"
import { useCallback, useEffect } from "react"
import { invoke } from "@tauri-apps/api"
import Player from "./components/player"
import AboutDialog from "./components/about-dialog"
import Playlist from "./components/playlist"
import SettingsDialog from "./components/settings-dialog"

function App() {
    const handleKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            const key = ev.key.toLowerCase()

            if (ev.metaKey) {
                switch (key) {
                    case "q":
                        invoke("exit")
                        break
                    case "w":
                        invoke("hide_window")
                        break
                }
                return
            }
        },
        []
    )

    useEffect(
        () => {
            document.addEventListener("keydown", handleKeyDown)

            return document.removeEventListener("keydown", handleKeyDown)
        },
        [handleKeyDown]
    )

    return (
        <div css={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden"
        }}>
            <GlobalStyles />
            <header css={{
                display: "flex",
                justifyContent: "space-between",
                flexShrink: 0,
                padding: 3,
                backgroundColor: "#eee",
            }}>
                <AppMenu />
                <Playlist />
            </header>
            <Player />
            <AboutDialog />
            <SettingsDialog/>
        </div>
    )
}

export default App
