import  { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Popup from 'reactjs-popup';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { customeraction } from '../../../store/customerStore';
import mainlogo from '../../assets/logo/main_logo.png'
function Header() {
  const token = localStorage.getItem("jwt")
  const { state, profilename } = useSelector(store => store.customerSlice)

  const dispatch = useDispatch()
  const [name, setname] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      let firstchar = res.data.user.firstname.charAt(0).toUpperCase();
      dispatch(customeraction.toupdateProfile(firstchar))
      setname(res.data.user)
    }).catch((error) => {
      console.log(error.message);
    })
  }, [state])

  return (
    <header className='header'>
      <div className='header-logo'>
        <Link to={'/'}><img src={mainlogo} alt="" /></Link>
      </div>
      <div className='list-item'>
        <ul>
          <li>Home</li>
          <li> <Link to={'/service'}>Service</Link> </li>
          <li>Gallery</li>
          <li>About</li>
          {state === true ?
            <li>
              <Popup trigger={<button className="profile">{profilename}</button>} position="bottom right">
                <Profile name={name.firstname} lastname={name.lastname} email={name.email} />
              </Popup>
            </li> : <li> <Link to={'/signup'}>SignUp</Link>/<Link to={'/login'}>Login</Link>  </li>}
        </ul>
      </div>
    </header>
  )
}

export default Header
