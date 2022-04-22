import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.patient.email}</td>
        <td>{props.user.patient.first_name}</td>
        <td>{props.user.patient.last_name}</td>
        <td>{props.user.healthcard_number}</td>
        <td>{props.user.nurse.fullName}</td>
        <td>
             <Link to={"/vital_list/"+props.user.nurse.id+"/"+props.user.patient.id}>Health History</Link>
        </td><td>
             <Link to={"/emergency_list/"+props.user.nurse.id+"/"+props.user.patient.id}>Emergency Alert</Link>
             </td><td>
             <Link to={"/tips_list/"+props.user.patient.id}>Daily tips</Link>
        </td><td>
             <Link to={"/dropPatient/"+props.user._id}>Drop</Link> 
        </td>
    </tr>
)

class MyPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        console.log("DisplayUsers");
        axios.get('http://localhost:5000/api/patients?nurse=' + localStorage.userId)
            .then(res => {
                console.log(res.data);
                this.setState({users: res.data});
            }).catch(function (error) {
                console.log(error);
            })
    }
    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">My Patients</h1>
                    </div>
                    <table className="table col-md-12 mx-auto">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Health Card</th>
                                <th>Nurse</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.userList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyPatients