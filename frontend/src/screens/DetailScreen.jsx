import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
//import buildings from '../buildings'; 
import StatusBadge from '../components/StatusBadge';
import axios from 'axios';

function DetailScreen() {
  const { id } = useParams()

  const [building, setBuilding] = useState({})

  useEffect(() => {
    async function fetchBuilding() {
      const { data } = await axios.get(`/api/buildings/${id}/`)
      setBuilding(data)
    }
    fetchBuilding()
  }, [id])

  if (!building.name) {
    return <h2>Loading Building Details...</h2>
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={building.image} alt={building.name} fluid rounded />
        </Col>
        
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{building.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <StatusBadge slots={building.slots} totalSlots={20} />
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {building.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {building.slots> 0 ? 'Available' : 'Full'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid">
                  <Button 
                    className='btn-block' 
                    type='button' 
                    disabled={building.slots === 0}
                    variant="primary"
                  >
                    Reserve Slot
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DetailScreen;