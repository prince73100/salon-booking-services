import {  createSlice } from '@reduxjs/toolkit'

const serviceSlice = createSlice({
    name: 'salon',
    initialState: {
        service: []
    },
    reducers: {
        addService: (state, action) => {
            state.service.push(action.payload);
        },
        deleteServices: (state, action) => {
            const serviceId = action.payload
            state.service = state.service.filter((services) => services._id != serviceId)
        },
        handleAllServices:(state,action)=>{
            state.service = action.payload
        }
    }
})


export const serviceAction = serviceSlice.actions

export default serviceSlice.reducer