import config from './config/index.js'
import express, {Request, Response, Application} from 'express'
import database from './config/database.js'

const app:Application = express()

app.get('', async (rec: Request, res: Response) => {
    res.status(200).send('Node, Express, Typescript')
    await database(config)
})

app.listen(config.PORT, () => {
    console.log(`Server start at port http://localhost:${config.PORT}`)
})