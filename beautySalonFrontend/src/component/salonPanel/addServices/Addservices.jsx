import { RiDeleteBin5Line } from "react-icons/ri";
function Addservices() {
    return (
        <>
            <div className="registered-business-container mt-16  h-screen">
                <h1 className="text-center font-serif text-4xl font-bold pt-10">Start Your Business</h1>
                <div className="  flex justify-center">
                    <div className="w-10/12 flex justify-between">
                        <div className=" w-1/3 ">
                            <h1 className="text-start  font-serif text-3xl font-bold pt-10">Your Services</h1>
                            <div className="flex justify-between mt-5">
                                <h1 className="font-serif text-xl font-bold">hair cut</h1>
                                <h2 className="font-serif text-xl font-bold">500</h2>
                                <RiDeleteBin5Line size={24}  className="cursor-pointer" color="red"/>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <h1 className="text-start font-serif text-3xl font-bold pt-10">Enter Services</h1>
                            <div className="form-content mt-5">
                                <label htmlFor="serviceName" className="font-serif text-xl font-bold">Services</label>
                                <div className="mt-2 w-2/3 bg-white rounded mb-5" >
                                    <input type="text" placeholder="Enter services name" className="px-4 py-2 outline-none border-0" />
                                </div>
                                <label htmlFor="serviceName" className="font-serif text-xl font-bold">Price</label>
                                <div className="mt-2 w-2/3 bg-white rounded" >
                                    <input type="number" placeholder="Enter Price" className="px-4 py-2 outline-none border-0" />
                                </div>
                                <button className="mt-10 px-5 block cursor-pointer rounded-md border-0 py-1.5 text-white    sm:text-sm sm:leading-6 pl-4 bg-rose-500" >ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addservices
