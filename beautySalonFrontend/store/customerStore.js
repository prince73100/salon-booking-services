import { createSlice } from '@reduxjs/toolkit'
import hairimg from '../src/assets/sevicepic/hair.jpg'
import handfeet from '../src/assets/sevicepic/handandfeet.jpg'
import makeupimg from '../src/assets/sevicepic/makeup.jpg'
import skinimg from '../src/assets/sevicepic/skin.jpg'
import bodymassage from '../src/assets/sevicepic/bodymassage.jpg'
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
        services_provide: [
            {
                imgSrc: hairimg,
                services: 'Hair Care',
                price: 500
            },
            {
                imgSrc: handfeet,
                services: 'Hand feet',
                price: 450
            },
            {
                imgSrc: makeupimg,
                services: 'Make Up',
                price: 250
            },
            {
                imgSrc: skinimg,
                services: 'Skin Care',
                price: 280
            },
            {
                imgSrc: bodymassage,
                services: 'Body Massage',
                price: 400
            },
            {
                imgSrc: bodymassage,
                services: 'Body Massage',
                price: 400
            }
        ],
    },
    reducers: {
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
        }
    }
})

export const customeraction = customerSlice.actions
export default customerSlice.reducer
