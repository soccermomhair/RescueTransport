import React from 'react'
import Register from './Register'
import Login from './Login'

const RegLog = () => {
    return (
        <div className='mx-10 flex flex-row justify-evenly bg-yellow-300 p-10'>
            <Register />
            <Login />

        </div>
    )
}

export default RegLog

