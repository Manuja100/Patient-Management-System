import { Router } from "express";
import {
  addPatient,
  deletePatient,
  getPatient,
  updatePatient,
} from "../controllers";
import { deceasedPatient } from "../controllers/PatientManagement/PatientController";

const patient = Router();

patient.route("/add").post(addPatient);

// router.route("/waiting-list").get(getAllPatient);

patient.route("/:id").get(getPatient);

patient.route("/update/:id").put(updatePatient);

patient.route("/decease-list/:id").delete(deletePatient);

patient.route("/decease-list/all").get(deceasedPatient);

export default patient;
