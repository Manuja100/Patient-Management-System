import express, { Request, Response } from "express";
import EqList from "../../models/EquipmentManagement/Eqlist";

export async function putEqListController(req: Request, res: Response) {
  try {
    const eqId = req.params.id;
    const update = req.body;
    console.log(update);
    const options = { new: true };
    const updatedEquipment = await EqList.findByIdAndUpdate(
      eqId,
      update,
      options
    );
    res.send(updatedEquipment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateEqDeleteList(req: Request, res: Response) {
  try {
    const EqId = req.params.id;
    console.log(EqId);
    const status = "delete";
    const options = { new: true };
    const update = { status: status };
    const updateStatus = await EqList.findByIdAndUpdate(EqId, update, options);
    res.send(updateStatus);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
