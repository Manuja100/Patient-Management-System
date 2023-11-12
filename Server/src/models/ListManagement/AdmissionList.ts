import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const AdmissionListSchema = new Schema({
  admissionDate: { type: Date, required: true },
  yearlyNo: { type: Number, required: true },
  monthlyNo: { type: Number, required: true },
  dailyNo: { type: Number, required: true },
  BHTNo: { type: String, required: true },
  clinicNo: { type: String, required: true },
  PHPNo: { type: String, required: true },
  gardien: { type: String, required: true },
  gardienContactNo: { type: String, required: true },
  waitingListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "waitinglists",
    required: true,
  },
});

const AdmissionList = mongoose.model("admissionlists", AdmissionListSchema);

export default AdmissionList;
