import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function RegisteredBusiness() {
    const [currentLocation, setCurrentLocation] = useState([])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation([position.coords.longitude, position.coords.latitude])
        })
    }, [])
    console.log(currentLocation)
    const token = localStorage.getItem('jwt');
    const { register, handleSubmit } = useForm()
    console.log(currentLocation)
    const hadleRegistered = async (data) => {
        const formData = new FormData();
        formData.append('salonName', data.salonName);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('city', data.city);
        formData.append('state', data.state);
        formData.append('salonType', data.salonType);
        formData.append('image', data.image[0]);
        formData.append('location', currentLocation)

        try {
            const result = await axios.post('http://localhost:3000/api/v1/salon/rgistered', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })
            if (result.data.status === 'success') {
                toast.success(result.data.message, {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="registered-business-container mt-24">
            <h1 className="text-center font-serif text-4xl font-bold">Start Your Business</h1>
            <div className=" flex justify-center mt-5">
                <div className="registered-form w-10/12 flex  ">
                    <div className="left-side-container w-1/2 bg-rose-500 flex items-center justify-center ">
                        <h1 className="text-center font-serif text-6xl font-bold text-white"> Registered <br /> and
                            <br />  Grow Your Business</h1>
                    </div>
                    <form onSubmit={handleSubmit(hadleRegistered)} className="form-container w-1/2 bg-white">
                        <div className="border-b border-gray-900/10 pb-12 pl-4">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Salon Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            {...register("salonName", { required: true })}
                                            className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Salon Type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            {...register("salonType", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option disabled>--Select Salon Type--</option>
                                            <option>Beauty salons</option>
                                            <option>Nail salons</option>
                                            <option>Facials</option>
                                            <option>Spa salons</option>
                                            <option>Hybrid salon</option>
                                            <option>Massages</option>
                                            <option>Belle Curls</option>
                                            <option>Evolve Salon</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="street-address"
                                            type="text"
                                            autoComplete="phone"
                                            {...register("phone", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="street-address"
                                            name="street-address"
                                            type="text"
                                            autoComplete="street-address"
                                            {...register("address", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            autoComplete="address-level2"
                                            {...register("city", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="region"
                                            name="region"
                                            type="text"
                                            autoComplete="address-level1"
                                            {...register("state", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        Upload your best Image
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="region"
                                            name="image"
                                            type="file"
                                            autoComplete="address-level1"
                                            {...register("image", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <div className="mt-2">
                                        <input
                                            id="region"
                                            name="region"
                                            type="submit"
                                            autoComplete="address-level1"
                                            className="px-2 block cursor-pointer w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 bg-rose-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default RegisteredBusiness
