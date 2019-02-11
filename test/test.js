const GradeTracker = artifacts.require("GradeTracker");
const assert = require('chai').assert

contract("Testing the GradeTracker methods", () => {
    describe("deploy the gradeTracker contract", () => {
        it("catch a GradeTracker instance", async () => {
            let instance = await GradeTracker.new()
            gradeTracker = instance;
        })
    })
    describe("positive test-cases for gradeTracker", () => {
        it("adding a course", async () => {
            let res = await gradeTracker.addCourse("1", "course1")
            let status = res ? true : false
            assert.equal(status, true)
        })
        it("adding a student to a course", async () => {
            let res = await gradeTracker.addStudentToCourse("1", "1")
            let status = res ? true : false
            assert.equal(status, true)
        })
        it("grade a student for a course", async () => {
            let res = await gradeTracker.gradeStudentForACourse("1", "1", 99)
            let status = res ? true : false
            assert.equal(status, true)
        })
        it("get class average grade", async () => {
            let res = await gradeTracker.getClassAverageGrade("1")
            assert.equal(res, 99)
        })
        it("get student grade", async () => {
            let res = await gradeTracker.getStudentGrade("1", "1")
            assert.equal(res, 99)
        })
    })
    describe("negative test-cases for gradeTracker", () => {
        it("adding a course", async () => {
            let res
            try {
                res = await gradeTracker.addCourse(1, "course1")
            } catch (err) {
            }
            let status = res ? true : false
            assert.notEqual(status, true)
        })
        it("adding a student to a course", async () => {
            let res
            try {
                res = await gradeTracker.addStudentToCourse("2", "1")
            } catch (err) {
            }
            let status = res ? true : false
            assert.notEqual(status, true)
        })
        it("grade a student for a course", async () => {
            let res
            try {
                res = await gradeTracker.gradeStudentForACourse("1", "2", 99)
            } catch (err) {
            }
            let status = res ? true : false
            assert.notEqual(status, true)
        })
        it("get class average grade", async () => {
            let res = await gradeTracker.getClassAverageGrade("1")
            assert.notEqual(res, 100)
        })
        it("get student grade", async () => {
            let res = await gradeTracker.getStudentGrade("1","1")
            assert.notEqual(res, 19)
        })
    })
})
