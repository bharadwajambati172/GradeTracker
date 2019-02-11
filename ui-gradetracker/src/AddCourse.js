import React from 'react';
import GradeTracer from './services/gradeTracker';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddCourse extends React.Component {
    gradeTracker = new GradeTracer();
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            courseTitle: '',
            courses: []
        }
        this.saveFrom = this.saveFrom.bind(this);
    }

    async saveFrom(params) {
        params.preventDefault()
        const { courseId, courseTitle, courses } = this.state;
        let courseData = { "courseId": courseId, "courseTitle": courseTitle }
        try {
            await this.gradeTracker.addCourse(courseData)
            this.setState({
                courseId: '',
                courseTitle: '',
            }, () => this.setForm)
            courses.push(courseData)
            this.setState({ courses: courses })
        } catch (err) {
            alert("courseId should be a number")
        }

    }

    render() {
        const { courseId, courseTitle, courses } = this.state;
        return (
            <React.Fragment>
                
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        {/* <Label for="exampleEmail" className="mr-sm-2">Email</Label> */}
                        <Input type="text" value={courseId} onChange={(e) => this.setState({ courseId: e.target.value })} class="form-control" id="formGroupExampleInput" placeholder="CourseId" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        {/* <Label for="examplePassword" className="mr-sm-2">Password</Label> */}
                        <Input type="text" value={courseTitle} onChange={(e) => this.setState({ courseTitle: e.target.value })} class="form-control" id="formGroupExampleInput2" placeholder="Course Title" />
                    </FormGroup>
                    <Button type="submit" onClick={(e) => this.saveFrom(e)} className="btn btn-primary mt-2 mb-2" >Submit</Button>

                </Form>
                {courses.length > 0 &&
                    <div className="container">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th >Course Id</th>
                                    <th >Course Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (<tr>
                                    <td>{course.courseId}</td>
                                    <td>{course.courseTitle}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default AddCourse;