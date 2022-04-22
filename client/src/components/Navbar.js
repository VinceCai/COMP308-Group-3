import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout} from './UserFunctions';
import './Navbar.css';

class Navbar extends Component{
  constructor(){
    super();
    this.state = {
      menuItem:[
        {login:"Login"},
        {register: "Register"},
        {student: "Student"},
        {logout: "LogOut"},
        {home: "Home"},
        {userName:""}
      ]
    }
  }
  
  componentDidMount(){
    this.setState({ userName : localStorage.userName});
  }
    logOut(e) {
        e.preventDefault();
        logout().then(res => {
            if(res.error){
                console.log(res);
                this.setState({errorMessage: res.error});
            } else {
                this.props.history.push(`/`);
            }
        });
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav mr-auto" >
                <li className="nav-item" >
                    <Link to="/login" className="home-nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="home-nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );

        // menu at right top 
        const workingLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/profile" className="home-nav-link">
                    {localStorage.userName && <span>Hi {localStorage.userRole}: {localStorage.userName}</span> }
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" onClick={this.logOut.bind(this)} className="home-nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        );

        const adminLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/displayUsers" className="my-nav-link">
                        Users
                    </Link>
                </li>
            </ul>
        );
        const nurseLink = (
            <ul className="navbar-nav">
                
                <li className="nav-item">
                    <Link to="/noNursePatients" className="my-nav-link">
                        NoNursePatients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/myPatients" className="my-nav-link">
                        MyPatients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/emergency_list/"+localStorage.userId} className="my-nav-link">
                        Reply Emergency Alerts
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/vital_list/"+localStorage.userId} className="my-nav-link">
                        Review Patient Daily information
                    </Link>
                </li>
               
            </ul>
        );
        const patientLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/tips_list/"+localStorage.userId} className="my-nav-link">
                        My Daily Tips
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/emergency_list/"+localStorage.userId} className="my-nav-link">
                        My Emergency Alerts
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to={"/vital_list/"+localStorage.userId} className="my-nav-link">
                        My Health History
                    </Link>
                </li>
               
                <li className="nav-item">
                    <Link to="/ai_health" className="my-nav-link">
                    AI - health predict
                    </Link>
                </li>
                
            </ul>
        );
        return (
            <nav className="navbar navbar-dark navbar-expand bg-primary justify-content-between">
                
                <div className="d-flex flex-row bd-highlight mb-3 ustify-content-around" id="navbar1">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="home-nav-link">
                            Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.userToken && localStorage.userRole === 'nurse' ? nurseLink : null}
                    {localStorage.userToken && localStorage.userRole === 'patient' ? patientLink : null}
                    {localStorage.userToken && localStorage.userRole === 'admin'  ? adminLink : null}
                </div>
                <div className="d-flex flex-reverse bd-highlight mb-3 ustify-content-around" id="navbar2">
                    {localStorage.userToken ? workingLink : loginRegLink}
                </div>
            </nav>
            
        );
    }

}

export default withRouter(Navbar)
