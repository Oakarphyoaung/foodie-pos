import express, { Request, Response } from "express";
import { db } from "../../../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // input, request, data validation
  const isValid = email && email.length > 0 && password && password.length > 0;
  if (!isValid) return res.sendStatus(400);
  const result = await db.query("select * from users where email=$1", [email]);
  if (!result.rows.length) return res.sendStatus(404);

  const isValidPassword = await bcrypt.compare(
    password,
    result.rows[0].password
  );
  if (!isValidPassword) return res.status(401).send("Invalid credentails.");
  const userResult = result.rows[0];
  const user = {
    id: userResult.id,
    name: userResult.name,
    email: userResult.email,
  };
  const accessToken = jwt.sign(user, config.jwtScret);
  res.send({ accessToken });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) return res.send({ error: "Name and password are required." });
  try {
    const result = await db.query("select * from users where email=$1", [
      email,
    ]);

    if (result.rows.length)
      return res.send({ message: "User already exists." });
    const companiesResult = await db.query(
      "insert into companies (name) values($1) returning *",
      ["Default company"]
    );

    const companyId = companiesResult.rows[0].id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, companyId]
    );

    const locationResult = await db.query(
      "insert into locations (name, address, companies_id) values($1, $2, $3) returning *",
      ["Default location", "Default addresss", companyId]
    );
    const locationId = locationResult.rows[0].id;
    const menusResult = await db.query(
      "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
      [
        ["mote-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );
    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    await db.query(
      "insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[], $2::int[])",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );

    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
    await db.query(
      `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name, is_required) values ('Drinks', false), ('Sizes', false) returning *"
    );

    const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
    const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
    await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );

    await db.query(`insert into addon (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);

    res.send(newUser.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default authRouter;
