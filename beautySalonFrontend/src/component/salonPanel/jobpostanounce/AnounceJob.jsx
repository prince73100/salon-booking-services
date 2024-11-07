import { useForm } from "react-hook-form"
import axios from 'axios'
function Anouncejob() {
    const token = localStorage.getItem('jwt');
    const { register, handleSubmit } = useForm()

    const hadleRegistered = async (data) => {
        try {
            const result = await axios.post('http://localhost:3000/api/v1/salon/postingjob', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result)
        } catch (error) {
            console.log("Error:", error)
        }
    }
    return (
        <div className="registered-business-container mt-24">
            <h1 className="text-center font-serif text-4xl font-bold">Anounce Job Post</h1>
            <div className=" flex justify-center mt-5">
                <div className="registered-form w-11/12 lg:flex md:flex   ">
                    <div className=" lg:flex lg:block md:flex md:block left-side-container lg:w-1/2 md:w-1/2 bg-rose-500  items-center justify-center ">
                        <h1 className="text-4xl text-center font-serif lg:text-5xl md:text-4xl sm:text3xl font-bold text-white"> Post a Job which is available for Artist </h1>
                    </div>
                    <form onSubmit={handleSubmit(hadleRegistered)} className="form-container lg:w-1/2 md:w-1/2  bg-white">
                        <div className="border-b border-gray-900/10 pb-12 pl-4">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            {...register("jobtitle", { required: true })}
                                            className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Location
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            autoComplete="country-name"
                                            {...register("location", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Salary
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="street-address"
                                            type="number"
                                            autoComplete="phone"
                                            {...register("salary", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Education
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="street-address"
                                            name="street-address"
                                            type="text"
                                            autoComplete="street-address"
                                            {...register("education", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-6 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        Skill Require
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            autoComplete="address-level2"
                                            {...register("skill", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="region"
                                            name="region"
                                            type="text"
                                            autoComplete="address-level1"
                                            {...register("jobdec", { required: true })}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-6">
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
        </div>
    )
}

export default Anouncejob
