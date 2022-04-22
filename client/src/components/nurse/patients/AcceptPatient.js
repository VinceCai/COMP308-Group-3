import React, {Component} from 'react';
import axios from 'axios';
import '../../Register.css';

export default class AcceptPatient extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            patient_id: '',
            email: '',
            first_name: '',
            last_name: '',
            nurse: '',
            health_card_number: '',
            current_nurse: localStorage.userName,
            errorMessage: ''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/patients?patient='+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                if (res.data.length > 0 ) {
                    var patient = res.data[0];
                    this.setState({
                        patient_id: patient.id,
                        email: patient.patient.email,
                        first_name: patient.patient.first_name,
                        last_name: patient.patient.last_name,
                        health_card_number: patient.health_card_number,
                        nurse: patient.nurse ? patient.nurse.fullName : null
                    });
                } else {
                    axios.get('http://localhost:5000/api/users/'+this.props.match.params.id)
                    .then(res => {
                        var user = res.data;
                        this.setState({
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            nurse: '',
                            health_card_number: ''
                        });
                    })
                }
                
            })
            .catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            patient: this.props.match.params.id,
            nurse: localStorage.userId,
            health_card_number: this.state.health_card_number
        };
        if (this.state.patient_id) {
            axios.put('http://localhost:5000/api/patients/'+this.state.patient_id, currentUser
            )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/NoNursePatients');
            }).catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            });

        } else {
            axios.post('http://localhost:5000/api/patients', currentUser
            )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/noNursePatients');
            }).catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            });
            
        }

    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Accept Patient</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>first Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        name="first_name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>health Card Number:</label>
                                    <input type="text"
                                        className="form-control"
                                       
                                        name="healthcard_number"
                                        value={this.state.health_card_number}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nurse:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.nurse}
                                        disabled="disabled"
                                        onChange={this.onChange}
                                    /> <span>{this.state.currentNurse}</span> 
                                </div>
                                <br />
                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Accept
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}