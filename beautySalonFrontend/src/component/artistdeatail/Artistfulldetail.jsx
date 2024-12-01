import { PiStudentFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
function Artistfulldetail() {
    ///bg-orange-400
    return (
        <div className='bg-gradient-to-t from-rose-100 to-rose-400 flex justify-center artist-full-details'>
            <div className=' w-10/12   '>
                <h1 className='text-4xl font-bold px-4 py-4 '>Artist Info</h1>
                <div className='flex gap-x-96 px-10 py-10'>
                    <div>
                        <div className="profiles flex justify-center">
                            <h1 className='bg-rose-400 text-center pt-12 w-40 h-40 text-6xl font-semibold rounded-full text-white'>
                                P
                            </h1>
                        </div>
                        <div className="profiledetail ml-10">
                            <h1 className='text-4xl font-bold pt-5 '>PRINCE</h1>
                            <h3 className='text-xl font-semibold pt-2 text-rose-400'>Define Role</h3>
                            <h1 className='text-4xl font-bold pt-5'>About</h1>
                            <div className="about mt-5 grid gap-4 grid-cols-2 grid-rows-2  ">
                                <div className='flex items-center'>
                                    <PiStudentFill />
                                    <h1 className='pl-2'>Bachelar</h1>
                                </div>
                                <div className='flex items-center'>
                                    <FaLocationDot />
                                    <h1 className='pl-2'>Location</h1>
                                </div>
                                <div className='flex items-center'>
                                    <FaHeart />
                                    <h1 className='pl-2'>Single</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>Skill</h1>
                        <div className="skills  border-b pb-4">
                            <h1>xyz</h1>
                            <h1>xyc</h1>
                            <h1>xyb</h1>
                        </div>
                        <div className="workat mt-5 border-b pb-4">
                            <h1 className='text-2xl font-bold'>work At</h1>

                            <p>Balbeer</p>
                        </div>
                        <div className='mt-10 '>
                            <h1 className='text-2xl font-bold'>Comment</h1>
                            <textarea name="" id="" className='w-96 mt-5 border '>

                            </textarea>
                            <div className='mt-10'>
                                <button className='text-white bg-rose-500 py-2 rounded-xl px-4 cursor-pointer font-bold'>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artistfulldetail
