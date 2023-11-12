import express, { Request, Response } from "express";
import EqList from "../../models/EquipmentManagement/Eqlist";

export async function getEqListsController(req: Request, res: Response) {
  try {
    const list = await EqList.find({
      status: { $ne: "delete" },
    });
    res.json(list);
    console.log(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getEqDeletedListsController(req: Request, res: Response) {
  try {
    const status = "delete";
    const list = await EqList.find({
      status: { $eq: status },
    });
    res.json(list);
    console.log(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function filterType(req: Request, res: Response) {
  console.log("Query string:", req.query);

  const EquipmentType = req.query.Type;

  const filter: Record<string, any> = {};

  if (EquipmentType) {
    filter.Type = EquipmentType;
  }
  try {
    const Equipment = await EqList.find(filter);

    res.json(Equipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
