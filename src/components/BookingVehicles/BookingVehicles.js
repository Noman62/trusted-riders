import React, { useState } from 'react';
import { useParams } from 'react-router';

const BookingVehicles = () => {
    const [data,setData]=useState([]);
    const {id}=useParams();
    fetch('FakeData')
    .then(res=>res.json())
    .then(data=>setData(data))
    return (
        <div>
        <p>this is booking</p>
        </div>
    );
};

export default BookingVehicles;