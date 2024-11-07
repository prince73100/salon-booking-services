/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Sercomponents } from './Servicepage'
function CostViseServices() {
    const { services_provide, AllSerivces } = useSelector(store => store.user)
    const [category, setCategory] = useState([])
    const [bgColor,setbgColor]=useState('')

    const handleFilterServices = (servicename) => {
        const filteredService = AllSerivces.filter((el) => el.serviceName === servicename)
        setCategory(filteredService)
        setbgColor(servicename)
    }
    console.log(category)
    return (
        <div className='w-full bg-rose-100 pb-5'>
            <div className="top_service_banner bg-rose-500">
                <h1 className='py-8 text-center text-4xl font-bold font-serif text-white'>Our Services</h1>
            </div>
            <h1 className='pt-5 text-center text-5xl  font-serif pb-3'>Our Services</h1>
            <div className=" flex justify-center">
                <div className="w-11/12   flex justify-between">
                    <div className="w-1/4 bg-white flex justify-center shadow-2xl min-h-96">
                        <ul className='w-10/12'>
                            {services_provide.map((el, index) => <li key={index} className={`${bgColor===el.serviceName ? 'bg-rose-500 text-white':''}  side-bar-list  py-1 px-2 my-4 font-blod font-serif text-base cursor-pointer`} onClick={() => handleFilterServices(el.serviceName)} >{el.serviceName}</li>)}
                        </ul>
                    </div>
                    <div className='flex justify-start  ' style={{width:'70%'}}>
                        {category.map((el, index) => <Sercomponents key={index} item={el} ispriceDisplay={true} isSalonnameDisplay={true}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CostViseServices
