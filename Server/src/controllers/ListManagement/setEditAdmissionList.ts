import { Request, Response } from "express";
import AdmissionList from "../../models/ListManagement/AdmissionList";

export const setEditAdmissionList = async (req: Request, res: Response) => {
  try {
    const pid = req.params.id;
    const patient = await AdmissionList.findById(pid);
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error: " + error });
  }
};
