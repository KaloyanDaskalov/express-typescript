import { NextFunction,Request, Response} from 'express'


export default function errorHandler (err:ReferenceError  , req:Request , res: Response, next: NextFunction) {
    if(err) {
        console.log(err);
    }
    res.status(500).json(err.message)
    // res.render('error', { error: err })
}
