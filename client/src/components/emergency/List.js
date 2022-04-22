import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmergencyAlert = props => (
    <tr>
        <td>{props.user.patient.fullName}</td>
        <td>{props.user.request_time}</td>
        <td>{props.user.nurse.fullName}</td>
        <td>{props.user.read? 'Yes': 'No'}</td>
        <td>{props.user.reply? 'Yes': 'No'}</td>
        <td>
             <Link to={"/emergency_details/"+props.user._id}>Details</Link>
        </td>
        <td>
             {localStorage.userRole === 'nurse' && <Link to={"/emergency_notes/"+props.user._id}>Reply</Link>}
        </td>
    </tr>
)

class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            errorMessage: ''
        };
        this.loadListData = this.loadListData.bind(this);
    }

    componentDidMount() {
        this.loadListData();
    }

    loadListData() {
        var url = 'http://localhost:5000/api/emergencyalerts?'+localStorage.userRole+'=' + this.props.match.params.userId;
        if (this.props.match.params.patientId) {
            url = url + '&patient=' + this.props.match.params.patientId;
        }
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({users: res.data});
            }).catch(function (error) {
                console.log(error);
            })
    }

    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <EmergencyAlert user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Emergency Alerts List</h1>
                    </div>
                    <div className="col-sm-8 mx-auto">
                    {localStorage.userRole === 'patient' && <Link to={"/emergency_add/"+this.props.match.params.userId}>Send an Emergency Alert</Link>}
                    </div>
                    { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                    <table className="table col-md-12 mx-auto">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Request Time</th>
                                <th>first responder</th>
                                <th>Nurse Checked</th>
                                <th>Nurse Replied</th>
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

export default ListPage