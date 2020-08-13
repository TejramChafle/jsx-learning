import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Login from './pages/auth/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Student from './pages/students/student/Student';
import Students from './pages/students/Students';
import Exams from './pages/exams/Exams';
import Certificates from './pages/certificates/Certificates';
import Courses from './pages/courses/Courses';

import Header from './components/header/Header';
import Footer from './components/footer/footer';

class App extends Component {
  render() {

    let isLoggedIn = localStorage.getItem('auth');
    var routes;
    var template;

    routes = (
      <Switch>
        {/* { isLoggedIn && <Route path="/students" component={Student} /> }
        { isLoggedIn && <Route path="/dashboard" component={Dashboard} /> }
        { !isLoggedIn && <Route path="/login" component={Login} /> }
        { isLoggedIn ? <Redirect from="/login" to="/dashboard" /> : <Redirect from="/dashboard" to="/login" /> }
        { isLoggedIn ? <Route path="/" extact component={Dashboard} /> : <Route path="/" extact component={Login} /> } */}
      </Switch>
    );

    if (isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/students/student" component={Student} />
          <Route path="/students" component={Students}/>
          <Route path="/exams" component={Exams} />
          <Route path="/certificates" component={Certificates} />
          <Route path="/courses" component={Courses} />
          <Route path="/" extact component={Dashboard} />
          <Redirect from="/login" to="/dashboard" />
        </Switch>
      );

      template = (
        <div className="App">
          <Header {...this.props}/>
          <main>{routes}</main>
          <Footer />
        </div>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" extact component={Login} />
          <Redirect from="/dashboard" to="/login" />
        </Switch>
      )
      template = (
        <div className="App">
          {routes}
        </div>
      );
    }

    return (
      <React.Fragment>
        {template}
      </React.Fragment>
    )
  }
}

export default withRouter((App));
