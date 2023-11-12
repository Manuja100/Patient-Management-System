import {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "Error: " + error});
  }
};
