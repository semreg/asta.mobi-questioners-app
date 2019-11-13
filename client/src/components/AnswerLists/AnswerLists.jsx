import React, { useState, useEffect, Fragment } from 'react'
import { useAuth0 } from '../../react-auth0-spa'
import doFetch from '../../utils/doFetch'
import AnswerListCardDeck from './AnswerListCardDeck'

const AnswerLists = () => {
  const { getTokenSilently } = useAuth0()
  const [IsLoading, setIsLoading] = useState(true)
  const [answerLists, setQuestioners] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently()

        const data = await doFetch(token, 'GET', 'answerlists')

        setQuestioners(data.answerLists)
        setIsLoading(false)
      } catch (err) {
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
      <AnswerListCardDeck answerLists={answerLists} />
    </Fragment>
  )
}

export default AnswerLists
