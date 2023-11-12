import express, { Request, Response } from "express";
import AdmissionList from "../../models/ListManagement/AdmissionList";
import { PatientModel } from "../../models/PatientManagement/PatientModel";

export async function putListsController(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const update = req.body;
    const options = { new: true };
    const updatedPatient = await AdmissionList.findByIdAndUpdate(
      patientId,
      update,
      options
    );
    res.send(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function putListsStateController(req: Request, res: Response) {
  try {
    console.log(req.params.id);
    console.log(req.params.status);
    const patientId = req.params.id;
    const status = req.params.status;
    const update = { status: status };
    const options = { new: true };
    const updatedPatient = await PatientModel.findByIdAndUpdate(
      patientId,
      update,
      options
    );
    res.send(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
