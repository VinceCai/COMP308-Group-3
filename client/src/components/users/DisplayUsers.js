import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.email}</td>
        <td>{props.user.first_name}</td>
        <td>{props.user.last_name}</td>
        <td>{props.user.role}</td>
        <td>
             <Link to={"/editUser/"+props.user._id}>Edit</Link> 
        </td>
        <td>
            <Link to={"/deleteUser/"+props.user._id}>Delete</Link> 
        </td>
    </tr>
)

class DisplayUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        console.log("DisplayUsers");
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                console.log(res.data);
                this.setState({users: res.data});
            }).catch(function (error) {
                console.log(error);
            });
    }
    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">User Account Management</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Actived</th>
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

export default DisplayUsers