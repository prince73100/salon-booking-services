/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Starrating from './Starrating'

function Artiestdetail({ artiest }) {
  return (
    <div className="card-Item bg-lime-100 h-56">
      <div className="card-image w-56">
        <div className="bg-rose-400 w-20 h-20 relative top-4 left-16 text-5xl font-semibold text-center pt-4 rounded-full text-white">
          P
        </div>
      </div>

      <div className="card-info relative top-10 left-14">
        <div className="name font-serif text-xl font-bold">
          {artiest.name}
        </div>
        <div className="email font-serif">
          {artiest.emailId}
        </div>
        <div className="contact font-serif">
          {artiest.Mobile_No}
        </div>
        <div className="contact font-serif">
          <Starrating />
        </div>
      </div>
    </div>
  )
}

export default Artiestdetail
