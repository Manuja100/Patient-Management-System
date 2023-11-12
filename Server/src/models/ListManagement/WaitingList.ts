import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const WaitingListSchema = new Schema({
  serialNo: String,
  clinicRegNo: String,
  dateOfRegistration: Date,
  name: String,
  dateOfBirth: String,
  NIC: String,
  address: String,
  district: String,
  contactNo: String,
  occupation: String,
  race: String,
  religion: String,
  gender: String,
  diagnosis: String,
  consultantResponsible: String,
  specialNotes: String,
  starPriorityLevel: Number,
  status: String,
});

const WaitingList = mongoose.model("waitinglists", WaitingListSchema);

export default WaitingList;
