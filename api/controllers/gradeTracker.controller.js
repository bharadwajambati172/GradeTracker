const GradeTrackerWeb3=require("../../web3.controller.js").myContract()
const fromAddress="0xfE9944b011A53C01FB374154938D1da50dD8018e"
async function addCourse(req, res) {
    try{
       let resp = await GradeTrackerWeb3.methods.addCourse(req.body.courseId, req.body.courseTitle).send({ from: fromAddress})
       res.send({"result":"Course added successfully"})
    }catch(err){
        res.status(500).send({"error":"course not added"})
    }
}
async function addStudentToCourse(req, res) {
    try{
        await GradeTrackerWeb3.methods.addStudentToCourse(req.params.courseId, req.body.studentId).send({from:fromAddress})
        res.send({"result":"Student added successfully"})
    }catch(err){
        res.status(500).send({"error":"student not added or course doesn't exists"})
    }
}
async function gradeStudentForACourse(req, res) {

    try{
        await GradeTrackerWeb3.methods.gradeStudentForACourse(req.params.courseId, req.params.studentId, req.body.grade).send({from:fromAddress})
        res.send({"result":"Student graded successfully"})
    }catch(err){
        let msg=(req.body.grade<0 || req.body.grade>100)? "Grade should be greater than or equal to zero and less than or equal to hundred":"course or student not found"
        res.status(500).send({"error":msg})
    }
}
async function getClassAverageGrade(req, res) {
    try{
        let grade=await GradeTrackerWeb3.methods.getClassAverageGrade(req.params.courseId).call({from:fromAddress})
        res.send({"classGrade":grade})
    }catch(err){
        res.status(500).send({"error":"course not found"})
    }
}
async function getStudentGrade(req, res) {
    try{
        let grade=await GradeTrackerWeb3.methods.getStudentGrade(req.params.courseId, req.params.studentId).call({from:fromAddress})
        res.send({"studentGrade":grade})
    }catch(err){
        res.status(500).send({"error":"course or student not found"})
    }
}

module.exports = {
    addCourse: addCourse,
    addStudentToCourse: addStudentToCourse,
    gradeStudentForACourse: gradeStudentForACourse,
    getClassAverageGrade: getClassAverageGrade,
    getStudentGrade: getStudentGrade
}
