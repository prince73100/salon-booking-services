import { configureStore, createSlice } from '@reduxjs/toolkit'

const datafromlocal = ()=>{
    try {
        const currentDate=   Date.now()
        console.log(currentDate);
        
        const exipreIndate = localStorage.getItem("expireInday")
        console.log(exipreIndate);
        
        if(currentDate > exipreIndate){
            localStorage.removeItem('token')
            localStorage.removeItem('states')
            localStorage.removeItem('expireInday')
            return false
        }
        return true
    } catch (error) {
        console.error('Not load data on the localstorage',error)
        return false
    }
}

const sliceAuth = createSlice({
    name:'authuser',
    initialState:{
        states:datafromlocal(),
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

const salonStore= configureStore({
    reducer:{
        authuser:sliceAuth.reducer
    }
})

export const authuseraction = sliceAuth.actions
export default salonStore