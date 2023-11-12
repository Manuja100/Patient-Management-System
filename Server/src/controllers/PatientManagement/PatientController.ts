import { Request, Response } from "express";

import { PatientModel } from "../../models/PatientManagement/PatientModel";

export const addPatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  const {
    serialNo,
    clinicRegNo,
    dateOfRegistration,
    name,
    dateOfBirth,
    NIC,
    address,
    district,
    contactNo,
    occupation,
    race,
    religion,
    gender,
    diagnosis,
    consultantResponsible,
    specialNotes,
    starPriorityLevel,
  } = req.body;

  const newPatient = new PatientModel({
    serialNo,
    clinicRegNo,
    dateOfRegistration,
    name,
    dateOfBirth,
    NIC,
    district,
    address,
    contactNo,
    occupation,
    race,
    religion,
    diagnosis,
    consultantResponsible,
    gender,
    specialNotes,
    starPriorityLevel,
    status: "waiting",
  });

  try {
    await newPatient.save();

    res.json("patient added");
  } catch (error) {
    res.status(500).send({ status: "error" });

    console.log(error);
  }
};

export const getPatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  const id = req.params.id;
  console.log(id);
  try {
    const patient = await PatientModel.findById(id.toString());

    if (patient === null) throw new Error("Patient not found");

    res.json(patient);
  } catch (error) {
    console.log(error);
  }
};

export const updatePatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  const { id } = req.params;

  console.log("update");

  const {
    serialNo,
    clinicRegNo,
    dateOfRegistration,
    name,
    dateOfBirth,
    NIC,
    address,
    district,
    contactNo,
    occupation,
    race,
    religion,
    gender,
    diagnosis,
    consultantResponsible,
    specialNotes,
    starPriorityLevel,
    status,
  } = req.body;

  const newDetails = {
    serialNo,
    clinicRegNo,
    dateOfRegistration,
    name,
    dateOfBirth,
    NIC,
    address,
    district,
    contactNo,
    occupation,
    race,
    religion,
    gender,
    diagnosis,
    consultantResponsible,
    specialNotes,
    starPriorityLevel,
    status,
  };

  try {
    const updatePatient = await PatientModel.findByIdAndUpdate(id, newDetails);

    res.json(updatePatient);
  } catch (error) {
    console.log(error);
  }
};

export const getAllPatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  try {
    const patients = await PatientModel.find();

    res.json(patients);
  } catch (error) {
    console.log(error);
  }
};

export const deletePatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  const id = req.params.id;

  const { deceasedDate } = req.body;

  try {
    const patient = await PatientModel.findById(id.toString());

    if (patient === null) throw new Error("Patient not found");

    patient.isDeceased = true;
    patient.status = "deceased";

    patient.deceasedDate = deceasedDate;

    await patient.save();

    res.json("Patient deleted");
  } catch (error) {
    console.log(error);
  }
};

export const deceasedPatient = async (
  req: Request,

  res: Response
): Promise<void> => {
  try {
    const patients = await PatientModel.find({
      isDeceased: { $eq: true },
    });

    res.json(patients);
  } catch (error) {
    console.log(error);
  }
};
