/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function Errorpage() {
  return (
    <div className='mt-20 h-96 flex justify-center items-center'>
      <div className=' w-11/12 flex justify-center'>
        <div>
          <h1 className='text-rose-500 font-bold  text-8xl'>404</h1>
          <p className='py-5 text-center text-rose-600 font-bold'>Sorry, Page Not Found</p>
          <div className='flex justify-center mt-20'>
          <Link className='bg-rose-500 px-10 py-2 text-white font-bold'>Back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Errorpage
