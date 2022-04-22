import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const VitalSign = props => (
    <tr>
        <td>{props.user.patient.fullName}</td>
        <td>{props.user.measured_time.substring(0, 10)}</td>
        <td>{props.user.daily? 'Daily info' : 'Clinical visit'}</td>
        <td>{props.user.read? 'Yes': 'No'}</td>
        <td>{props.user.reply? 'Yes': 'No'}</td>
        <td>
             <Link to={"/vital_details/"+props.user._id}>Details</Link>
        </td>
        <td>
             {localStorage.userRole === 'nurse' && <Link to={"/vital_notes/"+props.user._id}>Add Notes</Link>}
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
        var url = 'http://localhost:5000/api/vitalsigns?'+localStorage.userRole+'=' + this.props.match.params.userId;
        if (this.props.match.params.patientId) {
            url = url + '&patient=' + this.props.match.params.patientId;
        } else if(localStorage.userRole === 'nurse') {
            url = url + '&daily=true';
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
            return <VitalSign user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <table  className="table col-md-6 mx-auto">
                    {localStorage.userRole === 'patient' &&<tr> 
                            <td><a href={"/vital_add/"+localStorage.userId} className="Link"><span>Add daily information</span></a></td>
                            <td><a href="/template" className="Link"><span>Show diagrams</span></a></td>
                        </tr>}
                        <tr>
                            <td clospan="2">
                                <div>
                                    <h2 className="text-center">Patient Health History</h2>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className="col-sm-8 mx-auto">
        {this.props.match.params.patientId && <Link to={"/vital_add/"+this.props.match.params.patientId}>Enter Vital Signs</Link> }
                    </div>
                    { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                    <table className="table col-md-12 mx-auto width">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Measured Date</th>
                                <th>Measured method</th>
                                <th>Read by Nurse</th>
                                <th>Notes from Nurse</th>
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