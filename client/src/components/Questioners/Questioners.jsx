import React, { useState, useEffect, Fragment } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import doFetch from '../../utils/doFetch'
import QuestionerCardDeck from './QuestionerCardDeck'
import classes from './QuestionerPage.module.css'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ProtectedElement from '../ProtectedElement'

const Questioners = () => {
  const { getTokenSilently, scope } = useAuth0()
  const [IsLoading, setIsLoading] = useState(true)
  const [questioners, setQuestioners] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently()

        const data = await doFetch(token, 'GET', 'questioners')

        setQuestioners(data.questioners)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    })()
  }, [])

  if (IsLoading) {
    return 'Loading...'
  }

  if (isError) {
    return 'Error'
  }

  return (
    <Fragment>
      <ProtectedElement
        scope={scope}
        requiredScope={['update:questioners']}
      >
        <div className={classes.buttons}>
          <Link to='questioners/create'>
            <Button
              type='submit'
              className='btn-primary'
            >
              <FontAwesomeIcon
                icon={faPlus}
                className='mr-3'
              />
                New
            </Button>
          </Link>
        </div>
      </ProtectedElement>
      <QuestionerCardDeck questioners={questioners} />
    </Fragment>
  )
}

export default Questioners
