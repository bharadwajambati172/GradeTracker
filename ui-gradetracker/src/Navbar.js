import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AddCourse from './AddCourse';

export default class NavBar extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="/">GradeTracker</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Contacts </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/add-contact">Add Contact</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/del-contact">Delete Contact</a>
                            </li>
                        </ul>

                    </div>           */}
                    </nav>
                    <AddCourse/>
                </React.Fragment>
            </Router>
          
        )   
    }
}