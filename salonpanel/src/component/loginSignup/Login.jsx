// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useForm } from "react-hook-form"
// import { serviceAction } from '../../../store';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// function Login() {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch()
//   const navigation = useNavigate()

//   const handleLogin = async (data) => {
//     if (data.email === "" && data.password === "") {
//       alert("Both field are require")
//       return;
//     }
//     try {
//       await axios.post('http://localhost:4000/api/v1/salon/login', data)
//         .then((res) => {
//           const status = " " + res.data.status
//           if (status.charAt(1) === '4') {
//             alert(res.data.message)
//           }
//           else {
//             dispatch(serviceAction.tosetstates("true"))
//             localStorage.setItem('jwt_token', res.data.token);
//             localStorage.setItem("states", true)
//             navigation("/")
//           }
//         })
//     } catch (error) {
//       console.log(error.message);
//     }
//     console.log(data);
//   }
//   return (
//     <form onSubmit={handleSubmit(handleLogin)} className=" border-gray-900/10 pb-12 w-1/3 relative inset-x-2/4 top-10">
//       <h2 className=" font-bold leading-7 text-gray-900 text-center text-4xl  ">Sign In</h2>
//       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//         <div className=" font-page-details sm:col-span-full">
//           <label htmlFor="contactnumber" className="block text-sm font-bold leading-6 text-gray-900">
//             Contact Number
//           </label>
//           <div className="mt-2">
//             <input
//               id="contactnumber"
//               name="contactnumber"
//               type="text"
//               autoComplete="contactnumber"
//               placeholder='Enter your contact number '
//               {...register('phonenumber', { required: true })}
//               className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div className="sm:col-span-full font-page-details">
//           <label htmlFor="Password" className="block text-sm font-bold leading-6 text-gray-900">
//             Password
//           </label>
//           <div className="mt-2">
//             <input
//               id="Password"
//               name="Password"
//               type="password"
//               {...register('password', { required: true })}
//               autoComplete="password"
//               placeholder='Enter your password'
//               className="block w-3/4 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="col-span-full">
//           <div className="mt-2">
//             <input
//               id="street-address"
//               name="street-address"
//               type="submit"
//               autoComplete="street-address"
//               className="block w-3/4 cursor-pointer text-white font-bold w-52 rounded-md border-0 py-1.5 px-4  shadow-sm   bg-rose-500"
//             />
//           </div>
//         </div>
//         <div className=' w-52'>
//           <p className='text-lg font-semibold'>New User ? <Link to={'/signup'} className='text-rose-500'>Sign Up</Link></p>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default Login
