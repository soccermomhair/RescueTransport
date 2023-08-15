import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from "dayjs"

const EditPetTwo = (props) => {
    const { id } = useParams();
    const { transport, setTransport } = props;
    const navigate = useNavigate();

    // let date = transport.deadline

    // function taskDate(dateMilli) {
    //     var d = (new Date(dateMilli) + '').split(' ');
    //     d[2] = d[2] + ',';

    //     return [d[0], d[1], d[2], d[3]].join(' ');
    // }

    // var datemilli = Date.parse('res.data.deadline');
    // console.log(taskDate(datemilli));

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        console.log(transport, "transport")
        console.log(id, "id")
        axios.get(`http://localhost:8000/api/transports/${id}`)
            .then(res => {
                // taskDate(datemilli)
                console.log(res.data, "res.data")
                // transport.deadline = withTime24hourFormat(transport.deadline)
                // Need to get the DATE!!!
                // Check dayjs documentation
                let date = (res.data.deadline).split("T")[0]
                // .substring(0, 10)
                // dayjs(date).format('YYYY-MM-DD')
                console.log(date, "date")
                console.log()
                setTransport(res.data);
                // setLoaded(true);
            })
            .catch((err) => {
                console.log(err.response);
                res.status(400).json(err);

            })
    }, [])
    // const withTime24hourFormat = dayjs(deadline).format("YYYY/MM/DD")
    const updatePet = (e) => {
        e.preventDefault();
        console.log("transport", transport)
        axios.put('http://localhost:8000/api/transports/' + id, transport)

            // make transport an object?????
            .then(res => {
                console.log(res)
                navigate('/pets')
            })
            .catch(err => {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
            });
    }

    // const [transport, setTransport] = useState({
    //     name: "",
    //     refId: "",
    //     description: "",
    //     currentLocation: "",
    //     dropoffLocation: "Chicago",
    //     deadline: "",
    //     rescue: "FFF",
    //     pickupTime: ""
    // })

    const changeHandler = (e) => {
        setTransport({
            ...transport,
            // if ((e.target.name)==(e.target.deadline)) {
            // (e.target.deadline = e.target.deadline.value.split("T")[0])}
            // else {
            // [e.target.name]: e.target.value })}

            [e.target.name]: e.target.value
        })
    }

    // const onSubmitHandler = (e) => {
    //     e.preventDefault();

    //         axios.post('http://localhost:8000/api/transports', transport)
    //             .then(res => {
    //                 console.log(res.data);
    //                 navigate('/pets');
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 const errArray = [];
    //                 for (const key of Object.keys(err.response.data.errors)) {
    //                     errArray.push(err.response.data.errors[key].message)
    //                 }
    //                 setErrors(errArray);
    //             })
    //     }
    // }

    return (
        <div>
            <div className='text-left mx-10'>
                <p className="text-green-700 text-2xl my-5 ">Edit a pet:</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to='/pets'>Home</Link></button>
            </div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-sm">

                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={updatePet}>
                        <div className=''>
                            {errors.map((err, idx) => {
                                return (
                                    <p mt-1 text-sm leading-6 text-gray-600key={idx}>{err}</p>
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
                            <input type="date" className="shadow-sm appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={transport.date} name="deadline" onChange={changeHandler} />
                            {/* transport.deadline.split("T")[0] */}
                            {/* .split("T")[0].substring(0, 10) */}
                        </div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        {/* <input type='submit' /> */}

                    </form>

                </div>
            </div>
        </div>


    )
}

export default EditPetTwo