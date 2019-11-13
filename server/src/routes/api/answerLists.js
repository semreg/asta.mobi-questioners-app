import { Router } from 'express'
import { checkJwt } from '../../utils'
import jwtAuthz from 'express-jwt-authz'
import AnswerList from '../../models/AnswerList'
import Questioner from '../../models/Questioner'

const router = new Router()

// @route GET /api/answerList
// @desc Get all answerLists
router.get('/', checkJwt, jwtAuthz(['read:answerLists']), async (req, res) => {
  try {
    const answerLists = await AnswerList.find()
    res.json({
      success: true,
      answerLists
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route GET /api/answerList/:id
// @desc Get specific answerList
router.get('/:id', checkJwt, jwtAuthz(['read:answerLists']), async (req, res) => {
  try {
    const answerList = await AnswerList.findById(req.params.id)
    res.json({
      success: true,
      answerList
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route POST /api/answerList/new
// @desc Create new answerList
router.post('/new', checkJwt, jwtAuthz(['create:answerLists']), async (req, res) => {
  console.log(req.body)
  if (!req.body.questionerId) {
    return res.status(400).send({
      success: false,
      message: 'Questioner ID is required!'
    })
  }

  const questioner = await Questioner.findById(req.body.questionerId)

  if (!questioner) {
    return res.status(400).send({
      success: false,
      message: 'No such questioner found!'
    })
  }

  if (questioner.questions.length !== req.body.answers.length) {
    return res.status(400).send({
      success: false,
      message: 'The amount of answers is not correct!'
    })
  }

  const newAnswerList = new AnswerList({
    ...req.body,
    questioner
  })

  try {
    const answerList = await newAnswerList.save()
    res.json({
      success: true,
      answerList
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route DELETE /api/answerList/:id
// @desc Delete answerList
router.delete('/delete/:id', checkJwt, jwtAuthz(['delete:answerLists']), async (req, res) => {
  try {
    await AnswerList.findOneAndRemove(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

export default router
