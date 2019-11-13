import React, { useState, useEffect } from 'react'
import {
  Card, Button, CardBody, Container, Input
} from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { useAuth0 } from '../..//react-auth0-spa'
import doFetch from '../..//utils/doFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './QuestionerPage.module.css'
import { faArrowLeft, faTrashAlt, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import uuid from 'uuid/v1'

const QuestionerForm = ({ mode, match, history }) => {
  const { token } = useAuth0()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch questioner if in editing mode
    if (mode === 'EDIT') {
      (async () => {
        const data = await doFetch(token, 'GET', `questioners/${match.params.id}`)

        if (!data.success) {
          history.push('/questioners')
        } else {
          const {
            title: questionerTitle,
            description: questionerDescription,
            questions: questionQuestions
          } = data.questioner

          setIsLoading(false)
          setTitle(questionerTitle)
          setDescription(questionerDescription)
          setQuestions(questionQuestions)
        }
      })()
    } else {
      // If in creating mode, add one empty question
      setIsLoading(false)
      setQuestions([{ _id: uuid(), content: '' }])
    }
  }, [])

  const onSubmit = async e => {
    e.preventDefault()

    const questionsToSend = questions.map(({ _id }) => ({ content: e.target[_id].value }))

    try {
      // If in editing mode: `questioners/update/<id>`
      // In creating mode: `questioners/new`
      const res = await doFetch(
        token,
        `${mode === 'EDIT' ? 'PUT' : 'POST'}`,
        `questioners/${mode === 'EDIT' ? `update/${match.params.id}` : 'new'}`,
        {
          title,
          description,
          questions: questionsToSend
        }
      )

      if (!res.success) {
        alert(`Failed to ${mode === 'UPDATE' ? 'update' : 'create'} questioner`)
        history.push('/questioners')
      }

      switch (mode) {
        case 'EDIT':
          history.push(`/questioners/${res.updatedQuestioner._id}`)
          break
        case 'CREATE':
          history.push(`/questioners/${res.questioner._id}`)
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeQuestioner = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await doFetch(
          token,
          'DELETE',
          `questioners/delete/${match.params.id}`
        )

        history.push('/questioners')
      } catch (err) {
        console.log(err)
        alert('Unable to delete')
      }
    }
  }

  const addQuestion = () => setQuestions([...questions, { _id: uuid(), content: '' }])

  const removeQuestion = id => setQuestions(questions.filter(question => question._id !== id))

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <div className={classes.buttons}>
        <Link to={`/questioners/${mode === 'EDIT' ? match.params.id : ''}`}>
          <Button type='submit'>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </Link>
        {mode === 'EDIT'
          ? (
            <div className={classes.right}>
              <Link to={`/questioners/${match.params.id}/edit`}>
                <Button
                  type='submit'
                  className='btn-danger'
                  onClick={removeQuestioner}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Remove
                </Button>
              </Link>
            </div>
          ) : null
        }
      </div>
      <Card className='mt-4 mb-3'>
        <CardBody>
          Title
          <Input
            className='mb-2'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          Description
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <hr/>
          <Container>
            <form
              className={classes.form_grid}
              onSubmit={onSubmit}
              id='questionsForm'
            >
              {questions ? questions.map(({ _id, content }) => (
                <div
                  className={classes.quesion_input}
                  key={_id}
                >
                  <input
                    id={_id}
                    type='text'
                    className='form-control'
                    defaultValue={content}
                    placeholder='Enter your question...'
                  />
                  <Button
                    className='btn-danger'
                    onClick={() => removeQuestion(_id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt}/>
                  </Button>
                </div>
              )) : null}
              <Button
                className='btn-primary'
                onClick={addQuestion}
              >
                <FontAwesomeIcon icon={faPlus}/>
              </Button>
            </form>
          </Container>
        </CardBody>
      </Card>
      <div className={classes.buttons}>
        <div>
          <Button
            type='submit'
            className='mt-1 btn-success'
            form='questionsForm'
          >
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default withRouter(QuestionerForm)
