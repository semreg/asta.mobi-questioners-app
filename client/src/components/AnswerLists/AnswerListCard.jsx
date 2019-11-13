import React from 'react'
import {
  Card, Button, CardTitle, CardText, CardBody
} from 'reactstrap'
import { Link } from 'react-router-dom'

const AnswerListCard = ({ id, questionerTitle, responderEmail }) => (
  <Card>
    <CardBody>
      <CardTitle><b>Questioner: </b>{questionerTitle}</CardTitle>
      <CardText><b>Responder&apos;s email: </b>{responderEmail}</CardText>
      <Link to={`/answerlists/${id}`}>
        <Button>View</Button>
      </Link>
    </CardBody>
  </Card>
)

export default AnswerListCard
