import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { serviceAction } from '../../store'
import axios from 'axios'
function Header() {
  const { states } = useSelector(store => store.service)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogOutartist = async () => {
    const token = localStorage.getItem("jwt_token")
    const resp = await axios.post(`http://localhost:4000/api/v1/salon/logout/${token}`)
    localStorage.removeItem("jwt_token")
    localStorage.removeItem('states')
    dispatch(serviceAction.tosetstates(undefined))
    navigate('/signup')
  }

  return (
    <header className='flex justify-between bg-white shadow-2xl sticky top-0 z-10'>
      <div className="w-56">
       <Link to={'/'}> <img src="https://res2.weblium.site/res/5c938446fb27710024481fb9/5cd055827ec61c0023cabda8_optimized.webp" alt="" /></Link>
      </div>
      <div className='flex gap-x-5  items-center relative right-20'>
        <Link to={'/'}>Home</Link>
        {!states && <Link to={'/signup'}>Sign up</Link>}
        {/* {!states && <Link to={'/login'}>Sign In</Link>} */}
        {states && <Link to={'/jobpost'}>Job Post</Link>}
        {states && <Link to={'/addServices'}>Add Services</Link>}
        {states && <Link to={'/jobrequestinfo'}>Job Request</Link>}
        {states && <button onClick={onLogOutartist}>Logout</button>}

      </div>
    </header>
  )
}

export default Header
