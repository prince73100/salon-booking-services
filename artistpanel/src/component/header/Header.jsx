import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom'
import './header.css'
import Popup from 'reactjs-popup';
import Profile from '../profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { authuseraction } from '../../../store';
function Header() {
    const { states, alljob } = useSelector(store => store.authuser)
    const dispatch = useDispatch()
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
    return (
        <header className='header '>
            <div className='header-logo w-1/4 '>
                <a href='#'><img src="https://res2.weblium.site/res/5c938446fb27710024481fb9/5cd055827ec61c0023cabda8_optimized.webp" alt="" style={{ width: "200px" }} /></a>
            </div>
            <div className="search w-1/4">
                <IoIosSearch />
                <input type="search" placeholder='Search Salon for job' onChange={handleChange} value={searchKeyword} />
            </div>
            {
                suggestion.length > 0 && <div className='absolute top-14 left-96 bg-white p-4 shadow-lg w-56 z-10 '>
                    {suggestion.map((item, index) => <div key={index} onClick={() => handlefindSalon(item)} className='border-b hover:bg-rose-100 hover:cursor-pointer' >{item}</div>)}
                </div>
            }
            <div className='list-item'>
                <ul>
                    <Link className='border px-4 py-2 hover:bg-rose-500 hover:border-indigo-600 hover:text-white hover:font-bold hover:rounded-md' to={'/'} >Home</Link>
                    <Link className='border px-4 py-2 hover:bg-rose-500 hover:border-indigo-600 hover:text-white hover:font-bold hover:rounded-md' to={'/'}>Job</Link>
                    <Link className='border px-4 py-2 hover:bg-rose-500 hover:border-indigo-600 hover:text-white hover:font-bold hover:rounded-md' to={'/signup'}>Sign Up</Link>
                    <Link className='border px-4 py-2 hover:bg-rose-500 hover:border-indigo-600 hover:text-white hover:font-bold hover:rounded-md' to={'/login'}>Sign In</Link>
                    {states && <li><Popup trigger={<button className='py-2 px-4 bg-rose-500 rounded-full text-white font-bold'> P</button>} position="bottom center">
                        <Profile />
                    </Popup></li>}
                </ul>
            </div>
        </header>
    )
}
export default Header
