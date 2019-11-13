import React, { useState, Fragment } from 'react'
import {
  Input,
  Label,
  FormGroup,
  Button
} from 'reactstrap'
import { useAuth0 } from '../../react-auth0-spa'
import doFetch from '../../utils/doFetch'
import { withRouter } from 'react-router-dom'

const QuestionerSubmit = ({ questions = [], questionerId, history }) => {
  const { user, getTokenSilently } = useAuth0()
  const [answers, setAnswers] = useState(questions.map(({ _id }) => ({ _id, content: '' })))

  const onTextAreaChange = e => {
    setAnswers(answers.map(answer => answer._id === e.target.id
      ? { ...answer, content: e.target.value.trim() }
      : answer
    ))
  }

  const submitAnswers = async () => {
    const token = await getTokenSilently()

    const data = await doFetch(token, 'POST', 'answerLists/new', {
      questionerId,
      answers,
      responderEmail: user.email
    })

    if (data.success) {
      history.push(`/answerlists/${data.answerList._id}`)
      window.alert('Thank you for responding!')
    } else {
      window.alert('Failed sending answers.')
    }
  }

  const onBtnClick = () => {
    const areFilled = answers.every(answer => answer.content)

    if (areFilled) {
      try {
        submitAnswers()
      } catch (err) {
        console.log(err)
        window.alert('Failed sending answers.')
      }
    } else {
      window.alert('Please, answer all the questions!')
    }
  }

  return (
    <FormGroup>
      {questions.map(({ _id, content }) => (
        <Fragment key={_id}>
          <Label
            className='mt-3 mb-3'
            htmlFor={_id}
          >
            {content}
          </Label>
          <Input
            type='textarea'
            name='text'
            id={_id}
            onChange={onTextAreaChange}
            required
          />
        </Fragment>
      ))}
      <Button
        type='submit'
        className='btn-lg btn-dark mt-3'
        onClick={onBtnClick}
      >
        Submit answer
      </Button>
    </FormGroup>
  )
}

export default withRouter(QuestionerSubmit)
