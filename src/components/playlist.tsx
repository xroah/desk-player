import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

enum TabValue {
    RECENT = "RECENT",
    LIST = "LIST"
}

export default function Playlist() {
    const [open, setOpen] = useState(false)
    const [tabValue, setTabValue] = useState(TabValue.RECENT)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleTabChange = (_: unknown, v: TabValue) => {
        setTabValue(v)
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <PlaylistPlayIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={open}
                hideBackdrop={true}
                onClose={handleClose}>
                <div css={{ width: 300 }}>
                    <div css={{
                        padding: 5,
                        borderBottom: "1px solid #ccc"
                    }}>
                        <IconButton onClick={handleClose}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Tabs
                        value={tabValue}
                        variant="fullWidth"
                        onChange={handleTabChange}>
                        <Tab value={TabValue.RECENT} label="最近播放" />
                        <Tab value={TabValue.LIST} label="播放列表" />
                    </Tabs>
                </div>
            </Drawer>
        </>
    )
}