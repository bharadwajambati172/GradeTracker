************************************************************************************************************
                                         GRADETRACKER
************************************************************************************************************

Steps to deploy the smart-contract:

1. Install truffle globally using "sudo npm i -g truffle"
2. Open Ganache and set the following
    HOSTNAME=127.0.0.1
    PORT NUMBER=7545
    NETWORK ID=5777
and restart the Ganache. 
3. From the project root folder, run "truffle complie" in the terminal to compile the smart-comtract
4. Run "truffle migrate --reset" to deploy the smart-contract in the Ganache


Steps to test the smart-contract:

1. From the project root folder, run "npm install"
2. Run "truffle test" to run all the positive and negative test-cases of the smart-contract


Steps to run the api:

1. Copy the address from the Ganache and replace the value of fromAddress in the api/controller/gradeTracker.controller.js
2. From api folder run "nodemon app.js" to run the api. It will run on port 3090
3. Import the postman collections using the below url to test the api in the postman
    url="https://www.getpostman.com/collections/8735deb452d6fb1968d6"
4. Endpoints to test in postman
    POST /courses/ Body: { "courseId", "courseTitle"} adds a course
    POST /courses/:courseId/students adds a student to a course
    PUT /courses/:courseId/students/:studentId/grade grades a student
    GET /courses/:courseId/students/:studentId/grade returns the student's grade for a course
    GET /restaurants/:courseId/averagegrade returns the average grade for a course