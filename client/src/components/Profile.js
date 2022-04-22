import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            first_name:'',
            last_name:'',
            address:'',
            city:'',
            phone_number:'',
            birth_date: '',
            actived: false,
            role: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        const email = localStorage.userEmail;
        axios.get('http://localhost:5000/api/users/' + email )
            .then(res => {
                console.log(res.data);
                var user = res.data;
                this.setState({
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    address: user.address,
                    city: user.city,
                    phone_number: user.phone_number,
                    birth_date: user.birth_date,
                    role: user.role
                });
            }).catch(err => {
                console.error("got Error when fetch profile: " + err);
                this.setState({errorMessage: err});
            });
        
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <label>Email:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>First Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Last Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Address:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>City:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>Phone Number:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Date Birth:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Role:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Actived:</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{this.state.email}</td>
                                <td>{this.state.first_name}</td>
                                <td>{this.state.last_name}</td>
                                <td>{this.state.address}</td>
                                <td>{this.state.city}</td>
                                <td>{this.state.phone_number}</td>
                                <td>{this.state.birth_date.substring(0, 10)}</td>
                                <td>{this.state.role}</td>
                                <td>{this.state.actived ? 'Yes': 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile