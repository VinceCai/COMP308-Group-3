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
            measured_time: '',
            daily: false,

            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: '',
            read: true,
            reply: '',
            reply_time: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/vitalsigns/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                var vital = res.data;
                this.setState({
                    nurse: vital.nurse,
                    nurse_name: vital.nurse? vital.nurse.fullName : '',
                    patient: vital.patient,
                    patient_name: vital.patient.fullName,


                    measured_time: vital.measured_time,
                    daily: vital.daily,
                    body_temperature: vital.body_temperature,
                    heart_rate: vital.heart_rate,
                    respiratory_rate: vital.respiratory_rate,
                    high_blood_pressure: vital.high_blood_pressure,
                    low_blood_pressure: vital.low_blood_pressure,
                    weight: vital.weight,
                    read: vital.read,
                    reply: vital.reply,
                    reply_time: vital.reply_time
                });
                return vital;
            })
            .then(vital => {
                if (localStorage.userRole === 'nurse' && !vital.read) {
                    vital.read = true;
                    axios.put('http://localhost:5000/api/vitalsigns/'+this.props.match.params.id,
                        vital
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
                            <h3>Patient Vital Sign Details</h3>
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
                                    <label  className="labelRight">Measured Method:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.daily? 'Daily information' : 'Clinical visit'}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">first responder:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.nurse_name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Measured Time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.measured_time.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">body_temperature:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.body_temperature}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">heart_rate:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.heart_rate}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">respiratory_rate:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.respiratory_rate}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">high blood pressure:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.high_blood_pressure}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">low blood pressure:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.low_blood_pressure}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">weight:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.weight}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Readed by Nurse:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.read ? 'Yes': 'No'}</label>
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
                            {localStorage.userRole === 'nurse' && <Link to={"/vital_notes/"+this.props.match.params.id}>Reply</Link> }
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}