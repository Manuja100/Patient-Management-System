import express, { Request, Response } from "express";
import { PatientModel } from "../../models/PatientManagement/PatientModel";
import AdmissionList from "../../models/ListManagement/AdmissionList";
import DiseasedLists from "../../models/ListManagement/DiseasedList";
import * as bodyParser from "body-parser";
import Users from "../../models/UserManagementModel/users";

export async function getListsController(req: Request, res: Response) {
  try {
    const status = req.params.status;
    const list = await PatientModel.find({
      status: { $eq: status },
    });
    res.json(list);
    console.log(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getAdmissionListsController(req: Request, res: Response) {
  try {
    const status = req.params.status;
    const list = await AdmissionList.aggregate([
      {
        $lookup: {
          from: "waitinglists",
          localField: "waitingListId",
          foreignField: "_id",
          as: "waitingList",
        },
      },
      {
        $match: {
          "waitingList.status": status,
        },
      },
    ]);

    res.json(list);
    console.log(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getDiseasedListsController(req: Request, res: Response) {
  try {
    const list = await DiseasedLists.find()
      .populate("admissionId")
      .populate("waitingListId")
      .exec();

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

interface FilterParams {
  consultantResponsible?: string;
  minAge?: number;
  maxAge?: number;
  diagnosis?: string;
  gender?: string;
  district?: string;
}

export async function filterData(req: Request, res: Response) {
  console.log("Query string:", req.query);

  const {
    consultantResponsible,
    minAge,
    maxAge,
    diagnosis,
    gender,
    district,
  }: FilterParams = req.query;

  const filter: Record<string, any> = {};

  if (consultantResponsible) {
    filter.consultantResponsible = consultantResponsible;
  }

  if (minAge !== undefined && maxAge !== undefined) {
    filter.age = { $gte: minAge, $lte: maxAge };
  } else if (minAge !== undefined) {
    filter.age = { $gte: minAge };
  } else if (maxAge !== undefined) {
    filter.age = { $lte: maxAge };
  }

  if (diagnosis) {
    filter.diagnosis = diagnosis;
  }

  if (gender) {
    filter.gender = gender;
  }

  if (district) {
    filter.district = district;
  }

  filter.status = "waiting";

  try {
    const patients = await PatientModel.find(filter);

    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getFilterItems(req: Request, res: Response) {
  try {
    const result = await PatientModel.aggregate([
      { $match: { status: "waiting" } },
      {
        $group: {
          _id: null,
          consultantResponsible: { $addToSet: "$consultantResponsible" },
          diagnosis: { $addToSet: "$diagnosis" },
          district: { $addToSet: "$district" },
        },
      },
    ]);

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function generateDailyReport(req: Request, res: Response) {
  try {
    const D = await AdmissionList.findOne({}, null, {
      sort: { _id: -1 },
      admissionDate: -1,
      dailyNo: -1,
      monthlyNo: -1,
      yearlyNo: -1,
    }).lean();

    let dNo = 0;
    let mNo = 0;
    let yNo = 0;
    const crrDate = new Date();
    const crrDay = crrDate.getDate();
    const crrMonth = crrDate.getMonth() + 1;
    const crrYear = crrDate.getFullYear();
    if (D !== null) {
      const prvDate = new Date(D.admissionDate);
      const prvDay = prvDate.getDate();
      const prvMonth = prvDate.getMonth() + 1;
      const prvYear = prvDate.getFullYear();

      console.log(crrDay, crrMonth, crrYear);
      console.log(prvDay, prvMonth, prvYear);

      if (crrYear == prvYear) {
        yNo = D.yearlyNo;
        if (crrMonth == prvMonth) {
          mNo = D.monthlyNo;
          if (crrDay == prvDay) {
            dNo = D.dailyNo;
          }
        }
      }
      res.json({ yNo, mNo, dNo });
    } else {
      console.log("No matching documents found.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the list" });
  }
}

export async function getNurseList(req: Request, res: Response) {
  try {
    const result = await Users.aggregate([
      { $match: { userType: "Nurse" } },
      {
        $group: {
          _id: null,
          firstName: { $addToSet: "$firstName" },
          lastName: { $addToSet: "$lastName" },
        },
      },
    ]);

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
