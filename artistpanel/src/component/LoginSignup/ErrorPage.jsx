import React from 'react'
import { useRouteError } from "react-router-dom";
function ErrorPage() {
    const error=  useRouteError()
  return (
    <div className=''>
      <h1>{error.message}</h1>
    </div>
  )
}

export default ErrorPage
