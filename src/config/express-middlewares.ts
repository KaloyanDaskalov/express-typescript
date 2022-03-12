import express, { Application } from 'express'
import path from 'path';

export default (app:Application ) : void => {
    app.use('/static', express.static(path.join(process.cwd(), 'public')))
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
}