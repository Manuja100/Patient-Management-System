const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DiseasedSchema = new Schema({
  dateOfPassing: String,
  reason: String,
  admissionId: { type: Schema.Types.ObjectId, ref: "admissionlists" },
  waitingListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "waitinglists",
    required: true,
  },
});

const DiseasedLists = mongoose.model("diseasedlists", DiseasedSchema);

export default DiseasedLists;
