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

            axios.post('http://localhost:8000/api/transports', transport)
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
            <p>Add a new pet:</p>
            <Link to='/pets'>Home</Link>
            <form onSubmit={onSubmitHandler}>
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
                    <input type="date" value={transport.deadline} name="deadline" onChange={changeHandler} />
                </div>
                <button>Submit</button>
                {/* <input type='submit' /> */}

            </form>
        </div>
    )
}

export default AddPet