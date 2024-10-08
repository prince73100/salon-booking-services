import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { customeraction } from '../../../store/customerStore'
useDispatch
function Loginpage() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigation = useNavigate()
    const login = async (data) => {
        if (data.email === "" && data.password === "") {
            alert("Both field are require")
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/v1/user/login', data)
                .then((res) => {
                    const status = " " + res.data.status
                    if (status.charAt(1) === '4') {
                        alert(res.data.message)
                    }
                    else {
                        const expireIndate = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
                        dispatch(customeraction.toUpdatestate(true))
                        localStorage.setItem('jwt_token', res.data.token);
                        localStorage.setItem("states", true)
                        localStorage.setItem('expireIndate', expireIndate)
                        navigation("/")
                    }
                })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="form w-1/2 mt-10  ml-80  rounded-lg border-2 border-black border-rose-500 mt-8 ">
            <div className='p-10'>
                <div className="heading w-3/4 ml-60 pt-2">
                    <h1 className='font-serif font-bold text-2xl'>Login</h1>
                </div>
                <form onSubmit={handleSubmit(login)} className='ml-20 w-3/4'>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="email"
                                    id="first-name"
                                    autoComplete="given-name"
                                    placeholder='Email-Id'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register("email")}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    placeholder='Password'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                                    {...register("password")}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <input
                                    type="submit"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-pink-600 "
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="sm:col-span-full mt-10">
                    <p className='text-lg font-semibold'>New user? <Link to={'/signup'} className='text-rose-500'>Sign Up</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Loginpage
