import React, { useEffect, useState } from 'react';
import vehiclesData from '../../FakeData/FakeData.json';
import VehiclesInfo from '../VehiclesInfo/VehiclesInfo';
import { Container, Grid, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        background: '#f8f8f8',
        minHeight: 'calc(100vh - 65px)'
    },
    containerRoot: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(11)
    }
}));

const Home = () => {
    const [vehicles,setVehicles]=useState([]);
    const classes=useStyle();
    useEffect(()=>{
        setVehicles(vehiclesData);
        // console.log(vehiclesData);
    },[])
    return (
        <main className={classes.root}>
        <Container className={classes.containerRoot} maxWidth="md" >
            <Grid container spacing={3} justify="center">
                {
                    vehicles.map(vehicle=> <VehiclesInfo vehicle={vehicle}></VehiclesInfo>)
                }
            </Grid>
        </Container>
    </main>
       
    );
};

export default Home;