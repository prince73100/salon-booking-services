import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customerStore from '../store/customerStore.js'
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
  BookbytheService
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
      { path: '/paymentdeatails', element: <Payment /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={customerStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
