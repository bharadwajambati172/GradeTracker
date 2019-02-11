import axios from 'axios';
import handleError from './ErrorHandler';

import {
    API_ENDPOINT,
    CONTACTS_ENDPOINT,
    HEADERS
} from './Constants';

export default class GradeTracker {
 
  addCourse = async (params) => axios({
    method: 'post',
    headers: HEADERS(),
    data: params,
    url: `${API_ENDPOINT}${CONTACTS_ENDPOINT}courses`
  })
    .then(response => response.data)
    .catch(error => handleError(error))

    addStudentToCourse = async (params) => axios({
      method: 'delete',
      headers: HEADERS(),
      data: params,
      url: `${API_ENDPOINT}${CONTACTS_ENDPOINT}courses/${params.courseId}/students`
    })
      .then(response => response.data)
      .catch(error => handleError(error))
}