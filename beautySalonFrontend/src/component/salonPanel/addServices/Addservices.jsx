/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from "react-icons/ri";
import { serviceAction } from "../../../../store/salonSlice";
import axios from 'axios'
function Addservices() {
    const token = localStorage.getItem('jwt')
    const serviceRef = useRef();
    const priceRef = useRef();
    const [imagePath, setImagePath] = useState('')
    const [servicelength, setserviceslength] = useState(0)
    const [servicedata,setServiceData] = useState([])
    const languages = [
        'Waxing',
        'Hair Cuts',
        'Hair Color',
        'Facial',
        'Bleach',
        'Hair Spa',
        'Beauty Salon Services',
        'Botox Treatment',
        'Cut',
        'Balayage'
    ];
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();
    const { service } = useSelector(store => store.salon)
    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value.length > 0) {
            const filteredSuggestions = languages.filter((language) =>
                language.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        dispatch(serviceAction.addService(suggestion))
        setSuggestions([]);
    };

    const handleAddService = async () => {
        const services = serviceRef.current.value;
        const price = priceRef.current.value;
        if (!imagePath) {
            alert("Please select an image file.")
            return
        }
        const formdata = new FormData();
        formdata.append('serviceName', services);
        formdata.append('price', price);
        formdata.append('image', imagePath);
        const servicesResult = await axios.post('  http://localhost:3000/api/v1/salon/addServices', formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(servicesResult)
    }

    const fetchAllServices = async () => {
        const res = await axios.get('http://localhost:3000/api/v1/salon/getservices', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setServiceData(res.data.allServices)
        setserviceslength(res.data.allServices.length)
    }
    useEffect(() => {
        fetchAllServices()
    }, [servicelength])

    return (
        <>
            <div className="registered-business-container mt-16  h-screen">
                <h1 className="text-center font-serif text-4xl font-bold pt-10">Start Your Business</h1>
                <div className="  flex justify-center">
                    <div className="w-10/12 flex justify-between">
                        <div className=" w-1/3 ">
                            <h1 className="text-start  font-serif text-3xl font-bold pt-10">Your Services</h1>
                            {
                                servicedata.map((ser, index) => <div className="flex justify-between mt-5" key={index} >
                                    <img src={ser.image} alt="image" style={{width:'50px', height:'50px'}}/>
                                        <h1 className="font-serif text-xl font-bold">{ser.serviceName}</h1>
                                        <h2 className="font-serif text-xl font-bold">{ser.price}</h2>
                                        <RiDeleteBin5Line size={24} className="cursor-pointer" color="red" />
                                    </div>
                                )
                            }

                        </div>
                        <div className="w-1/3">
                            <h1 className="text-start font-serif text-3xl font-bold pt-10">Enter Services</h1>
                            <div className="form-content mt-5">
                                <label htmlFor="serviceName" className="font-serif text-xl font-bold">Services</label>
                                <div className="mt-2 w-2/3 bg-white rounded mb-5 border" >
                                    <input type="text" placeholder="Enter services name" className="px-4 py-2 outline-none border-0"
                                        onChange={handleChange}
                                        value={query}
                                        ref={serviceRef}
                                    />
                                </div>
                                {suggestions.length > 0 && (
                                    <ul className='absolute right-70 mt-5 pb-5 bg-white' style={{ top: '47%', width: '18%' }}>
                                        {suggestions.map((suggestion, index) => (
                                            <li className='border-b hover:cursor-pointer hover:bg-rose-400 px-8 py-2' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <label htmlFor="serviceName" className="font-serif text-xl font-bold">Price</label>
                                <div className="mt-2 w-2/3 bg-white rounded border mb-4" >
                                    <input type="number" placeholder="Enter Price" className="px-4 py-2 outline-none border-0" ref={priceRef} />
                                </div>
                                <label htmlFor="serviceName" className="font-serif text-xl font-bold">Upload Image</label>
                                <div className="mt-2 w-2/3 bg-white rounded" >
                                    <input type="file" placeholder="Enter Price" className=" py-2 outline-none border-0" onChange={(e) => setImagePath(e.target.files[0])} />
                                </div>
                                <button className="mt-10 px-5 block cursor-pointer rounded-md border-0 py-1.5 text-white sm:text-sm sm:leading-6 pl-4 bg-rose-500" onClick={handleAddService} >ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addservices
