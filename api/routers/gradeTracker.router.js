const express=require("express")
const router=express.Router()
const GradeTrackerC=require("../controllers/gradeTracker.controller")
router.post("/courses", GradeTrackerC.addCourse);
router.post("/courses/:courseId/students", GradeTrackerC.addStudentToCourse);
router.put("/courses/:courseId/students/:studentId/grade",GradeTrackerC.gradeStudentForACourse);
router.get("/restaurants/:courseId/averagegrade",GradeTrackerC.getClassAverageGrade);
router.get("/courses/:courseId/students/:studentId/grade",GradeTrackerC.gradeStudentForACourse);

module.exports=router;