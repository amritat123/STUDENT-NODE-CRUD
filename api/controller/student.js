const StudentModel = require("../model/student");
const mongoose = require("mongoose");
const moment = require("moment");
const niv = require("node-input-validator");

exports.addStudent = async (req, res) => {
  const object = new niv.Validator(req.body, {
    name: "required|maxLength:55",
    standard: "required|maxLength:12",
    join_date: "required",
    uniform: "required",
  });
  const match = await object.check();
  if (!match) {
    return res.status(404).send({
      message: "Validation failed",
      Error: object.errors,
    });
  }

  try {
    const { name, standard, subject, join_date, uniform } = req.body;

    const createObj = {};
    createObj.name = name;
    (createObj.standard = standard),
      (createObj.join_date = join_date),
      (createObj.uniform = uniform),
      (createObj.subject = subject);

    const newResult = new StudentModel(createObj);
    const result = await newResult.save();

    return res.status(200).send({
      message: "Student added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "something went wrong",
      err: error,
    });
  }
};
// Get the list of students
exports.getStudent = async (req, res) => {
  let { limit, page, search } = req.query;

  if (["", "undefined", "null", undefined, null, 1, 0].includes(limit)) {
    limit = 10;
  }
  if ([1, 0, "undefined", "null", null, undefined, ""].includes(page)) {
    page = 1;
  }
  if (["", undefined, null, "undefined", "null"].includes(search)) {
    search = "";
  }
  const options = {
    limit: limit,
    page: page,
  };
  const matchObj = {};
  matchObj.name = { $regex: search, $options: "i" };

  try {
    const studentData = await StudentModel.aggregate([
      {
        $sort: {
          join_date: -1,
        },
      },
      {
        $project: {
          name: 1,
          standard: 1,
          subject: 1,
          join_date: 1,
          uniform: 1,
        },
      },
    ]);
    const result = await StudentModel.aggregatePaginate(studentData, options);

    return res.status(200).send({
      message: "Successfully retrieved students",
      result: result,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "internal server error",
      error: error,
    });
  }
};

// Get Detail by ID
exports.getDetail = async (req, res) => {
  const id = req.params.id;

  const matchObj = {};
  matchObj._id = new mongoose.Types.ObjectId(id);

  try {
    const studentData = await StudentModel.findOne(matchObj);

    return res.status(200).send({
      message: "Student details fetched successfully",
      result: studentData,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "internal server error",
      error: error,
    });
  }
};

// update student details
exports.updateStudent = async (req, res) => {
  const { name, standard, subject, uniform, join_date } = req.body;
  const id = req.params.id;
  updateObj = {};
  updateObj._id = new mongoose.Types.ObjectId(id);
  if (name) {
    updateObj.name = name;
  }
  if (subject) {
    updateObj.subject = subject;
  }
  if (uniform) {
    updateObj.uniform = uniform;
  }
  if (standard) {
    updateObjObj.standard = standard;
  }
  if (join_date) {
    updateObj.join_date = join_date;
  }
  try {
    const result = await StudentModel.findByIdAndUpdate(
      id,
      {
        $set: updateObj,
      },
      { new: true } //  it will show the updated field.
    );

    return res.status(200).send({
      message: "Updated successfully",
      result: result,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "internal server error",
      error: error,
    });
  }
};

// Delete a student from the database
exports.deleteStudent = async (req, res) => {
  const id = req.params.id;
  deleteObj = {};
  deleteObj._id = mongoose.Types.ObjectId(id);

  try {
    const data = await StudentModel.findByIdAndDelete(id);
    return res.status(200).send({
      message: "Student details has been deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "internal server error",
      success: false,
    });
  }
};
