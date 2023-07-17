import AppMenu from "./components/menu"
import GlobalStyles from "./components/global-styles"
import { useCallback, useEffect } from "react"
import { invoke } from "@tauri-apps/api"

function App() {
    const handleKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            const key = ev.key.toLowerCase()

            if (ev.metaKey) {
                switch(key) {
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
        <div>
            <GlobalStyles />
            <AppMenu />
        </div>
    )
}

export default App
