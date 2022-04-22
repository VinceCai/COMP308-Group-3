import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class AddPage extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            patient: null,
            patient_name: '',
            nurse: null,
            nurse_name: '',

            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: '',
            errorMessage: ''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/users/'+this.props.match.params.patientId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    patient: res.data,
                    patient_name: res.data.fullName
                });
                return res.data;
            })
            .then(user => {
                return axios.get('http://localhost:5000/api/patients?patient='+user.id);
            })
            .then(res => {
                    console.log(res.data);
                    if (res.data.length === 0) {
                        this.setState({errorMessage: "you don't have any nurse as your first responder yet."});
                        return;
                    }
                    var patient = res.data[0];
                    this.setState({
                        nurse: patient.nurse,
                        nurse_name: patient.nurse.fullName
                    });
                    return patient;
            })
            .catch(function(err){
                console.log(err);
                //this.setState({errorMessage: err});
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            nurse:  this.state.nurse.id ,
            patient: this.state.patient.id,

            measured_time: this.state.measured_time,
            daily: localStorage.userRole === 'patient',
            body_temperature: this.state.body_temperature,
            heart_rate: this.state.heart_rate,
            respiratory_rate: this.state.respiratory_rate,
            high_blood_pressure: this.state.high_blood_pressure,
            low_blood_pressure: this.state.low_blood_pressure,
            weight: this.state.weight,
            read: localStorage.userRole === 'nurse'
        };

        axios.post('http://localhost:5000/api/vitalsigns/', 
                    currentUser
        )
        .then(res => {
            console.log(res.data);
            this.setState({errorMessage: "Add patient vital sign successfully"});
            this.props.history.push('/vital_list/'+localStorage.userId);
            //this.props.history.push('/vital_list/'+this.props.match.params.patientId);
            // this.props.history.push('/vital_list/'+this.state.nurse.id+'/'+this.state.patient.id);
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
                            <h3>Add Vital Sign</h3>
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
                                    <input type="date"
                                    className="form-control"
                                    name="measured_time"
                                    value={this.state.measured_time}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="body_temperature" className="labelRight">Body Temperature [35-45]:</label>
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
                                    <label htmlFor="heart_rate" className="labelRight">Heart Rate [60-100]:</label>
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
                                    <label htmlFor="respiratory_rate" className="labelRight">Respiratory Rate [10-30]:</label>
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
                                    <label htmlFor="high_blood_pressure" className="labelRight">High Blood Pressure [100-300]:</label>
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
                                    <label htmlFor="low_blood_pressure" className="labelRight">Low Blood Pressure [50-150]:</label>
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

                                <br />
                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Add
                            </button>
                            </form>
                        </div>

            </div>
        )
    }
}