import * as mysql from 'mysql2/promise'
import { Config } from './index.js'

// Connections
export default async ({HOST, USER,PASSWORD, DATABASE}: Config): Promise<mysql.Connection> => {
    const connection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE
    });

    return connection;
    // connection.connect()
    //     .then(() => connection.query<mysql.RowDataPacket[]>('SELECT * FROM EMPLOYEE'))
    //     .then(([rows, fields]) => {
    //         console.table(rows);
    //     });

    // connection.connect()
    //     .then(() => connection.execute<mysql.RowDataPacket[]>('SELECT 1 + 1 AS solution'))
    //     .then(([rows, fields]) => {
    //         console.log('The solution is: ', rows[0]['solution']);
    //     });
}