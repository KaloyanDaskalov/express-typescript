import db from "../../config/database.js";
import { SearchQuery } from "../interfaces/search-query.js";

export class ProxyDatabase implements SearchQuery {
  private basicSearch: string = "SELECT * FROM assets";
  private conditionSearch: string = "WHERE status = ";

  query(searchTerm: string) {
    if (searchTerm === "done") {
      return db.query(`${this.basicSearch} ${this.conditionSearch}${1}`);
    } else if (searchTerm === "todo") {
      return db.query(`${this.basicSearch} ${this.conditionSearch}${0}`);
    }
    return db.query(this.basicSearch);
  }
}
