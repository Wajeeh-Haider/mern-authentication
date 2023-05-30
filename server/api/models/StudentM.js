import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: String,
  cnic: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  enrolled: {
    type: Boolean,
    default: true,
  },
});

mongoose.models = {};

const Students = mongoose.model("Students", StudentSchema);

export default Students;
