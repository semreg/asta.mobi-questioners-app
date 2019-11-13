import React from 'react'
import {
  Card, Container, CardTitle, CardSubtitle, CardBody
} from 'reactstrap'
import classes from './QuestionerPage.module.css'

const QuestionerContainer = ({ title, description, children }) => (
  <Card className='mt-4 mb-5'>
    <CardBody>
      <CardTitle className={classes.title}>
        {title}
      </CardTitle>
      <CardSubtitle className={classes.desc}>
        {description}
      </CardSubtitle>
      <hr/>
      <Container>
        {children}
      </Container>
    </CardBody>
  </Card>
)

export default QuestionerContainer
