pragma solidity ^0.5.0;

contract GradeTracker{

    mapping(string=>string) courses;
    string[] courseIds;
    mapping(string=>mapping(string=>uint)) studentsDetails;
    mapping(string=>string[]) courseStudentIds;

    //CourseAdded event
    event CourseAdded(string courseId, string courseTitle);
    //StudentAdded event
    event StudentAdded(string courseId, string studentId);
    //StudentGraded event
    event StudentGraded(string courseId, string studentId, uint grade);

    //This function records a course with courseId and courseTitle and finally emits the CourseAdded event
    function addCourse(string memory courseId, string memory courseTitle) public {
        bool exists=false;
        courses[courseId]=courseTitle;
        for(uint i=0;i<courseIds.length;i++){
            if(keccak256(bytes(courseIds[i])) != keccak256(bytes(courseId))){
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
    //This function adds student to a course and finally emits the StudentAdded event 
    function addStudentToCourse(string memory courseId, string memory studentId) public{
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            studentsDetails[courseId][studentId]=0;
            courseStudentIds[courseId].push(studentId);
        }else{
            revert("course does not exists");
        }
        emit StudentAdded(courseId, studentId);
    }
    //This function will grade a student for a particular cours and finally emits the StudentGraded event
    function gradeStudentForACourse(string memory courseId, string memory studentId, uint grade) public{
        if((checkCourseAndStudentExists(courseId, studentId)==true)&&(grade>=0 && grade <=100)){
            studentsDetails[courseId][studentId]=grade;
        }else{
            revert("courseId or studentId doesn't exists");

        }
        emit StudentGraded(courseId, studentId, grade);   
    }
    //This function will returns the average class grade
    function getClassAverageGrade(string memory courseId) public view returns (uint) {
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            return classAverage(courseId);
        }else{
            revert("CourseId doesn't exists");

        }
    }
    //This function will returns the student grade for a particular course
    function getStudentGrade(string memory courseId, string memory studentId) public view returns (uint) {
        if(checkCourseAndStudentExists(courseId, studentId)==true){
            return studentsDetails[courseId][studentId];
        }else{
            revert("CourseId or StudentId doesn't exists");
        }
    }
    //This internal function will retruns True/False based on studentId and the courseId
    function checkCourseAndStudentExists(string memory courseId, string memory studentId) internal view returns(bool){
        if(keccak256(bytes(courses[courseId])) != keccak256((bytes("")))){
            string[] memory studentIds=courseStudentIds[courseId];
            for(uint i=0;i<studentIds.length;i++){
                if(keccak256(bytes(studentIds[i]))==keccak256(bytes(studentId))){
                    return true;
                }
            }
        }
        return false;
    }
    //This internal function will returns the classAverage for a particular course
    function classAverage(string memory courseId) internal view returns (uint) {
        uint sum=0;
        string[] memory studentIds=courseStudentIds[courseId];
        for(uint i=0;i<studentIds.length;i++){
            sum+=studentsDetails[courseId][studentIds[i]];
        }
        return sum/studentIds.length;
    }
}
