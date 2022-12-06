import * as mysql from "mysql2/promise";
import { Config } from "../ts/interfaces/env.js";
import { SearchQuery } from "../ts/interfaces/search-query.js";
import { ToDo } from "../ts/interfaces/todo.js";

class DatabaseInstance implements SearchQuery {
  private static instance: DatabaseInstance = new DatabaseInstance();
  private pool!: mysql.Pool;

  private constructor() {
    if (DatabaseInstance.instance) {
      throw new Error(
        "Error: Instantiation failed: Use DatabaseInstance.getInstance() instead of new."
      );
    }
    DatabaseInstance.instance = this;
  }

  public static getInstance(): DatabaseInstance {
    return DatabaseInstance.instance;
  }

  public connection({ HOST, USER, PASSWORD, DATABASE }: Config) {
    this.pool = mysql.createPool({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    Object.freeze(DatabaseInstance.instance);
  }

  public query(sql: string) {
    return this.pool.execute<ToDo[]>(sql);
  }
  public getAll() {
    return this.pool.query<ToDo[]>("SELECT * FROM assets");
  }

  public setOne(message: string, status: number) {
    return this.pool.query(
      "INSERT INTO assets (message, status) VALUES (?, ?)",
      [message, status]
    );
  }

  public deleteOne(id: number) {
    return this.pool.query("DELETE FROM assets WHERE id = ?;", [id]);
  }

  public editOne(message: string, id: number) {
    return this.pool.query("UPDATE assets SET message = ? WHERE id = ?", [
      message,
      id,
    ]);
  }

  public async updateStatus(id: number, status: number) {
    return this.pool.query("UPDATE assets SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
  }
}

export default DatabaseInstance.getInstance();
