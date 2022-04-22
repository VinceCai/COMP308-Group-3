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

            request_time: '',
            request_desc: '',
            common_symptoms: '',
            read: false,
            reply: false,
            reply_time: '',
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
                var user = res.data;
                this.setState({
                    patient: user,
                    patient_name: user.fullName
                });
                return user;
            })
            .then(user => {
                return axios.get('http://localhost:5000/api/patients?patient='+this.props.match.params.patientId);
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
                console.error(err);
                //this.setState({errorMessage: err});
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            nurse:  this.state.nurse.id ,
            patient: this.state.patient.id ,

            common_symptoms: this.state.common_symptoms,
            request_desc: this.state.request_desc,
            request_time: new Date()
        };

        axios.post('http://localhost:5000/api/emergencyalerts/', 
                    currentUser
        )
        .then(res => {
            console.log(res.data);
            this.props.history.push('/emergency_list/'+this.props.match.params.patientId);
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
                            <h3>Add Emergency Alert</h3>
                            <hr></hr>
                            <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
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
                                    <label  className="labelRight">first responder:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.nurse_name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="request_desc" className="labelRight">Patient Comments:</label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea
                                    rows="5"
                                    cols="80"
                                    className="form-control"
                                    name="request_desc"
                                    placeholder="Enter your request reason and any comments"
                                    value={this.state.request_desc}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="common_symptoms" className="labelRight">common symptoms:</label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea
                                    rows="5"
                                    cols="80"
                                    className="form-control"
                                    name="common_symptoms"
                                    placeholder="Enter common symptoms"
                                    value={this.state.common_symptoms}
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