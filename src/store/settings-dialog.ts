import { createSlice } from "@reduxjs/toolkit"

interface Settings {
    rememberPosition: boolean
    pauseOnHidden: boolean
}

export interface SettingsDialogState {
    open: boolean
    settings: Settings
}

export const settingsDialogSlice = createSlice({
    name: "settingsDialog",
    initialState: {
        open: false,
        settings: {
            rememberPosition: true,
            pauseOnHidden: true
        }
    } as SettingsDialogState,
    reducers: {
        hide(state) {
            state.open = false
        },
        show(state) {
            state.open = true
        }
    }
})

export const {show, hide} = settingsDialogSlice.actions
export default settingsDialogSlice.reducer