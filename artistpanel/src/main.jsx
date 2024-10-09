import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Signup, { onRegistereduser } from './component/LoginSignup/Signup.jsx'
import Login, { login } from './component/LoginSignup/Login.jsx'
import Job from './component/job/Job.jsx'
import ErrorPage from './component/LoginSignup/ErrorPage.jsx'
import Application from './component/job/Application.jsx'
import { Provider } from 'react-redux'
import salonStore from '../store/index.js'
import Reviewpplication from './component/job/Reviewpplication.jsx'
const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: "signup", element: <Signup />, errorElement: <ErrorPage />, action: onRegistereduser },
      { path: "/login", element: <Login />, errorElement: <ErrorPage />, action: login },
      { path: "/", element: <Job /> },
      { path: "/applicationform", element: <Application /> },
      {path:"/review",element:<Reviewpplication/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={salonStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
