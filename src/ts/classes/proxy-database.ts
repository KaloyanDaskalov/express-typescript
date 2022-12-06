import db from "../../config/database.js";
import { SearchQuery } from "../interfaces/search-query.js";

export class ProxyDatabase implements SearchQuery {
  basicSearch: string = "SELECT * FROM assets";
  typeSearch: string = "WHERE status = ";

  query(searchStatus: string) {
    if (searchStatus === "done") {
      return db.query(`${this.basicSearch} ${this.typeSearch}${1}`);
    } else if (searchStatus === "todo") {
      return db.query(`${this.basicSearch} ${this.typeSearch}${0}`);
    }
    return db.query(this.basicSearch);
  }
}
