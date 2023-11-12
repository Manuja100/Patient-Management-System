import express, { Request, Response, request } from "express";
import AdmissionList from "../../models/ListManagement/AdmissionList";
import { PatientModel } from "../../models/PatientManagement/PatientModel";

export async function createListController(req: Request, res: Response) {
  try {
    const D = await AdmissionList.findOne({}, null, {
      sort: { _id: -1 },
      admissionDate: -1,
      dailyNo: -1,
      monthlyNo: -1,
      yearlyNo: -1,
    }).lean();

    console.log(D);
    let dNo = 1;
    let mNo = 1;
    let yNo = 1;
    const crrDate = new Date(req.body.admissionDate);
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
        yNo = D.yearlyNo + 1;
        if (crrMonth == prvMonth) {
          mNo = D.monthlyNo + 1;
          if (crrDay == prvDay) {
            dNo = D.dailyNo + 1;
          }
        }
      }
    } else {
      console.log("No matching documents found.");
    }

    const { yearlyNo = yNo, monthlyNo = mNo, dailyNo = dNo } = req.body;
    req.body.yearlyNo = yearlyNo;
    req.body.monthlyNo = monthlyNo;
    req.body.dailyNo = dailyNo;

    console.log(req.body);

    const value = req.body.BHTNo;

    const checkBHTNo = await AdmissionList.findOne({
      BHTNo: { $eq: value },
    });

    if (checkBHTNo) {
      return res
        .status(500)
        .json({ error: "An error occurred while creating the list" });
    }

    const newList = new AdmissionList(req.body);
    const createList = await newList.save();

    const update = { status: "admission" };
    const options = { new: true };

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      req.body.waitingListId,
      update,
      options
    );

    res.json(createList);
    console.log(createList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the list" });
  }
}
