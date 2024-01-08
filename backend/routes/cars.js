import express from 'express'
import * as controller from'../controllers/controller.js'
// import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

// router.use(requireAuth)

router.get('/', controller.getCars)

router.get('/:id', controller.getCar)

router.patch('/:id', controller.updateCar)// galima pakeist i put

router.post('/', controller.createCar)

router.delete('/:id', controller.removeCar)

export default router