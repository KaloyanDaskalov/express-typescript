import config from './config/env.js'
import express, {Request, Response, Application} from 'express'
import db from './config/database.js'
import middlewares from './config/express-middlewares.js'

const app:Application = express()

db.connection(config)

middlewares(app)

app.get('', async (rec: Request, res: Response) => {
    db.query('SELECT 1 + 1')
        .then(([rows, fields]) => {
            res.status(200).json(rows)
        })
        .catch( ex => {
            console.log(ex)   
        })
})

app.listen(config.PORT, () => {
    console.log(`Server start at port http://localhost:${config.PORT}`)
})