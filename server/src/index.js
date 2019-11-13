import app from './app'
import { mongoURI } from './config'
import { connect } from 'mongoose'

connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001, () => console.log('App is ready on 3001'))
  })
  .catch(err => {
    console.log(err)
  })
