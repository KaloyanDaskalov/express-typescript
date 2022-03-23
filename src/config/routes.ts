import express from 'express'
import asyncMiddleware from '../middlewares/async-middleware.js'

import homeController from '../controllers/home-controller.js'

const router = express.Router()

router.use('/', asyncMiddleware(homeController))

export default router
