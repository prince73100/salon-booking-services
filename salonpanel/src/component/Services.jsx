import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { serviceAction } from '../../store';
import { useSelector } from 'react-redux';
import axios from 'axios'
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

function Services() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();
    const { service } = useSelector(store => store.service)
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
        setQuery("")
    };
    const deleteServices = (services) => {
        dispatch(serviceAction.deleteServices(services))
    }
    const handleAddServices = async () => {
        if (service.length == 0) {
            alert("please Select value")
        }
        else {
            try {
                const token = localStorage.getItem('jwt_token')
                console.log(token);
                const services = await axios.post(`http://localhost:4000/api/v1/salon/addservice/${token}`, service).then((res) => {
                    alert(res.data.message)
                    console.log(res);
                })
            } catch (error) {
                alert(error.message)
            }
        }
    }
    return (
        <div className='relative top-10 left-3/4 w-80 shadow-md '>
            <h1 className='text-2xl font-bold pb-4 text-center'>ADD SERVICES</h1>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Add Services"
                className='relative left-20 mb-4'
            />
            {suggestions.length > 0 && (
                <ul className='relative left-20 mt-5 pb-5'>
                    {suggestions.map((suggestion, index) => (
                        <li className='border-b w-44 hover:cursor-pointer hover:bg-rose-400' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <div className=' w-60 flex gap-x-2 flex-wrap relative left-10  ' >
                {service.map((services, index) =>

                    <div className="flex bg-rose-100 rounded-2xl justify-between px-2 my-2" key={index}>
                        <div><p className=''>{services}</p></div>
                        <div className='cursor-pointer pl-4' onClick={() => deleteServices(services)}>x</div>
                    </div>
                )}
            </div>
            <div className="relative top-0 left-28 pb-4">
                <button className='bg-rose-500 px-5 py-1 rounded-lg text-white text-lg font-bold' onClick={handleAddServices}>Add </button>
            </div>
        </div>
    );
}
export default Services;

