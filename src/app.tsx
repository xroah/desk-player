import AppMenu from "./components/menu"
import GlobalStyles from "./components/global-styles"
import Player from "./components/player"
import AboutDialog from "./components/about-dialog"
import Playlist from "./components/playlist"
import SettingsDialog from "./components/settings-dialog"
import useHotkey from "./hooks/useHotkey"

function App() {
    useHotkey()

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
            <SettingsDialog />
        </div>
    )
}

export default App
