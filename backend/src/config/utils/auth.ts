import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;

  if (!authorization) return res.send(401);
  try {
    const token = authorization.split(" ")[1];

    const user = jwt.verify(token, config.jwtScret);

    //@ts-ignore
    req["email"] = user.email;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
