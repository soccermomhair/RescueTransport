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
            <p>Edit a pet:</p>
            <Link to='/pets'>Home</Link>
            <form onSubmit={updatePet}>
                <div>
                    {errors.map((err, idx) => {
                        return (
                            <p key={idx}>{err}</p>
                        )
                    })}
                </div>

                <div >
                    <label>Name</label>
                    <br />
                    <input type="text" value={transport.name} name="name" onChange={changeHandler} />
                </div>
                <div >
                    <label>ID</label>
                    <br />
                    <input type="text" value={transport.refId} name="refId" onChange={changeHandler} />
                </div>
                <div >
                    <label>Description</label>
                    <br />
                    <input type="text" value={transport.description} name="description" onChange={changeHandler} />
                </div>
                <div >
                    <label>Current Location</label>
                    <br />
                    <input type="text" value={transport.currentLocation} name="currentLocation" onChange={changeHandler} />
                </div>
                <div >
                    <label>Deadline</label>
                    <br />
                    <input type="date" value={transport.deadline.split("T")[0]} name="deadline" onChange={changeHandler} />
                    {/* .split("T")[0].substring(0, 10) */}
                </div>
                <button>Submit</button>
                {/* <input type='submit' /> */}

            </form>
        </div>
    )
}

export default EditPetTwo