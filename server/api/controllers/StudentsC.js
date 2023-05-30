import Students from "../models/StudentM.js";

export const getStudents = async (req, res) => {
  const students = await Students.find();
  res.json(students);
};

export const createStudent = async (req, res) => {
  const { name, fatherName, cnic, mobileNumber } = req.body;
  const newStudent = new Students({
    name,
    fatherName,
    cnic,
    mobileNumber,
  });
  await newStudent.save();

  res.json({ status: "Student created" });
};

export const getStudent = async (req, res) => {
  const student = await Students.findById(req.params.id);
  res.json(student);
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    rollNo: req.body.rollNo,
    cnic: req.body.cnic,
    fatherName: req.body.fatherName,
  };

  const update = await Students.findIdAndUpdate(
    id,
    { $set: student },
    { new: true }
  );
  res.json({ status: "Student Updated" });
};

export const deleteStudent = async (req, res) => {
  await Students.findByIdAndRemove(req.params.id);
  res.json({ status: "Student Deleted" });
};
