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
                const filteredList = alltransports.filter((transport, index) => transport._id !== struckId);
                setAllTransports(filteredList);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <p>List of pets requiring rescue or transport</p>
            <button onClick={logout}>Log Out</button>
            <button><Link to="/pets/new">Add a pet</Link></button>
            {
                <table>
                    <thead>
                        <tr>
                            {/* <th> Pic</th> */}
                            <th>Name</th>
                            <th> ID</th>
                            <th> Description</th>
                            <th> Current Location</th>
                            <th> Drop off destination</th>
                            <th> Deadline</th>
                            <th> Rescue</th>
                            <th> Transport</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            alltransports.map((transport, index) => (
                                <tr key={transport._id}>
                                    {/* <td>{transport.name}</td> */}
                                    <td><Link to={`/pets/${transport._id}/edit`}> {transport.name}</Link></td>
                                    {/* <td>
                                    <button onClick={() => deleteFilter(transport._id)}> Delete </button>
                                </td> */}
                                    <td>{transport.refId}</td>
                                    <td>{transport.description}</td>
                                    <td>{transport.currentLocation}</td>
                                    <td>{transport.dropoffLocation}</td>
                                    <td>{transport.deadline}</td>
                                    <td>
                                        {transport.rescue != "NONE" ?
                                            `${transport.rescue}` : <Link to={`/pets/${transport._id}/rescue`}>Rescue</Link>}
                                    </td>

                                    <td>
                                        {transport.pickupTime != "NONE" ?
                                            `${transport.pickupDate} ${transport.pickupTime}` : <Link to={`/pets/${transport._id}/transport`}>Transport</Link>}
                                    </td>
                                    <td><button onClick={() => deleteFilter(transport._id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }


        </div >
    );
}

export default Dashboard;