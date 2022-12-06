import { RowDataPacket } from "mysql2";

export interface ToDo extends RowDataPacket {
  id: number;
  message: string;
  status: boolean;
}
