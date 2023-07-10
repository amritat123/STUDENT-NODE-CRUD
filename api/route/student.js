const express = require("express");
const router = express.Router();
const studentController = require("../controller/student");

router.post("/add", studentController.addStudent);
router.get("/get", studentController.getStudent);
router.get("/detail/:id", studentController.getDetail);

router.patch("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

module.exports = router;
