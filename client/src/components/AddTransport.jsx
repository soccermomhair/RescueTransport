import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddTransport = (props) => {
    const { id } = useParams();
    const { transport, setTransport } = props;
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        console.log(transport, "transport")
        console.log(id, "id")
        axios.get(`http://localhost:8000/api/transports/${id}`)
            .then(res => {
                console.log(res.data, "res.data")
                console.log()
                res.data.pickupTime = ""
                setTransport(res.data);
            })
            .catch((err) => {
                console.log(err.response);
                res.status(400).json(err);

            })
    }, [])

    const changeHandler = (e) => {
        setTransport({ ...transport, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("transport:", transport)
        axios.put('http://localhost:8000/api/transports/' + id, transport)
            .then(res => {
                console.log(res.data, "res.data");
                navigate('/pets');
            })
            .catch(err => {
                console.log(err);
                console.log(err, "errors")
                // setErrors(err.response.data.error.errors)
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setErrors(errArray);
                // setErrors(err.response.data.error.errors);
            })
    }

    return (
        <div>
            <div className='text-left mx-10'>
                <p className="text-green-700 text-2xl my-1 ">Rescue this pet:</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to='/pets'>Home</Link></button>
            </div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-sm">
                    <p className='font-bold'>Name: <span className='font-normal'>{transport.name}</span></p>
                    <p className='font-bold'>ID: <span className='font-normal'>{transport.refId}</span></p>
                    <p className='font-bold'>Description: <span className='font-normal'>{transport.description}</span></p>
                    <p className='font-bold'>Current location: <span className='font-normal'>{transport.currentLocation}</span></p>
                    <p className='font-bold'>Deadline: <span className='font-normal'>{transport.deadline}</span></p>
                    <p className='font-bold'>Rescue: <span className='font-normal'>{transport.rescue}</span></p>
                    <p className='font-bold'>Drop-off location: <span className='font-normal'>{transport.dropoffLocation}</span></p>
                    {/* <p>Rescue representative {login username}</p> */}
                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmitHandler}>
                        <div>
                            {errors.map((err, idx) => {
                                return (
                                    <p key={idx}>{err}</p>
                                )
                            })}
                        </div>

                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Pick-up date</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.deadline} name="pickupDate" onChange={changeHandler} />

                        </div>
                        <div className='mb-7'>
                            <label className="block text-gray-700 text-sm font-bold ">Pick-up time</label>
                            <br />
                            <input type="text" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.pickupTime} name="pickupTime" onChange={changeHandler} />
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        {/* <input type='submit' /> */}

                    </form>
                </div>
            </div>
        </div >
    )
}

export default AddTransport