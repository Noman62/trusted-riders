import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Bike from '../../Image/Frame.png';
import Car from '../../Image/Frame-2.png';
import Bus from '../../Image/Frame-1.png';
import Train from '../../Image/Frame-3.png';
import map from '../../Image/Map.png';

const BookingVehicles = () => {
  const { name } = useParams();
  const [newUser, setNewUser] = useState(false);


  return (
    <Container>
      <Row>
        <Col xs={4} md={4}>

          <form action="" style={{ border: '1px solid red', marginTop: '10px' }}>
            <div style={{ margin: '10px' }}>
              <label htmlFor="Pick From">Pick From</label>
              <br />
              <input type="text" name="Pick From" id="Pick From" placeholder='....'  />
              <br />
              <label htmlFor="Pick To">Pick To</label>
              <br />
              <input type="text" name="Pick To" placeholder='....' id="Pick To"  />
              <br />
           <button onClick={()=>setNewUser(!newUser)}>search</button>
            </div>
          </form>
          <div>
            {
              name === 'Bike' ? <img style={{ width: '50px' }} src={Bike} alt="" />
                : name == 'Car' ? <img style={{ width: '50px' }} src={Car} alt="" />
                  : name == 'Bus' ? <img style={{ width: '50px' }} src={Bus} alt="" /> : <img style={{ width: '50px' }} src={Train} alt="" />
            }
         
          </div>

        </Col>
        <Col xs={8} md={8}>
          <img src={map} alt=""/>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingVehicles;