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
            nurse_name: localStorage.userName,

            title: '',
            content: '',
            video_url: '',
            start_date: '',
            end_date: '',
            post_time: '',
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
            .catch(function(err){
                console.error(err);
                this.setState({errorMessage: err});
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            nurse:  localStorage.userId ,
            patient: this.state.patient.id ,

            title: this.state.title,
            content: this.state.content,
            video_url: this.state.video_url,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            post_time: new Date()

        };

        axios.post('http://localhost:5000/api/dailytips/', 
                    currentUser
        )
        .then(res => {
            console.log(res.data);
            this.props.history.push('/tips_list/'+this.state.patient.id);
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
                            <h3>Add Daily Tips</h3>
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
                                    <label htmlFor="title" className="labelRight">Tips Title:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="start_date" className="labelRight">Start Date:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="date"
                                    className="form-control"
                                    name="start_date"
                                    value={this.state.start_date}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="end_date" className="labelRight">End Date:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="date"
                                    className="form-control"
                                    name="end_date"
                                    value={this.state.end_date}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="content" className="labelRight">Nurse Comments:</label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea
                                    rows="5"
                                    cols="80"
                                    className="form-control"
                                    name="content"
                                    placeholder="Enter your comments for the patient"
                                    value={this.state.content}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="video_url" className="labelRight">motivational video url:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="video_url"
                                    placeholder="Enter a motivational video url from youtube"
                                    value={this.state.video_url}
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