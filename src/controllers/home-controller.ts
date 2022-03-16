import express, {Request, Response} from 'express'
import db from '../config/database.js'
import asyncMiddleware from '../middlewares/async-middleware.js'

const router = express.Router();
const query = `
SELECT 
    s.first_name as fName, 
    s.middle_name as mName,
    s.last_name as lName,
    s.user_position as position,
    d.event_day as day,
    d.duty_one as dOne,
    d.duty_two as dTwo
FROM users s
JOIN duty_events d 
ON s.user_id = d.user_id
`

router.get('/', asyncMiddleware(async (req :Request, res:Response) => {
    db.query(query)
        .then(([rows, fields]) => {
            res.status(200).json(rows)
        })
}))

export default router