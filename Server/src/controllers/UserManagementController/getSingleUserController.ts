import {Request, Response} from "express";
import Users from "../../models/UserManagementModel/users";

export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;
    const users = await Users.findById(userID);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "Error: " + error});
  }
};
