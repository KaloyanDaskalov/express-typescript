import express, {Request, Response} from 'express'
import db from '../config/database.js'

import { DutyEventList } from '../ts/interfaces/duty-event.js'

const router = express.Router();
const query = `
SELECT
    s.user_id AS id,
    CONCAT(s.first_name,' ' ,s.middle_name,' ' ,s.last_name) AS name,
    s.user_position AS position,
    DAY(d.event_day) AS day,
    d.duty_one AS dOne,
	d.duty_two AS dTwo
FROM users s
LEFT JOIN duty_events d
ON s.user_id = d.user_id;
`

router.get('/', async (req :Request, res:Response) => {
    db.query(query)
        .then(([rows, fields]) => {
            const data:DutyEventList = {}
            for (const i of rows) {
                if(!data.hasOwnProperty(i.id)) {
                    data[i.id] = {
                        name: i.name,
                        position: i.position,
                        duties: i.day ? 
                            [{
                            date: i.day,
                            dutyOne: i.dOne,
                            dutyTwo: i.dTwo
                            }]
                            : []
                    }
                } else {
                    data[i.id].duties.push({
                        date: i.day,
                        dutyOne: i.dOne,
                        dutyTwo: i.dTwo
                })
                }
            }
            res.status(200).json(data)
        })
})

export default router