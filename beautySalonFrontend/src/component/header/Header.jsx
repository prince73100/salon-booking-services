import { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Popup from 'reactjs-popup';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { customeraction } from '../../../store/customerStore';
import mainlogo from '../../assets/logo/main_logo.png'
import { IoIosSearch } from "react-icons/io";
import { authuseraction } from '../../../store/artistSlice';


function Header() {
  const { state, profilename } = useSelector(store => store.user)
  const { alljob } = useSelector(store => store.artistsevices)
  const dispatch = useDispatch()
  const token = localStorage.getItem("jwt")
  const role = localStorage.getItem('role')
  ///searching
  let alljobs = []
  alljob.forEach(element => {
    alljobs.push(element.salonname)
  });
  const [searchKeyword, setSearchkeyword] = useState('')
  const [suggestion, setsuggetion] = useState([])
  const handleChange = (e) => {
    const value = e.target.value
    setSearchkeyword(value)
    if (value.length > 0) {
      const filteredData = alljobs.filter((element) =>
        element.toLowerCase().includes(value.toLowerCase())
      )
      setsuggetion(filteredData)
    }
    else {
      setsuggetion([])
    }
  }
  const handlefindSalon = (value) => {
    setSearchkeyword(value)
    const filterJobs = alljob.filter(item => item.salonname == value)
    dispatch(authuseraction.toupdatesjobs(filterJobs))
  }
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

      {(state === true && role === 'Artist') && <div className="search w-1/4">
        <IoIosSearch />
        <input type="search" placeholder='Search Salon for job' onChange={handleChange} value={searchKeyword} />
      </div>}
      {
        suggestion.length > 0 && <div className='absolute top-14 left-96 bg-white p-4 shadow-lg w-56 z-10 '>
          {suggestion.map((item, index) => <div key={index} onClick={() => handlefindSalon(item)} className='border-b hover:bg-rose-100 hover:cursor-pointer' >{item}</div>)}
        </div>
      }
      <div className='list-item'>
        <ul>
          <li>Home</li>
          {/* User */}
          {(state === true && role === 'user') && <li><Link to={'/service'}>Service</Link></li>}
          {(state === true && role === 'user') && <li><Link to={'#'}>Gallery</Link></li>}
          {(state === true && role === 'user') && <li><Link to={'#'}>About</Link></li>}
          {(state === true && role === 'Salon') && <li><Link to={'/regiteredbusiness'}>Start Business</Link></li>}
          {(state === true && role === 'Salon') && <li><Link to={'/anounceJob'}>Announce Job</Link></li>}
          {/* Artist */}
          {(state === true && role === 'Artist') && <li><Link to={'/jobs'}>Jobs</Link></li>}
          {/* salon route */}
          {(state === true && role === 'Salon') && <li><Link to={'/addServices'}>Add Services</Link></li>}
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
