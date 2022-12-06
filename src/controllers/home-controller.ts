import express, { Request, Response } from "express";
import db from "../config/database.js";
import FactoryToDoSingleton from "../ts/classes/factory-todos.js";
import page from "../ts/classes/page.js";
import { ProxyDatabase } from "../ts/classes/proxy-database.js";
import { ToDo } from "../ts/interfaces/todo.js";

const router = express.Router();
const proxy = new ProxyDatabase();

router.get("/", async (req: Request, res: Response) => {
  const { type = "simple", status = "all" } = req.query;
  const ul = FactoryToDoSingleton.getRenderer("ul");
  const li = FactoryToDoSingleton.getRenderer("li");
  const todo = FactoryToDoSingleton.getRenderer("todo");
  const cToDo = FactoryToDoSingleton.getRenderer("cTodo");

  const [rows, fields] = await proxy.query(status as string);

  const itemsHTML = rows
    .map((t) => {
      if (type === "complex") {
        const complexToDo = cToDo.renderEl(t as ToDo);
        return li.renderEl(complexToDo);
      }
      const simpleToDo = todo.renderEl(t as ToDo);
      return li.renderEl(simpleToDo);
    })
    .join("");
  const toDoListHTML = ul.renderEl(itemsHTML);

  res.send(page.render(toDoListHTML));
});

router.post("/", async (req: Request, res: Response) => {
  const message = req.body.message?.trim();
  const status = req.body.status === "on" ? 1 : 0;
  if (message.length > 3) {
    await db.setOne(message, status);
  }
  res.redirect("/");
});

router.get("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    await db.deleteOne(Number(id));
  }
  res.redirect("/");
});

router.post("/edit/:id", async (req: Request, res: Response) => {
  const message = req.body.message?.trim();
  const id = req.params.id;
  if (message.length > 3 && id) {
    await db.editOne(message, Number(id));
  }
  res.redirect("/");
});

router.get("/status/:current/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const current = Number(req.params.current);

  if (id) {
    const status = current === 0 ? 1 : 0;
    await db.updateStatus(Number(id), status);
  }
  res.redirect("/");
});

export default router;
