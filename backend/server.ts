import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { json } from "express";
import { Request, Response } from "express";
import { db } from "./db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "./src/config/config";

const app = express();
const port = 5000;
app.use(cors());
app.use(json());

app.get("/menus", async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  res.send(menusResult.rows);
});

app.get("/", (req, res) => res.send("Hello World"));

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, hashedPassword];
  try {
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    console.log("this is eerror", err);

    res.sendStatus(500);
  }
});
app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userResult = await db.query("select * from users where email = $1", [
    email,
  ]);
  if (!userResult.rows.length) return res.sendStatus(401);
  const user = userResult.rows[0];
  const hashedPassword = user.password;
  delete user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(user, config.jwtScret);
    return res.send({ accessToken });
  }

  return res.sendStatus(401);
});

app.listen(port, () => {
  console.log("Server has started on port:", port);
});
