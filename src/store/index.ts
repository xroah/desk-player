import { configureStore } from "@reduxjs/toolkit"
import playerSlice from "./player"
import aboutDialogSlice from "./about-dialog"

export const store = configureStore({
    reducer: {
        player: playerSlice,
        aboutDialog: aboutDialogSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch