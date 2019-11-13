import React, { useState, useEffect } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import doFetch from '../../utils/doFetch'
import { Button } from 'reactstrap'
import classes from './QuestionerPage.module.css'
import QuestionerSubmit from './QuestionerSubmit'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import QuestionerContainer from './QuestionerContainer'
import ProtectedElement from '../ProtectedElement'

const QuestionerPage = ({ match, history }) => {
  const [questioner, setQuestioner] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { token, scope } = useAuth0()

  useEffect(() => {
    (async () => {
      try {
        const data = await doFetch(token, 'GET', `questioners/${match.params.id}`)

        if (!data.success) {
          history.push('/questioners')
        }

        setQuestioner(data.questioner)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    })()
  }, [])

  if (isLoading) {
    return 'Loading'
  }

  if (isError) {
    return 'Error'
  }

  const { _id, title, description, questions } = questioner

  return (
    <>
      <div className={classes.buttons}>
        <Link to='/questioners'>
          <Button
            type='submit'
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </Link>
        <div className={classes.right}>
          <ProtectedElement
            scope={scope}
            requiredScope={['update:questioners']}
          >
            <Link to={`/questioners/${match.params.id}/edit`}>
              <Button
                type='submit'
                className='btn-primary'
              >
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
              </Button>
            </Link>
          </ProtectedElement>
        </div>
      </div>
      <QuestionerContainer
        title={title}
        description={description}
      >
        <QuestionerSubmit
          questionerId={_id}
          questions={questions}
        />
      </QuestionerContainer>
    </>
  )
}

export default withRouter(QuestionerPage)
