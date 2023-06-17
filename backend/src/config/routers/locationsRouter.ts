import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../../../db/db";
const locationsRouter = express.Router();

locationsRouter.put("/", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  res.send(menusResult.rows);
});

locationsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;

  const isValid = name && address && companyId;

  if (!isValid) return res.send(400);
  await db.query(
    "insert into locations (name, address, companies_id) values($1, $2, $3)",
    [name, address, companyId]
  );
  res.send(200);
});

locationsRouter.put("/", checkAuth, async (req: Request, res: Response) => {
  const { id, name, address } = req.body;
  const isValid = name & address;
  if (isValid) return res.send(400);
  await db.query("UPDATE locations SET name =$1,address = $2,where id = $3", [
    name,
    address,
    id,
  ]);
  res.send({ message: "Updated" });
});

export default locationsRouter;
