import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AddPet from './components/AddPet';
import AddRescue from './components/AddRescue';
import AddTransport from './components/AddTransport';
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import EditPet from './components/EditPet';
import EditPetTwo from './components/EditPetTwo';
import NotFound from './components/NotFound';
import RegLog from './components/RegLog';
// import "tailwindcss/tailwind.css";

function App() {
  const [transport, setTransport] = useState([])
  const [alltransports, setAllTransports] = useState([])
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Rescue Transport</h1>
        <Routes>
          <Route path="/" element={<RegLog />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/pets" element={<Dashboard alltransports={alltransports} setAllTransports={setAllTransports} />} />
          {/* Not sure how to pass AddPet to UpdatePet????????????????? */}
          <Route path="/pets/new" element={<AddPet />} />
          <Route path="/pets/:id/edit" element={<EditPetTwo transport={transport} alltransports={alltransports} setTransport={setTransport} />} />
          {/* <Route path="/pets/:id/edit" element={<EditPet onSubmitProp={AddPet} alltransports={alltransports} */}
          {/* setAllTransports={setAllTransports} transport={transport} setTransport={setTransport} />} /> */}
          <Route path="/pets/:id/rescue" element={<AddRescue transport={transport} setTransport={setTransport} />} />
          <Route path="/pets/:id/transport" element={<AddTransport transport={transport} setTransport={setTransport} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
