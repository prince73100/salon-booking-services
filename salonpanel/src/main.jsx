import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './component/loginSignup/Signup.jsx';
// import Login from './component/loginSignup/Login.jsx';
import Jobpost from './component/jobpost/Jobpost.jsx';
import Services from './component/Services.jsx';
import serviceStore from '../store/index.js';
import { Provider } from 'react-redux'
import JobrequestCard from './component/jobrequestlist/JobrequestCard.jsx';
import Herosection from './component/herosection/Herosection.jsx';

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      {path:'/',element:<Herosection/>},
      { path: "/signup", element: <Signup /> },
      // { path: "/login", element: <Login /> },
      { path: "/jobpost", element: <Jobpost /> },
      { path: '/addServices', element: <Services /> },
      { path: '/jobrequestinfo', element: <JobrequestCard /> }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={serviceStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
