import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DailyTips = props => (
    <tr>
        <td>{props.user.patient.fullName}</td>
        <td>{props.user.nurse.fullName}</td>
        <td>{props.user.start_date.substring(0, 10)}</td>
        <td>{props.user.end_date.substring(0, 10)}</td>
        <td>{props.user.title}</td>
        <td>
             <Link to={"/tips_details/"+props.user._id}>Details</Link>
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
        var url = 'http://localhost:5000/api/dailytips?patient=' + this.props.match.params.patientId;
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
            return <DailyTips user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Patient's Daily Movtivational tips </h1>
                    </div>
                    <div className="col-sm-8 mx-auto">
                    {localStorage.userRole === 'nurse' && <Link to={"/tips_add/"+this.props.match.params.patientId}>Send a Daily Tips</Link>}
                    </div>
                    { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                    <table className="table col-md-12 mx-auto">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>first responder</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Daily Tips</th>
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