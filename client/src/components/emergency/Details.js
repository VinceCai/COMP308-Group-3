import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Register.css';

export default class DetailsPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            patient: null,
            patient_name: '',
            nurse: null,
            nurse_name: '',

            request_time: '',
            request_desc: '',
            common_symptoms: '',
            read: false,
            reply: false,
            reply_time: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/emergencyalerts/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                var emergency = res.data;
                this.setState({
                    nurse: emergency.nurse,
                    nurse_name: emergency.nurse? emergency.nurse.fullName : '',
                    patient: emergency.patient,
                    patient_name: emergency.patient.fullName,

                    request_time: emergency.request_time,
                    request_desc: emergency.request_desc,
                    common_symptoms: emergency.common_symptoms,
                    read: emergency.read,
                    reply: emergency.reply,
                    reply_time: emergency.reply_time
                });
                return emergency;
            })
            .then(emergency => {
                if (localStorage.userRole === 'nurse' && !emergency.read) {
                    emergency.read = true;
                    axios.put('http://localhost:5000/api/emergencyalerts/'+this.props.match.params.id,
                        emergency
                    );
                }
            })
            .catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            })
    }
    

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Patient Emergency Alert Details</h3>
                            <hr></hr>
                            <form className="form-horizontal" noValidate >
                            <div className="row">
                                <div className="col">
                                    <label className="labelRight">Patient</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.patient_name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">firt responder:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.nurse_name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Request Time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.request_time}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">patient comments:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.request_desc}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">common symptoms:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.common_symptoms}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Nurse Checked:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.read? 'Yes' : 'No'}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">reply_time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.reply_time}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Nurse reply:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.reply}</label>
                                </div>
                            </div>

                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                            <br />
                            {localStorage.userRole === 'nurse' && <Link to={"/emergency_notes/"+this.props.match.params.id}>Reply</Link>}
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}