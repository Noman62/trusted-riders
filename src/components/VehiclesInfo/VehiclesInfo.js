import React from 'react';
import { useHistory } from 'react-router';

const VehiclesInfo = (props) => {
    const {name,image,id}=props.vehicle;
    let history=useHistory();
    return (
        <div className={{border: '1px solid #17252A', margin: '20px', padding: '20px',backgroundColor:'white'}} onClick={()=>history.push(`/vehiclesInfo/${id}`)}>
            <img style={{width:'200px',height:'150px'}} src={image} alt=""/>
            <h3>{name}</h3>
        
        </div>
    );
};

export default VehiclesInfo;