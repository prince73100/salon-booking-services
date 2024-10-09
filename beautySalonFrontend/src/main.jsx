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
  RegisteredBusiness
} from './component/index.js'




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
      { path: '/bookingService', element: <BookbytheService /> },
      { path: '/paymentdeatails', element: <Payment /> },
      { path: '/jobs', element: <Job /> },
      {path:'/salonbusiness',element:<Herosection/>},
      {path:'/regiteredbusiness',element:<RegisteredBusiness/>}
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
