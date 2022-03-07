import config from './config/index.js'
import express, {Request, Response, Application} from 'express'
import database from './config/database.js'
import { RowDataPacket } from 'mysql2'

const app:Application = express()

app.use(express.json())

app.get('', async (rec: Request, res: Response) => {
    const db = await database(config)
    db.connect()
        .then(() => db.query<RowDataPacket[]>('SELECT * FROM EMPLOYEE'))
        .then(([rows, fields]) => {
            res.status(200).json(rows)
        });
    // db.execute('SELECT * FROM EMPLOYEE').then(data => {
    //     console.log(data);
    // })

})

app.listen(config.PORT, () => {
    console.log(`Server start at port http://localhost:${config.PORT}`)
})