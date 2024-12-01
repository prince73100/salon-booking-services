import { createSlice } from '@reduxjs/toolkit'


const datafromlocal = () => {
    try {
        const currentDate = Date.now()
        const expireIndate = localStorage.getItem('exipreIn')
        if (currentDate > expireIndate) {
            localStorage.removeItem('jwt')
            localStorage.removeItem('exipreIn')
            return false
        }
        return true
    } catch (error) {
        console.error('Not load data on the localstorage', error)
        return false
    }
}
const tokenformlocal = () => {
    try {
        const token = localStorage.getItem("jwt_token")
        if (token === null) {
            return undefined
        }
        return token
    } catch (error) {
        console.error('Not load data on the localstorage', error)
        return undefined
    }
}




const customerSlice = createSlice({
    name: "user",
    initialState: {
        state: datafromlocal(),
        profilename: '',
        token: tokenformlocal() || "",
        bookedData: {},
        salon_with_in_range: [],
        services: [],
        selectserviceforbook: [],
        totalbookprice: 0,
        services_provide: [],
        AllSerivces: [],
        currentLocation: [],
        distance: 5,
        rating: 0,
        comment: [],
        bookingHistory: []
    },
    reducers: {
        toaddBookingHistory: (state, action) => {
            state.bookingHistory.push(action.payload)
        },
        toaddComment: (state, action) => {
            state.comment.push(action.payload);
        },
        tohandleComment: (state, action) => {
            // state.comment = [...state.comment, ...action.payload];
            state.comment = action.payload;
        },
        toupdaterating: (state, action) => {
            state.rating = action.payload
        },
        toupdateDistance: (state, action) => {
            state.distance = action.payload
        },
        toupdateCurrentLocation: (state, action) => {
            state.currentLocation = action.payload
        },
        toUpdatestate: (state, action) => {
            state.state = action.payload
        },
        toupdateProfile: (state, action) => {
            state.profilename = action.payload
        },
        toUpdateToken: (state, action) => {
            state.token = action.payload
        },
        toUpdateAppoinrment: (state, action) => {
            state.appointmentData = action.payload
        },
        tosalonhandle: (state, action) => {
            state.salon_with_in_range = action.payload
        },
        toserviceHandle: (state, action) => {
            state.services = action.payload
        },
        toAddServiceforbooking: (state, action) => {
            state.totalbookprice += Number(action.payload.price)
            state.selectserviceforbook.push(action.payload)
        },
        toRemoveService: (state, action) => {
            state.totalbookprice -= action.payload.price
            state.selectserviceforbook = state.selectserviceforbook.filter((item) => item.id !== action.payload.id)
        },
        handlebookData: (state, action) => {
            state.bookedData = action.payload
        },
        handleShowServices: (state, action) => {
            state.services_provide = action.payload;
        },
        handleAllServices: (state, action) => {
            state.AllSerivces = action.payload
        }
    }
})

export const customeraction = customerSlice.actions
export default customerSlice.reducer
