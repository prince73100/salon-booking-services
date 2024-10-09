import { configureStore } from '@reduxjs/toolkit'
import userReducer from './customerStore'
import artisReducer from './artistSlice'
import salonReducer from './salonSlice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        artistsevices:artisReducer,
        salon:salonReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

