import express, { Application } from 'express'
import path from 'path'
import router from './routes.js'
import errorHandlerMiddleware from '../middlewares/error-handler-middleware.js'

export default (app:Application ) : void => {
    app.use('/static', express.static(path.join(process.cwd(), 'public')))
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(router)
    app.use(errorHandlerMiddleware)
}