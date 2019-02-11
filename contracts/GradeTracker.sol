pragma solidity ^0.5.0;

contract GradeTracker{

    mapping(uint=>string) courses;
    uint[] courseIds;
    mapping(uint=>mapping(uint=>uint)) studentsDetails;
    mapping(uint=>uint[]) courseStudentIds;

    event CourseAdded(uint courseId, string courseTitle);
    event StudentAdded(uint courseId, uint studentId);
    event StudentGraded(uint courseId, uint studentId, uint grade);

    function addCourse(uint courseId, string memory courseTitle) public {
        bool exists=false;
        courses[courseId]=courseTitle;
        for(uint i=0;i<courseIds.length;i++){
            if(courseIds[i] != courseId){
                exists=false;
            }else{
                exists=true;
                break;
            }
        }
        if(!exists){
            courseIds.push(courseId);
        }
        emit CourseAdded(courseId, courseTitle);
    }
    function addStudentToCourse(uint courseId, uint studentId) public{
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            studentsDetails[courseId][studentId]=0;
            courseStudentIds[courseId].push(studentId);
        }else{
            revert("course does not exists");
        }
        emit StudentAdded(courseId, studentId);
    }
    function gradeStudentForACourse(uint courseId, uint studentId, uint grade) public{
        if((checkCourseAndStudentExists(courseId, studentId)==true)&&(grade>=0 && grade <=100)){
            studentsDetails[courseId][studentId]=grade;
        }else{
            revert("courseId or studentId doesn't exists");

        }
        emit StudentGraded(courseId, studentId, grade);   
    }
    function getClassAverageGrade(uint courseId) public view returns (uint) {
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            return classAverage(courseId);
        }else{
            revert("CourseId doesn't exists");

        }
    }
    function getStudentGrade(uint courseId, uint studentId) public view returns (uint) {
        if(checkCourseAndStudentExists(courseId, studentId)==true){
            return studentsDetails[courseId][studentId];
        }else{
            revert("CourseId or StudentId doesn't exists");
        }
    }

    function checkCourseAndStudentExists(uint courseId, uint studentId) internal view returns(bool){
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            uint[] memory studentIds=courseStudentIds[courseId];
            for(uint i=0;i<studentIds.length;i++){
                if(studentIds[i]==studentId){
                    return true;
                }
            }
        }
        return false;
    }

    function classAverage(uint courseId) internal view returns (uint) {
        uint sum=0;
        uint[] memory studentIds=courseStudentIds[courseId];
        for(uint i=0;i<studentIds.length;i++){
            sum+=studentsDetails[courseId][studentIds[i]];
        }
        return sum/studentIds.length;
    }
}
