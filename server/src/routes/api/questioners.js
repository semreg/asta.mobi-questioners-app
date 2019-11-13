import { Router } from 'express'
import { checkJwt } from '../../utils'
import jwtAuthz from 'express-jwt-authz'
import Questioner from '../../models/Questioner'

const router = new Router()

// @route GET /api/questioner
// @desc Get all questioners
router.get('/', checkJwt, jwtAuthz(['read:questioners']), async (req, res) => {
  console.log(req.user)
  try {
    const questioners = await Questioner.find()
    res.json({
      sucess: true,
      questioners
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route GET /api/questioner/:id
// @desc Get specific questioner
router.get('/:id', checkJwt, jwtAuthz(['read:questioners']), async (req, res) => {
  try {
    const questioner = await Questioner.findById(req.params.id)

    if (!questioner) {
      res.status(400).send({
        success: false,
        message: 'No such questioner found'
      })
    }

    res.json({
      success: true,
      questioner
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route POST /api/questioner/new
// @desc Create new questioner
router.post('/new', checkJwt, jwtAuthz(['create:questioners']), async (req, res) => {
  const newQuestioner = new Questioner(req.body)

  try {
    const questioner = await newQuestioner.save()
    res.json({
      success: true,
      questioner
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route PUT /api/questioner/:id
// @desc Update questioner
router.put('/update/:id', checkJwt, jwtAuthz(['update:questioners']), async (req, res) => {
  try {
    const updatedQuestioner = await Questioner.findByIdAndUpdate(req.params.id, req.body)
    res.json({
      success: true,
      updatedQuestioner
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

// @route DELETE /api/questioner/:id
// @desc Delete questioner
router.delete('/delete/:id', checkJwt, jwtAuthz(['delete:questioners']), async (req, res) => {
  try {
    await Questioner.findOneAndRemove(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    })
  }
})

export default router
