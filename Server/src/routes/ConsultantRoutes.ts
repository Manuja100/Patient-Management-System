import { getAllConsultants } from "../controllers";

import { Router } from "express";

const consultant = Router();

consultant.route("/all").get(getAllConsultants);

export default consultant;
