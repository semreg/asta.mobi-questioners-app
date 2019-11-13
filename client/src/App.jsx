import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { useAuth0 } from './react-auth0-spa'
import history from './utils/history'

// fontawesome
import initFontAwesome from './utils/initFontAwesome'

import Questioners from './components/Questioners/Questioners'
import QuestionerForm from './components/Questioners/QuestionerForm'
import QuestionerPage from './components/Questioners/QuestionerPage'
import AnswerLists from './components/AnswerLists/AnswerLists'
import AnswerListPage from './components/AnswerLists/AnswerListPage'

initFontAwesome()

const App = () => {
  const { loading } = useAuth0()

  if (loading) {
    return <Loading />
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <Container className='flex-grow-1 mt-5'>
          <Switch>
            <Route
              path='/'
              exact
              render={() => <Redirect to='/questioners'/>}
            />
            <PrivateRoute
              exact
              path='/questioners'
              component={Questioners}
            />
            <PrivateRoute
              exact
              path='/questioners/create'
              render={() => <QuestionerForm mode='CREATE'/>}
              requiredScope={['create:questioners']}
            />
            <PrivateRoute
              exact
              path='/questioners/:id'
              component={QuestionerPage}
            />
            <PrivateRoute
              exact
              path='/questioners/:id/edit'
              render={() => <QuestionerForm mode='EDIT'/>}
              requiredScope={['update:questioners']}
            />
            <PrivateRoute
              exact
              path='/answerlists'
              component={AnswerLists}
            />
            <PrivateRoute
              exact
              path='/answerlists/:id'
              component={AnswerListPage}
            />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
