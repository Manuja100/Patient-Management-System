import express, { Request, Response } from "express";
import AdmissionList from "../../models/ListManagement/AdmissionList";
import { PatientModel } from "../../models/PatientManagement/PatientModel";

export async function deleteListsController(req: Request, res: Response) {
  const listID = req.params.listId;
  const deletedRecord = await AdmissionList.findByIdAndDelete(listID);

  const update = { status: "waiting" };
  const options = { new: true };
  if (deletedRecord != null) {
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      deletedRecord.waitingListId,
      update,
      options
    );
  }
  const updateResult = await AdmissionList.updateMany(
    { _id: { $gt: listID } },
    { $inc: { yearlyNo: -1, monthlyNo: -1, dailyNo: -1 } }
  );

  res.json({
    deletedRecord,
  });
}
