import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class NotesPage extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/vitalsigns/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                var vital = res.data;
                this.setState({
                    nurse: vital.nurse,
                    patient: vital.patient,
                    nurse_name: vital.nurse.fullName,
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
            })
            .catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            nurse: this.state.nurse? this.state.nurse.id : null,
            patient: this.state.patient? this.state.patient.id : null,
            measured_time: this.state.measured_time,
            daily: this.state.daily,
            body_temperature: this.state.body_temperature,
            heart_rate: this.state.heart_rate,
            respiratory_rate: this.state.respiratory_rate,
            high_blood_pressure: this.state.high_blood_pressure,
            low_blood_pressure: this.state.low_blood_pressure,
            weight: this.state.weight,
            read: true,
            reply: this.state.reply,
            reply_time: new Date()
        };

        axios.put('http://localhost:5000/api/vitalsigns/'+this.props.match.params.id, 
                    currentUser
        )
        .then(res => {
            console.log(res.data);
            this.props.history.push('/vital_list/'+this.state.nurse.id+'/'+this.state.patient.id);
        }).catch(function(err){
            console.log(err);
            this.setState({errorMessage: err});
        });
            
    }

    render(){
        return (
            <div>
                <div className="container">
                            <br />
                            <h3>Add note to patient's daily information</h3>
                            <hr></hr>
                            <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col">
                                    <label className="labelRight">Patient:</label>
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
                                    <label htmlFor="measured_time" className="labelRight">Measured Time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.measured_time.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="body_temperature" className="labelRight">Body Temperature:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="body_temperature"
                                    placeholder="Enter Body Temperature"
                                    value={this.state.body_temperature}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="heart_rate" className="labelRight">Heart Rate:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="heart_rate"
                                    placeholder="Enter Heart Rate"
                                    value={this.state.heart_rate}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="respiratory_rate" className="labelRight">Respiratory Rate:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="respiratory_rate"
                                    placeholder="Enter respiratory rate"
                                    value={this.state.respiratory_rate}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="high_blood_pressure" className="labelRight">High Blood Pressure:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="high_blood_pressure"
                                    placeholder="Enter high Blood Pressure"
                                    value={this.state.high_blood_pressure}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="low_blood_pressure" className="labelRight">Low Blood Pressure:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="low_blood_pressure"
                                    placeholder="Enter low_blood_pressure"
                                    value={this.state.low_blood_pressure}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="weight" className="labelRight">Weight:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="weight"
                                    placeholder="Enter weight"
                                    value={this.state.weight}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="weight" className="labelRight">Nurse Notes:</label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea
                                    rows="5" 
                                    cols="80"
                                    className="form-control"
                                    name="reply"
                                    placeholder="Enter nurse notes "
                                    value={this.state.reply}
                                    onChange={this.onChange}/>
                                </div>
                            </div>

                                <br />
                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Save
                            </button>
                            </form>
                        </div>

            </div>
        )
    }
}