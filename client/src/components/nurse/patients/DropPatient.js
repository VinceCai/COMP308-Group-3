import React, {Component} from 'react';
import axios from 'axios';
import '../../Register.css';

export default class dropPatient extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            nurse: '',
            healthcard_number: '',
            errorMessage: ''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/patients/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email:res.data.patient.email,
                    first_name:res.data.patient.first_name,
                    last_name:res.data.patient.last_name,
                    nurse: res.data.nurse.fullName,
                    healthcard_number: res.data.healthcard_number
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
            nurse: null,
            healthcard_number: this.state.healthcard_number
        };

        axios.put('http://localhost:5000/api/patients/'+this.props.match.params.id, currentUser
        )
        .then(res => {
            console.log(res.data);
            this.props.history.push('/myPatients');
        }).catch(function(err){
            console.log(err);
            this.setState({errorMessage: err});
        });
            
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Drop Patient From My Patient List</h3>
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
                                    <label>Last Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        name="healthcard_number"
                                        value={this.state.healthcard_number}
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
                                    /> <span> => null </span> 
                                </div>
                                <br />
                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Drop
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}