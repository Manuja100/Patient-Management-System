import express, { Request, Response } from "express";
import EqList from "../../models/EquipmentManagement/Eqlist";

export async function createEqListController(req: Request, res: Response) {
  console.log(req.body);

  const newList = new EqList(req.body);
  const createList = await newList.save();
  res.json(createList);
  console.log(createList);
}
