import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

enum userType {
  CONSULTANT = "consultant",
  DOCTOR = "doctor",
  HEAD_NURSE = "head_nurse",
  NURSE = "nurse",
  ADMIN = "admin",
}

const userSchema = new Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    userType: {type: String, required: true},
    designation: {type: String, required: false},
    contactNumber: {type: String, required: true},
    email: {type: String, required: true, trim: true, lowercase: true},
    password: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
