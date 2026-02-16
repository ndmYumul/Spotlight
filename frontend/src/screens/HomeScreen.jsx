import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
//import buildings from '../buildings'
import Building from '../components/Building'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listBuildings } from '../actions/buildingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
  const dispatch = useDispatch();
  const buildingList = useSelector((state) => state.buildingList);
  const { loading, error, buildings } = buildingList;

  useEffect(() => {
    dispatch(listBuildings());
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to Spotlight</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        < Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {buildings && buildings.map((building) => (
              <Col key={building._id} sm={12} md={6} lg={4} xl={3} className="mb-3 d-flex align-items-stretch">
                <Building building={building} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default HomeScreen
