import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddPet from './AddPet';
const EditPet = (props) => {
    const { id } = useParams();
    // const { transport } = useParams();
    const { transport, setTransport } = props;
    // const { alltransports, setAllTransports } = props;
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        console.log(transport, "transport")
        console.log(id, "id")
        axios.get('http://localhost:8000/api/transports/' + id)
            .then(res => {
                console.log(res.data)
                setTransport(res.data);
                setLoaded(true);
            })
    }, [])
    const updatePet = transport => {
        console.log("transport", transport)
        axios.put('http://localhost:8000/api/transport/' + id,
            { transport })

            .then(res => console.log(res));
        // setTransport;
    }
    return (
        <div>
            <h1>Update a Pet</h1>
            {
                loaded && <AddPet onSubmitProps={updatePet}
                    editedPet={transport}
                />}
        </div>
    )
}
export default EditPet;

