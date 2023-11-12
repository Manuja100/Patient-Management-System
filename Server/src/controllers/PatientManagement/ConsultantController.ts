import { Request, Response } from "express";
import Users from "../../models/UserManagementModel/users";

export const getAllConsultants = async (req: Request, res: Response) => {
  try {
    const type: string = "Consultant";
    const consultants = await Users.find({ userType: type });
    console.log(consultants);
    res.json(consultants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getAllConsultants;
