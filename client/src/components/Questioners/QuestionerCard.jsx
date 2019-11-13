import React from 'react'
import {
  Card, Button, CardTitle, CardText, CardBody
} from 'reactstrap'
import { Link } from 'react-router-dom'

const QuestionerCard = ({ id, title, description }) => (
  <Card>
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardText>{description}</CardText>
      <Link to={`/questioners/${id}`}>
        <Button>Respond</Button>
      </Link>
    </CardBody>
  </Card>
)

export default QuestionerCard
