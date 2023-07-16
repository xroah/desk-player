import { open } from "@tauri-apps/api/dialog"
// import { convertFileSrc } from "@tauri-apps/api/tauri"
import Button from "@mui/material/Button"
import GlobalStyles from "./components/global-styles"

function App() {
    const handleOpen = async () => {
        const ret = await open()

        console.log(ret)
    }

    return (
        <div>
            <GlobalStyles/>
            <Button onClick={handleOpen}>打开文件</Button>
        </div>
    )
}

export default App
