import * as mysql from 'mysql2/promise'
import { Config } from './env.js'

class DatabaseInstance {

    private static instance:DatabaseInstance = new DatabaseInstance()
    private pool!:mysql.Pool

    constructor() {
        if(DatabaseInstance.instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        DatabaseInstance.instance = this;
    }

    public static getInstance():DatabaseInstance {
        return DatabaseInstance.instance;
    }

    public connection({HOST, USER,PASSWORD, DATABASE}: Config) {
        this.pool = mysql.createPool({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        Object.freeze(DatabaseInstance.instance)
    }

    public query (sql:string) {
        return this.pool.execute<mysql.RowDataPacket[]>(sql)
    }
}

export default DatabaseInstance.getInstance()