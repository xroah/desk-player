import { createSlice } from "@reduxjs/toolkit"

export interface PlayerState {
    src: string
    paused: boolean
}

export const initialState: PlayerState = {
    src: "",
    paused: true
}

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSrc(state, action) {
            if (state.src === action.payload) {
                return
            }

            state.src = action.payload
        },
        setPaused(state, action) {
            state.paused = action.payload
        }
    }
})

export const { setSrc, setPaused } = playerSlice.actions

export default playerSlice.reducer