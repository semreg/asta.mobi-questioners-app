import React, { useState, useEffect } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import doFetch from '../../utils/doFetch'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button
} from 'reactstrap'
import classes from './AnswerListPage.module.css'
import AnswerList from './AnswerList'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ProtectedElement from '../ProtectedElement'

const AnswerListPage = ({ match, history }) => {
  const [answerList, setAnswerList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { getTokenSilently, scope, token } = useAuth0()

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently()

        const data = await doFetch(token, 'GET', `answerlists/${match.params.id}`)

        if (!data.success) {
          history.push('/questioners')
        }

        setAnswerList(data.answerList)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    })()
  }, [])

  const deleteAnswerList = async () => {
    try {
      if (window.confirm('Are you sure?')) {
        await doFetch(token, 'DELETE', `answerlists/delete/${match.params.id}`)
        history.push('/answerlists')
      }
    } finally {

    }
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return 'Error'
  }

  const { questioner, answers, responderEmail } = answerList

  return (
    <>
      <div className={classes.buttons}>
        <Link to='/answerlists'>
          <Button
            type='submit'
          >
            <FontAwesomeIcon icon={faArrowLeft}/> Back
          </Button>
        </Link>
        <ProtectedElement
          scope={scope}
          requiredScope={['delete:answerLists']}
        >
          <div className={classes.right}>
            <Button
              type='submit'
              className='btn-danger'
              onClick={deleteAnswerList}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Remove
            </Button>

          </div>
        </ProtectedElement>
      </div>
      <Card className='mb-5'>
        <CardBody>
          <CardTitle className={classes.title}>
            {questioner.title}
          </CardTitle>
          <CardSubtitle className={classes.desc}>
            {questioner.description}
          </CardSubtitle>
          <br/>
          <CardSubtitle>
            <b>Responder&apos;s email: </b>{responderEmail}
          </CardSubtitle>
          <hr/>
          <Container>
            <AnswerList
              questioner={questioner}
              answers={answers}
            />
          </Container>
        </CardBody>
      </Card>
    </>
  )
}

export default withRouter(AnswerListPage)
