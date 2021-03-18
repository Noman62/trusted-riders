import React from 'react';

const VehiclesInfo = (props) => {
    const {name,image}=props.vehicle;
    return (
        <div className={{border: '1px solid #17252A', margin: '20px', padding: '20px',backgroundColor:'white'}}>
            <img style={{width:'200px',height:'150px'}} src={image} alt=""/>
            <h3>{name}</h3>
        </div>
    );
};

export default VehiclesInfo;