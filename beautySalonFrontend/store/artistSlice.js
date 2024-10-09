// eslint-disable-next-line no-unused-vars
import {  createSlice } from '@reduxjs/toolkit'

const sliceAuth = createSlice({
    name:'artist',
    initialState:{
        appdata:{},
        alljob:[]
    },
    reducers:{
        updatestate:(state,action)=>{
            state.states = action.payload
        },
        updateappdata:(state,action)=>{
            state.appdata = action.payload
        },
        toupdatesjobs:(state,action)=>{
            state.alljob = action.payload
        }
    }
})

export const authuseraction = sliceAuth.actions
export default sliceAuth.reducer

