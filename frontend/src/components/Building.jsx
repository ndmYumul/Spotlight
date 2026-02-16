import React from 'react'
import { Card } from 'react-bootstrap'
import StatusBadge from './StatusBadge'
import { Link } from 'react-router-dom'
import { Ratio } from 'react-bootstrap'

function Building({ building }) {
  return (
    <Card className="my-3 p-3 rounded shadow-sm">
        <Link to={`/building/${building._id}`}>
        <Ratio aspectRatio="16x9">
        <Card.Img src={`${process.env.REACT_APP_API_URL}${building.image}`} variant="top" />
        </Ratio>
        </Link>

        <Card.Body>
            <Link to={`/building/${building._id}`} className='text-decoration-none text-dark'>
            <Card.Title as="div">
                <strong>{building.name}</strong>
            </Card.Title>
            </Link>

            <Card.Text as="h4">
                <StatusBadge slots={building.slots} totalSlots={building.totalSlots} />
            </Card.Text>

        </Card.Body>

    </Card>
  )
}

export default Building
