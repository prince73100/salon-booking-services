import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
function Jobpost() {
    const { register, handleSubmit } = useForm();
    const handlePostjob = async (data) => {
        try {
            const token = localStorage.getItem('jwt_token')
            const jonpost = await axios.post(`http://localhost:3000/api/v1/salon/postjob/${token}`,data)
            const status = " " + jonpost.data.status
            if (status.charAt(1) === '4') {
                alert(jonpost.data.message)
            }
            else{
                alert(jonpost.data.message)
            }
        } catch (error) {
            alert(error.message)
        }
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(handlePostjob)} className="border-b border-gray-900/10 pb-12 w-2/5 relative top-10 left-2/4">
            <h2 className="leading-7 text-gray-900 text-3xl underline font-bold">JOB POST</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                    <label htmlFor="Jobtitle" className="block text-sm font-bold leading-6 text-gray-900">
                        Job Title
                    </label>
                    <div className="mt-2">
                        <input
                            id="Jobtitle"
                            name="Jobtitle"
                            type="text"
                            autoComplete="given-name"
                            {...register('Jobtitle', { required: true })}
                            placeholder='Enter job title'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="salary" className="block text-sm font-bold leading-6 text-gray-900">
                        Salary
                    </label>
                    <div className="mt-2">
                        <input
                            id="salary"
                            name="salary"
                            type="text"
                            autoComplete="family-name"
                            {...register('salary', { required: true })}
                             placeholder='Enter salary details'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="Address" className="block text-sm font-bold leading-6 text-gray-900">
                        Address
                    </label>
                    <div className="mt-2">
                        <input
                            id="Address"
                            name="address"
                            type="text"
                            autoComplete="Address"
                            {...register('address', { required: true })}
                            placeholder='Enter Address details'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="responsibility" className="block text-sm font-bold leading-6 text-gray-900">
                        Responsibility
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="responsibility"
                            name="responsibility"
                            type="text"
                            autoComplete="responsibility"
                            {...register('responsibility', { required: true })}
                            placeholder='Enter Responsibility'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="education" className="block text-sm font-bold leading-6 text-gray-900">
                        Education
                    </label>
                    <div className="mt-2">
                        <input
                            id="education"
                            name="education"
                            type="text"
                            autoComplete="address-level2"
                            {...register('education', { required: true })}
                            placeholder='Enter Education details'
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="jobtitle" className="block text-sm font-bold leading-6 text-gray-900">
                        Job Title
                    </label>
                    <div className="mt-2">
                        <select
                            id="jobtitle"
                            name="jobtitle"
                            autoComplete="country-name"
                            {...register('jobtitle', { required: true })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option disabled> -- select --</option>
                            <option>Full-time</option>
                            <option>Part-time </option>
                            <option>Internship</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-full">
                    <label htmlFor="skill" className="block text-sm font-bold leading-6 text-gray-900">
                        Require Skill
                    </label>
                    <div className="mt-2">
                        <select
                            id="skill"
                            name="skill"
                            autoComplete="country-name"
                            {...register('skill', { required: true })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option disabled> -- select --</option>
                            <option>Hair Cutting</option>
                            <option>Hair Styling</option>
                            <option>Hair Coloring</option>
                            <option>Chemical Treatments</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="mt-2">
                        <input
                            id="education"
                            name="education"
                            type="submit"
                            autoComplete="address-level2"
                            className="block w-full bg-rose-500 px-10 py-2 rounded-lg text-white text-lg font-bold rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Jobpost
