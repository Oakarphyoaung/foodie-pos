import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { json } from "express";
import { Request, Response } from "express";
import { db } from "./db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "./src/config/config";
import { checkAuth } from "./src/config/utils/auth";
import authRouter from "./src/config/routers/authRouter";
import menusRouter from "./src/config/routers/menusRouter";
import appRouter from "./src/config/routers/appRouter";

const app = express();
const port = 5000;
app.use(cors());
app.use(json());

app.use("/", appRouter);
app.use("/auth", authRouter);
app.use("/menus", menusRouter);

// app.get("/menus", checkAuth, async (req: Request, res: Response) => {
//   const menusResult = await db.query("select * from menus");
//   res.send(menusResult.rows);
// });

app.get("/menuscategories", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menu_categories");
  res.send(menusResult.rows);
});

// app.get("/", (req, res) => res.send("Hello World"));

// app.post("/auth/register", async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   const isValid =
//     name &&
//     name.length > 0 &&
//     email &&
//     email.length > 0 &&
//     password &&
//     password.length > 0;
//   if (!isValid) return res.send({ error: "Name and password are required." });
//   try {
//     const result = await db.query("select * from users where email=$1", [
//       email,
//     ]);
//     if (result.rows.length)
//       return res.send({ message: "User already exists." });
//     const companiesResult = await db.query(
//       "insert into companies (name) values($1) returning *",
//       ["Default companies"]
//     );
//     const companyId = companiesResult.rows[0].id;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await db.query(
//       "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) RETURNING *",
//       [name, email, hashedPassword, companyId]
//     );
//     const locationResult = await db.query(
//       "insert into locations (name, address, companies_id) values($1, $2, $3) returning *",
//       ["Default location", "Default addresss", companyId]
//     );
//     const locationId = locationResult.rows[0].id;
//     const menusResult = await db.query(
//       "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
//       [
//         ["mote-hinn-kharr", "shan-khout-swell"],
//         [500, 1000],
//       ]
//     );
//     const menus = menusResult.rows;
//     const defaultMenuId1 = menus[0].id;
//     const defaultMenuId2 = menus[1].id;
//     await db.query(
//       "insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[], $2::int[])",
//       [
//         [defaultMenuId1, defaultMenuId2],
//         [locationId, locationId],
//       ]
//     );
//     const menuCategoriesResult = await db.query(
//       "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
//     );
//     const defaultMenuCategories = menuCategoriesResult.rows;
//     const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
//     const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
//     await db.query(
//       `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
//     );
//     const defaultAddonCategoriesResult = await db.query(
//       "insert into addon_categories (name,required) values ('Drinks',true), ('Sizes',true) returning *"
//     );
//     const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
//     const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
//     await db.query(
//       `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
//     );
//     await db.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}),
//     ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
//     res.send(newUser.rows);
//   } catch (err) {
//     console.log("this is error", err);

//     res.sendStatus(500);
//   }
// });
// app.post("/auth/login", async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.sendStatus(400);
//   const userResult = await db.query("select * from users where email = $1", [
//     email,
//   ]);
//   if (!userResult.rows.length) return res.sendStatus(401);
//   const user = userResult.rows[0];
//   const hashedPassword = user.password;
//   delete user.password;
//   const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
//   if (isCorrectPassword) {
//     const accessToken = jwt.sign(user, config.jwtScret);
//     return res.send({ accessToken });
//   }

//   return res.sendStatus(401);
// });

app.listen(port, () => {
  console.log("Server has started on port:", port);
});
