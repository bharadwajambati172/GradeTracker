const GradeTrackerWeb3=require("../../web3.controller.js").myContract
const fromAddress="0xfE9944b011A53C01FB374154938D1da50dD8018e"
async function addCourse(req, res) {
    try{
        await GradeTrackerWeb3.methods.addCourse(req.body.courseId, req.body.courseTitle).send({ from: fromAddress})
        res.json("Course added successfully")
    }catch(err){
        res.status(500).send({"error":err})
    }
}
async function addStudentToCourse(req, res) {
    try{
        await GradeTrackerWeb3.methods.addStudentToCourse(req.params.courseId, req.body.studentId).send({from:fromAddress})
        res.json("Student added successfully")
    }catch(err){
        res.status(500).send({"error":err})
    }
}
async function gradeStudentForACourse(req, res) {
    try{
        await GradeTrackerWeb3.methods.gradeStudentForACourse(req.params.courseId, req.params.studentId, req.body.grade).send({from:fromAddress})
        res.json("Student graded successfully")
    }catch(err){
        res.status(500).send({"error":err})
    }
}
async function getClassAverageGrade(req, res) {
    try{
        let grade=await GradeTrackerWeb3.methods.getClassAverageGrade(req.params.courseId).call({from:fromAddress})
        res.send({"classGrade":grade})
    }catch(err){
        res.status(500).send({"error":err})
    }
}
async function getStudentGrade(req, res) {
    try{
        let grade=await GradeTrackerWeb3.methods.getStudentGrade(req.params.courseId, req.params.studentId).call({from:fromAddress})
        res.send({"studentGrade":grade})
    }catch(err){
        res.status(500).send({"error":err})
    }
}

module.exports = {
    addCourse: addCourse,
    addStudentToCourse: addStudentToCourse,
    gradeStudentForACourse: gradeStudentForACourse,
    getClassAverageGrade: getClassAverageGrade,
    getStudentGrade: getStudentGrade
}
