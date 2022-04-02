import { createSlice } from '@reduxjs/toolkit'

export const authSetter = createSlice({
    name: 'auth',
    initialState: {
        accessToken: ''
    },
    reducers: {
        setAuth: (state, action) => {
            state.accessToken = action.payload
        }
    }
})

export const { setAuth } = authSetter.actions

export default authSetter.reducer
