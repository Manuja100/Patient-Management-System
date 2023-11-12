import {Request, Response} from "express";
import User from "../../models/UserManagementModel/users";

export async function deleteUserController(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const userCheck = await User.findById(userId);
    if (userCheck?.userType === "Admin") {
      return res.status(401).json({message: "Can not delete ADMIN"});
    }
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    res.json({message: "User deleted successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Server error"});
  }
}
