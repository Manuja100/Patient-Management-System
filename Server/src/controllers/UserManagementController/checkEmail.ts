import {Request, Response} from "express";
import User from "../../models/UserManagementModel/users";

export async function checkEmail(req: Request, res: Response) {
  try {
    const email = req.params.email;
    console.log(email);
    const user = await User.findOne({email});
    if (user) {
      return res.status(400).json({message: "User Already Exists"});
    } else {
      return res.json({message: "User does not exist"});
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
}
