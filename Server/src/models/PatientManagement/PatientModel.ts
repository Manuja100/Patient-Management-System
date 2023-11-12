import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  serialNo: { type: String, required: true },
  clinicRegNo: { type: String, required: true },
  dateOfRegistration: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  NIC: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
  race: { type: String, required: true },
  religion: { type: String, required: true },
  gender: { type: String, required: true },
  diagnosis: { type: String, required: true },
  consultantResponsible: { type: String, required: false },
  specialNotes: { type: String, required: false },
  starPriorityLevel: { type: Number, required: true },
  status: { type: String, required: true },
  isDeceased: { type: Boolean },
  deceasedDate: { type: String },
});

export const PatientModel = mongoose.model("waitinglists", PatientSchema);
