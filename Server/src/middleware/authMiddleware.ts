import Users from "../models/UserManagementModel/users";
import express, {Request, Response, NextFunction} from "express";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {email} = req.method == "GET" ? req.query : req.body;

    let exist = await Users.findOne({email});
    if (!exist) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    return res.status(404).send({error: "Authentication Error"});
  }
}
