import React, { useState } from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import axios from 'axios'

function Login() {

    return (
        <Form method="POST" className='w-2/5 ml-20'>
            <div className=" border-gray-900/10 pb-10 mt-10">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                        <label htmlFor="phone-numbe" className="block text-sm font-medium leading-6 text-gray-900">
                            Contact Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="phone-numbe"
                                name="phonenumber"
                                type="text"
                                autoComplete="phone-numbe"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-full">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="text"
                                autoComplete="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-full">
                        <button type='submit' className='bg-rose-500 px-10 py-2 rounded-lg text-white text-lg font-bold'>Sign In</button>
                    </div>
                    <div className="sm:col-span-full">
                        <p className='text-lg font-semibold'>New User ? <Link to={'/signup'} className='text-rose-500'>Create New Account</Link> </p>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export const login = async (data) => {
    const formData = await data.request.formData()
    const postData = Object.fromEntries(formData)
    if (postData.phonenumber === "" && postData.password === "") {
        alert("Both field are require")
        return null;
    }
    const resp = await axios.post("http://localhost:3000/api/v1/artist/artistlogin", postData)
    const strnum = " " + resp.data.status
    if (strnum.charAt(1) == "4") {
        alert(resp.data.message)
        return null
    }
    const expireInDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
    localStorage.setItem("token", resp.data.token);
    localStorage.setItem('expireInday', expireInDay)
    localStorage.setItem("states", true)
    return redirect("/")
}

export default Login
