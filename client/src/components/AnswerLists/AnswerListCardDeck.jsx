import React from 'react'
import { CardDeck } from 'reactstrap'
import AnswerListCard from './AnswerListCard'

const AnswerListCardGroup = ({ answerLists }) => (
  <CardDeck>
    {answerLists.map(({ _id, responderEmail, questioner }) => (
      <AnswerListCard
        key={_id}
        id={_id}
        questionerTitle={questioner.title}
        responderEmail={responderEmail}
      />
    ))}
  </CardDeck>
)

export default AnswerListCardGroup
