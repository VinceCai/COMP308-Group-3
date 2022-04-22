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

            request_time: '',
            request_desc: '',
            common_symptoms: '',
            read: false,
            reply: '',
            reply_time: '',
            errorMessage: ''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/emergencyalerts/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                var emergency = res.data;
                this.setState({
                    nurse: emergency.nurse,
                    patient: emergency.patient,
                    nurse_name: emergency.nurse.fullName,
                    patient_name: emergency.patient.fullName,

                    request_time: emergency.request_time,
                    request_desc: emergency.request_desc,
                    common_symptoms: emergency.common_symptoms,
                    read: emergency.common_symptoms,
                    reply: emergency.reply,
                    reply_time: emergency.reply_time
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
            nurse:  this.state.nurse.id ,
            patient: this.state.patient.id ,

            common_symptoms: this.state.common_symptoms,
            request_desc: this.state.request_desc,
            request_time: this.state.request_time,
            read: true,
            reply: this.state.reply,
            reply_time: new Date()
        };

        axios.put('http://localhost:5000/api/emergencyalerts/'+this.props.match.params.id, 
                    currentUser
        )
        .then(res => {
            console.log(res.data);
            this.props.history.push('/emergency_list/'+this.state.nurse.id+'/'+this.state.patient.id);
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