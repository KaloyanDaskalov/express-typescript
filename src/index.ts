import config from './config/index.js'
import express, {Request, Response} from 'express'

const app = express()

app.get('', (rec: Request, res: Response) => {
    res.status(200).send('Node, Express, Typescript')
})

app.listen(config.PORT, () => {
    console.log(`Server start at port http://localhost:${config.PORT}`)
})