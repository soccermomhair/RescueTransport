import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate("/pets")
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h3 className='text-lg underline font-semibold p-4'>Register</h3>
                <div className='my-5'>
                    <div>
                        <label>First name</label>
                        <br />
                        <input type="text" value={userInfo.firstName} name="firstName" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Last name</label>
                        <br />
                        <input type="text" value={userInfo.lastName} name="lastName" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type="email" value={userInfo.email} name="email" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Password</label>
                        <br />
                        <input type="password" value={userInfo.password} name="password" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <br />
                        <input type="password" value={userInfo.confirmPassword} name="confirmPassword" onChange={changeHandler} />
                    </div>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
                </div>
            </form >
        </div >
    )
}

export default Register