import express, { Request, Response } from "express";
import EqList from "../../models/EquipmentManagement/Eqlist";

export async function deleteEqListController(req: Request, res: Response) {
  const listID = req.params.id;
  const List = await EqList.findByIdAndDelete(listID);
  res.json({
    List,
  });
}
