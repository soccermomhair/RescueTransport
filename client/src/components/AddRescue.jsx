import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddRescue = (props) => {
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
                // const errArray = [];
                // for (const key of Object.keys(err.response.data.errors)) {
                //     errArray.push(err.response.data.errors[key].message)
                // }
                // setErrors(errArray);
                setErrors(err.response.data.error.errors);
            })
    }

    return (
        <div>
            <p>Rescue this pet:</p>
            <Link to='/pets'>Home</Link>
            <p>{transport.name}</p>
            <p>{transport.refId}</p>
            <p>{transport.description}</p>
            <p>{transport.currentLocation}</p>
            <p>{transport.deadline}</p>
            {/* <p>Rescue representative {login username}</p> */}
            <form onSubmit={onSubmitHandler}>
                <div>
                    {errors.map((err, idx) => {
                        return (
                            <p key={idx}>{err}</p>
                        )
                    })}
                </div>

                <div >
                    <label>Rescue</label>
                    <br />
                    <input type="text" value={transport.rescue} name="rescue" onChange={changeHandler} />
                </div>
                <div >
                    <label>Drop-off Location</label>
                    <br />
                    <input type="text" value={transport.dropoffLocation} name="dropoffLocation" onChange={changeHandler} />
                </div>



                <button>Submit</button>
                {/* <input type='submit' /> */}

            </form>
        </div>
    )
}

export default AddRescue