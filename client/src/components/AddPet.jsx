import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import dayjs from "dayjs"

const AddPet = (props) => {
    const { alltransports, setAllTransports, editedPet, onSubmitProps } = props;
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    // const withTime24hourFormat = dayjs(deadline).format("MM/DD/YYYY HH:mm:ss A")
    const [transport, setTransport] = useState({
        name: "",
        refId: "",
        description: "",
        currentLocation: "",
        dropoffLocation: "NONE",
        deadline: "",
        // deadline.toLocaleDateString('en-US', {
        //     month: '2-digit',
        //     day: '2-digit',
        //     year: 'numeric'
        // }),
        rescue: "NONE",
        pickupDate: "NONE",
        pickupTime: "NONE"
    })

    const changeHandler = (e) => {
        setTransport({ ...transport, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (editedPet) {
            onSubmitProps(transport)
        }
        else {

            axios.post('http://localhost:8000/api/transports', transport, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    navigate('/pets');
                })
                .catch(err => {
                    console.log(err);
                    const errArray = [];
                    for (const key of Object.keys(err.response.data.errors)) {
                        errArray.push(err.response.data.errors[key].message)
                    }
                    setErrors(errArray);
                })
        }
    }

    return (
        <div>
            <div className='text-left mx-10'>
                <p className="text-green-700 text-2xl my-5 ">Add a new pet:</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to='/pets'>Home</Link></button>
            </div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-sm">
                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmitHandler}>
                        <div>
                            {errors.map((err, idx) => {
                                return (
                                    <p key={idx}>{err}</p>
                                )
                            })}
                        </div>

                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Name</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.name} name="name" onChange={changeHandler} />
                        </div>
                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">ID</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.refId} name="refId" onChange={changeHandler} />
                        </div>
                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Description</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.description} name="description" onChange={changeHandler} />
                        </div>
                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Current Location</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.currentLocation} name="currentLocation" onChange={changeHandler} />
                        </div>
                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Deadline</label>
                            <br />
                            <input type="date" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.deadline} name="deadline" onChange={changeHandler} />
                        </div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        {/* <input type='submit' /> */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPet