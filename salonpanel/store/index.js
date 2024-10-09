import { configureStore, createSlice } from '@reduxjs/toolkit'
const datafromlocal = () => {
    try {
        const datas = localStorage.getItem("states")
        if (datas === null) {
            return undefined
        }
        return datas
    } catch (error) {
        console.error('Not load data on the localstorage', error)
        return undefined
    }
}
const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        states:datafromlocal()|| "",
        service: []
    },
    reducers: {
        addService: (state, action) => {
            state.service.push(action.payload);
        },
        deleteServices: (state, action) => {
            const service = action.payload
            state.service = state.service.filter((services) => services != service)
        },
        tosetstates:(state,action)=>{
            state.states = action.payload
        }
    }
})

const serviceStore = configureStore({
    reducer: {
        service: serviceSlice.reducer
    }
})

export const serviceAction = serviceSlice.actions

export default serviceStore