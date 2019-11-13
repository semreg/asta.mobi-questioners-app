import React from 'react'

import { CardDeck } from 'reactstrap'
import QuestionerCard from './QuestionerCard'

const QuestionerCardGroup = ({ questioners }) => (
  <CardDeck>
    {questioners.map(({ _id, title, description }) => (
      <QuestionerCard
        key={_id}
        id={_id}
        title={title}
        description={description}
      />
    ))}
  </CardDeck>
)

export default QuestionerCardGroup
