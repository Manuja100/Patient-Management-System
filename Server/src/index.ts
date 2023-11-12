import express, {Request, Response} from "express";
import {config} from "dotenv";
config();
//import mongoose for db connection
import mongoose from "mongoose";
import cors from "cors";

import {addUserController} from "./controllers/UserManagementController/addUserController";
import {getUsersController} from "./controllers/UserManagementController/getUserController";
import {deleteUserController} from "./controllers/UserManagementController/deleteUserController";
import {updateUserController} from "./controllers/UserManagementController/updateUserController";
import {checkEmail} from "./controllers/UserManagementController/checkEmail";

import {login} from "./controllers/UserManagementController/loginAuth";
import {verifyUser} from "./middleware/authMiddleware";
import Auth, {isHeadNurse} from "./middleware/auth";
import {isAdmin} from "./middleware/auth";
import {isConsultant} from "./middleware/auth";
import {isDoctor} from "./middleware/auth";
import {getSingleUserController} from "./controllers/UserManagementController/getSingleUserController";
import {resetPassword} from "./controllers/UserManagementController/resetPassword";

// import WaitingList from "./models/ListManagement/WaitingList";
import {
  filterData,
  generateDailyReport,
  getAdmissionListsController,
  getDiseasedListsController,
  getFilterItems,
  getListsController,
  getNurseList,
} from "./controllers/ListManagement/getLitsController";
import {createListController} from "./controllers/ListManagement/createLitsController";
import {deleteListsController} from "./controllers/ListManagement/deleteLitsController";
import {
  putListsController,
  putListsStateController,
} from "./controllers/ListManagement/putListsController";
import AdmissionList from "./models/ListManagement/AdmissionList";

import {
  filterType,
  getEqDeletedListsController,
  getEqListsController,
} from "./controllers/EquipmentManagement/getEqListController";
import {createEqListController} from "./controllers/EquipmentManagement/createEqListController";
import {deleteEqListController} from "./controllers/EquipmentManagement/deleteEqListController";
import {
  putEqListController,
  updateEqDeleteList,
} from "./controllers/EquipmentManagement/putEqListController";
import {getEqSingleEquipmentController} from "./controllers/EquipmentManagement/getEqSingleEquipmentController";
import {setEditAdmissionList} from "./controllers/ListManagement/setEditAdmissionList";
import {Consultant, Patient} from "./routes";

const App = express();
const port = 8000;

App.use(cors({origin: "*"}));
App.use(express.json());

App.post("/resetPassword", resetPassword);

//create user POST request
App.post("/addUser", addUserController);

//get all users GET request
App.get("/user", Auth, isAdmin, getUsersController);

//get single user information
App.get("/SingleUser/:id", getSingleUserController);

//delete user POST request
App.delete("/deleteUser/:id", deleteUserController);

//check user email
App.get("/checkEmail/:email", checkEmail);

//update user POST request
App.post("/updateUser/:id", updateUserController);

//login codes
App.post("/api/user/login", verifyUser, login);

App.post("authenticate", verifyUser, (req, res) => res.end());

//-------------------------------- Patient Management -------------------------------------

App.use("/patient", Patient);

App.use("/consultant", Consultant);

//-------------------------------- Patient Management -------------------------------------
//------------------------------- List Management -----------------------------------------

App.get("/waitingList/:status", getListsController);

App.get("/lists/generateReport", generateDailyReport);

App.get("/admissionList/:status", getAdmissionListsController);

App.get("/diseasedList/:status", getDiseasedListsController);

App.get("/list/filter", filterData);

App.post("/list", createListController);

App.get("/list/filter/items", getFilterItems);

App.delete("/list/:listId", deleteListsController);

App.put("/list/:id", putListsController);

App.put("/list/:id/:status", putListsStateController);

App.get("/editList/:id", setEditAdmissionList);

App.get("/getNurseList", getNurseList);

//------------------------------- List Management -----------------------------------------

//------------------------------- Equipment Management ------------------------------------

App.get("/eqList", getEqListsController);

App.get("/eqlist/filter", filterType);

App.get("/SingleEquipment/:id", getEqSingleEquipmentController);

App.post("/eqList", createEqListController);

App.delete("/eqList/:id", deleteEqListController);

App.put("/eqList/:id", putEqListController);

App.get("/eqList/deletedList", getEqDeletedListsController);

App.put("/eqList/update/:id", updateEqDeleteList);

//------------------------------- Equipment Management ------------------------------------

mongoose
  .connect(process.env.ATLAS_URL!)
  .then(() => {
    console.log(`listening on port ${port}`);
    App.listen(port);
  })
  .catch((err) => console.error("Could not connects to MongoDB", err));

const db = mongoose.connection;
