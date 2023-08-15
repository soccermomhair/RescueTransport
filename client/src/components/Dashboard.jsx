import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = (props) => {
    // const { transport, setTransport } = useState([])
    const { alltransports, setAllTransports } = props;
    // useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/transports")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                // const date = (res.data.deadline).split("T")[0]
                setAllTransports(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const deleteFilter = (struckId) => {
        axios.delete(`http://localhost:8000/api/transports/${struckId}`)
            .then((res) => {
                console.log(res.data);
                setAllTransports(filteredList);
                const filteredList = alltransports.filter((transport, index) => transport._id !== struckId);

            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div >
            <div className='text-right'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Log Out</button>
            </div>
            <div className='text-left mx-10'>
                <p className="text-green-700 text-2xl my-5 ">Pets requiring rescue or transport</p>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to="/pets/new">Add a pet</Link></button>
            </div>
            {
                <div class="flex flex-col mx-10">
                    <div class="overflow-x-visible sm:-mx- lg:-mx-10">
                        <div class="inline-block min-w-full py-2 sm:px-3 lg:px-4">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-left text-sm font-light">
                                    <thead class="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            {/* <th> Pic</th> */}
                                            <th scope="col" class="px-4 py-4">Name</th>
                                            <th scope="col" class="px-4 py-4"> ID</th>
                                            <th scope="col" class="px-4 py-4"> Description</th>
                                            <th scope="col" class="px-4 py-4"> Current Location</th>
                                            <th scope="col" class="px-4 py-4"> Drop off destination</th>
                                            <th scope="col" class="px-4 py-4"> Deadline</th>
                                            <th scope="col" class="px-4 py-4"> Rescue</th>
                                            <th scope="col" class="px-4 py-4"> Transport</th>
                                            <th scope="col" class="px-4 py-4">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alltransports.map((transport, index) => (
                                                <tr class="border-b dark:border-neutral-500" key={transport._id}>
                                                    {/* <td>{transport.name}</td> */}
                                                    <div >
                                                        <td class="whitespace-nowrap px-4 py-4 font-medium"><Link className='text-blue-500 underline' to={`/pets/${transport._id}/edit`}> {transport.name}</Link></td>
                                                    </div>
                                                    {/* <td>
                                    <button onClick={() => deleteFilter(transport._id)}> Delete </button>
                                </td> */}
                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">{transport.refId}</td>
                                                    <td class="whitespace-normal px-4 py-4 font-medium">{transport.description}</td>
                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">{transport.currentLocation}</td>
                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">{transport.dropoffLocation}</td>
                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">{transport.deadline}</td>

                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">
                                                        {transport.rescue != "NONE" ?
                                                            `${transport.rescue}` : <Link className='text-blue-500 underline ' to={`/pets/${transport._id}/rescue`}>Rescue</Link>}
                                                    </td>

                                                    <td class="whitespace-nowrap px-4 py-4 font-medium">
                                                        {transport.pickupTime != "NONE" ?
                                                            `${transport.pickupDate} ${transport.pickupTime}` : <Link className='text-blue-500 underline ' to={`/pets/${transport._id}/transport`}>Transport</Link>}
                                                    </td>
                                                    <td class="whitespace-nowrap px-4 py-4 font-medium"><button class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteFilter(transport._id)}>Delete</button></td>
                                                </tr>


                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div >
    );
}

export default Dashboard;