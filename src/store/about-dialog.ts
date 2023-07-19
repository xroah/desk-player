import { createSlice } from "@reduxjs/toolkit"

export interface AboutDialogState {
    open: boolean
}

export const aboutDialogSlice = createSlice({
    name: "aboutDialog",
    initialState: {
        open: false
    } as AboutDialogState,
    reducers: {
        show(state) {
            state.open = true
        },
        hide(state) {
            state.open = false
        }
    },
})

export const { show, hide } = aboutDialogSlice.actions
export default aboutDialogSlice.reducer