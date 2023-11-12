import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eqListSchema = new Schema({
  serialNo: String,
  name: String,
  Type: String,
  pageNo: Number,
  Quantity: Number,
  location: String,
  status: String,
});

const EqList = mongoose.model("EqList", eqListSchema);

export default EqList;
