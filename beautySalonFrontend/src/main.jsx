import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from '../store/index.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  Heropage,
  SignUpLogin,
  Loginpage,
  Servicepage,
  Servicebookdetail,
  Payment,
  Appointment,
  Artistfulldetail,
  BookbytheService,
  Job,
  Herosection,
  RegisteredBusiness,
  Anouncejob,
  ForgetpasswordPage,
  ResetPassword
} from './component/index.js'
import Addservices from './component/salonPanel/addServices/Addservices.jsx'




const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: '/', element: <Heropage /> },
      { path: '/signup', element: <SignUpLogin /> },
      { path: '/login', element: <Loginpage /> },
      { path: '/service', element: <Servicepage /> },
      { path: '/bookingdetail', element: <Servicebookdetail /> },
      { path: '/payment', element: <Payment /> },
      { path: '/appoitment', element: <Appointment /> },
      { path: '/artistdetail', element: <Artistfulldetail /> },
      { path: '/bookingService/:serviceId/:serviceName/:price', element: <BookbytheService /> },
      { path: '/paymentdeatails', element: <Payment /> },
      { path: '/jobs', element: <Job /> },
      { path: '/salonbusiness', element: <Herosection /> },
      { path: '/regiteredbusiness', element: <RegisteredBusiness /> },
      { path: '/addServices', element: <Addservices /> },
      { path: '/anounceJob', element: <Anouncejob /> },
      { path: '/forgetPassword', element: <ForgetpasswordPage /> },
      { path: '/resetpassword/:token', element: <ResetPassword /> },


    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)


