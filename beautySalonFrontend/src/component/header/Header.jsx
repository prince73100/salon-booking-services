import { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Popup from 'reactjs-popup';
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { customeraction } from '../../../store/customerStore';
import mainlogo from '../../assets/logo/logo.png'
import { IoIosSearch } from "react-icons/io";
import { authuseraction } from '../../../store/artistSlice';
import { MdOutlineManageHistory } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import apiUrl from '../../config/config';
import { ThreeDots } from 'react-loader-spinner'


function Header() {
  const { state, profilename } = useSelector(store => store.user)
  const { alljob } = useSelector(store => store.artistsevices)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const token = localStorage.getItem("jwt")
  const role = localStorage.getItem('role')
  const [mobileView, setMobileView] = useState(false)
  const [isloaded, setLoaded] = useState(false)

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
    axios.get(`${apiUrl}/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.data.status === 'success') {
        setLoaded(true)
        let firstchar = res.data.user.firstname.charAt(0).toUpperCase();
        dispatch(customeraction.toupdateProfile(firstchar))
        setname(res.data.user)
      }
    }).catch((error) => {
      console.log(error.message);
    })
  }, [state])

  //handlelogout
  const onLogout = () => {
    dispatch(customeraction.toUpdatestate(undefined))
    dispatch(customeraction.toUpdateToken(""))
    localStorage.removeItem('jwt')
    localStorage.removeItem('exipreIn')
    localStorage.removeItem('role')
    navigation('/login')
  }
  const onhandlesidebar = () => {
    setMobileView(true)
  }
  const onhandlebackbtn = () => {
    setMobileView(false)
  }
  const closemanue = () => {
    setMobileView(false)
  }
  const handlelogoRoute = () => {
    console.log(localStorage.getItem('role') === 'salon')
    if (localStorage.getItem('role') === 'salon') return "/salonbusiness"
    if (localStorage.getItem('role') === 'artist') return "/salonbusiness"
    if (localStorage.getItem('role') === 'user') return "/"
    if (!localStorage.getItem('role')) return "/"
  }

  console.log(handlelogoRoute())
  return (
    <>
      <header className='header'>
        <div className='header-logo'>
          <Link to={`${handlelogoRoute()}`}>
            <img src={mainlogo} alt="" />
          </Link>
        </div>
        {(state === true && role === 'artist') && <div className="search w-1/4">
          <IoIosSearch />
          <input type="search" placeholder='Search Salon for job' onChange={handleChange} value={searchKeyword} />
        </div>}
        {
          suggestion.length > 0 && <div className='absolute top-14 left-96 bg-white p-4 shadow-lg w-56 z-10 '>
            {suggestion.map((item, index) => <div key={index} onClick={() => handlefindSalon(item)} className='border-b hover:bg-rose-100 hover:cursor-pointer' >{item}</div>)}
          </div>
        }
        <div className='list-items'>
          <ul>
            <li>Home</li>
            {/* User */}
            {(state === true && role === 'user') && <li><Link to={'#'}>Gallery</Link></li>}
            {(state === true && role === 'user') && <li><Link to={'/service'}>Service</Link></li>}
            <li><Link to={'#'}>About</Link></li>
            {state === true && role === 'user' && <li className='relative'> <Link to={'/history'}> <MdOutlineManageHistory size={20} /> </Link></li>}

            {/* salon route */}
            {(state === true && role === 'salon') && <li><Link to={'/regiteredbusiness'}>Start Business</Link></li>}
            {(state === true && role === 'salon') && <li><Link to={'/anounceJob'}>Announce Job</Link></li>}
            {(state === true && role === 'salon') && <li><Link to={'/addServices'}>Add Services</Link></li>}
            {(state === true && role === 'salon') && <li><Link to={'/upcomingBook'}>Booking</Link></li>}

            {/* Artist */}

            {(state === true && role === 'Artist') && <li><Link to={'/jobs'}>Jobs</Link></li>}
            {state === true ?
              <>
                <Popup trigger={
                  <button className="profile">
                    {!isloaded ? <ThreeDots
                      visible={true}
                      height="30"
                      width="10"
                      color="#FFFFFF"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      wrapperClass=""
                    /> : `${profilename}`}

                  </button>
                }
                  position="bottom right">
                  <Profile name={name.firstname} lastname={name.lastname} email={name.email} />
                </Popup>
              </> :
              <ul>
                <li>
                  <Link to={'/signup'}>SignUp</Link>
                </li>
                <li>
                  <Link to={'/login'}>Login</Link>
                </li>
              </ul>}

          </ul>
        </div>
      </header>


      <header className=' mobile_view_header'>
        <div className='header-logo w-2/3'>
          <Link to={'/'}><img src={mainlogo} alt="" /></Link>
        </div>
        {(state === true && role === 'artist') && <div className="search w-1/4">
          <IoIosSearch />
          <input type="search" placeholder='Search Salon for job' onChange={handleChange} value={searchKeyword} />
        </div>}
        {
          suggestion.length > 0 && <div className='absolute top-14 left-96 bg-white p-4 shadow-lg w-56 z-10 '>
            {suggestion.map((item, index) => <div key={index} onClick={() => handlefindSalon(item)} className='border-b hover:bg-rose-100 hover:cursor-pointer' >{item}</div>)}
          </div>
        }
        <div className='flex justify-around w-1/3'>
          {state && <Popup trigger={
            <button className="profile">
              {!isloaded ? <ThreeDots
                visible={true}
                height="30"
                width="10"
                color="#FFFFFF"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                wrapperClass=""
              /> : `${profilename}`}

            </button>
          }
            position="bottom right">
            <Profile name={name.firstname} lastname={name.lastname} email={name.email} />
          </Popup>}

          <div onClick={onhandlesidebar}>
            < IoReorderThreeOutline size={40} />
          </div>
        </div>

        {mobileView && <div className='mobile-views-list-items'>
          <div className='backbtn' onClick={onhandlebackbtn}>
            <IoArrowBack size={30} />
          </div>
          <ul>
            <li onClick={closemanue}>Home</li>
            {/* User */}
            {(state === true && role === 'salon') ? <></> : <li onClick={closemanue}><Link to={'/service'}>Service</Link></li>}
            {(state === true && role === 'user') && <li><Link to={'#'}>Gallery</Link></li>}
            <li onClick={closemanue}><Link to={'#'}>About</Link></li>
            {(state === true && role === 'salon') && <li onClick={closemanue}><Link to={'/regiteredbusiness'}>Start Business</Link></li>}
            {(state === true && role === 'salon') && <li onClick={closemanue}><Link to={'/anounceJob'}>Announce Job</Link></li>}
            {/* Artist */}
            {(state === true && role === 'Artist') && <li onClick={closemanue}><Link to={'/jobs'}>Jobs</Link></li>}
            {/* salon route */}
            {(state === true && role === 'salon') && <li onClick={closemanue}><Link to={'/addServices'}>Add Services</Link></li>}
            {state === true ?
              <>
                {/* <Popup trigger={<button className="profile">{profilename}</button>} position="bottom right">
                  <Profile name={name.firstname} lastname={name.lastname} email={name.email} />
                </Popup> */}
                <li onClick={onLogout}>Logout</li>
              </> : <ul><li onClick={closemanue}><Link to={'/signup'}>SignUp</Link></li> <li onClick={closemanue}><Link to={'/login'}>Login</Link></li> </ul>}
            {/* {state === true && role === 'user' && <li className='relative'>
              <Link to={'/history'}>
                <FaHistory size={20} />
              </Link>
            </li>} */}
          </ul>
        </div>}
      </header>
    </>
  )
}


export default Header
