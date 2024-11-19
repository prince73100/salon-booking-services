/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from '../store/index.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Addservices from './component/salonPanel/addServices/Addservices.jsx'
import { Navigate } from 'react-router-dom'
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
  ResetPassword,
  CostViseServices,
  Salonpage,
  Bookinghistory,
  BookingPage
} from './component/index.js'
import Errorpage from './component/error/Errorpage.jsx'


const ProtectRoute = ({ element, requiredRole }) => {
  const isAuthenticate = localStorage.getItem('jwt')
  const userRole = localStorage.getItem('role')

  if (!isAuthenticate) {
    return <Navigate to={'/login'} />
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={'/'} />
  }
  return element
}

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { path: '/', element: <Heropage /> },
      { path: '/signup', element: <SignUpLogin /> },
      { path: '/login', element: <Loginpage /> },
      { path: '/forgetPassword', element: <ForgetpasswordPage /> },
      { path: '/resetpassword/:token', element: <ResetPassword /> },

      // user role
      { path: '/service', element: <ProtectRoute element={<Servicepage />} /> },
      { path: '/payment', element: <ProtectRoute element={<Payment />} /> },
      { path: '/bookingService/:serviceId/:serviceName/:price/:salonId/:salonNames', element: <ProtectRoute element={<BookbytheService />} /> },
      { path: '/select-one-service', element: <ProtectRoute element={<CostViseServices />} requiredRole='user' /> },
      { path: '/history',  element: <ProtectRoute element={<Bookinghistory />} requiredRole='user' /> },
      { path: '/salon-page/:salonId', element: <ProtectRoute element={<Salonpage />} requiredRole='user' /> },


      { path: '/bookingdetail', element: <Servicebookdetail /> }, // not in use
      { path: '/appoitment', element: <Appointment /> },         // not in use
      { path: '/artistdetail', element: <Artistfulldetail /> },
      { path: '/paymentdeatails', element: <Payment /> },
      { path: '/jobs', element: <Job /> },

      // salon role
      { path: '/salonbusiness', element: <ProtectRoute element={<Herosection />} requiredRole='salon' /> },
      { path: '/regiteredbusiness', element: <ProtectRoute element={<RegisteredBusiness />} requiredRole='salon' /> },
      { path: '/addServices', element: <ProtectRoute element={<Addservices />} requiredRole='salon' /> },
      { path: '/anounceJob', element: <ProtectRoute element={<Anouncejob />} requiredRole='salon' /> },


      { path: '/upcomingBook', element: <BookingPage /> },
      { path: '*', element: <Errorpage /> }
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


