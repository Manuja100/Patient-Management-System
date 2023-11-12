import { Request, Response } from "express";
import EqList from "../../models/EquipmentManagement/Eqlist";

export const getEqSingleEquipmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const eqId = req.params.id;
    const Equipment = await EqList.findById(eqId);
    res.json(Equipment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error: " + error });
  }
};
