import { configureStore } from "@reduxjs/toolkit"
import playerSlice from "./player"
import aboutDialog from "./about-dialog"
import settingsDialog from "./settings-dialog"

export const store = configureStore({
    reducer: {
        player: playerSlice,
        aboutDialog,
        settingsDialog
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch