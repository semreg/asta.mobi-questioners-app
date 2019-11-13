import React, { Fragment } from 'react'
import {
  Input,
  Label,
  FormGroup
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

const AnswerList = ({ answers, questioner }) => {
  const contentToRender = answers.map(({ _id: id, content }, index) => ({
    id,
    questionContent: questioner.questions[index].content,
    answerContent: content
  }))

  return (
    <FormGroup>
      {contentToRender.map(({ id, questionContent, answerContent }) => (
        <Fragment key={id}>
          <Label
            className='mt-3 mb-3'
            htmlFor={id}
          >
            {questionContent}
          </Label>
          <Input
            type='textarea'
            name='text'
            id={id}
            disabled
            value={answerContent}
          />
        </Fragment>
      ))}
    </FormGroup>
  )
}

export default withRouter(AnswerList)
