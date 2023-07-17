import { createSlice } from "@reduxjs/toolkit"

export interface PlayerState {
    src: string
}

export const initialState: PlayerState = {
    src: ""
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
        }
    }
})

export const { setSrc } = playerSlice.actions

export default playerSlice.reducer