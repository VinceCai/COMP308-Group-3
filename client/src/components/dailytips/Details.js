import React, {Component} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../Register.css';

export default class DetailsPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            patient: null,
            patient_name: '',
            nurse: null,
            nurse_name: '',

            title: '',
            content: '',
            video_url: '',
            start_date: '',
            end_date: '',
            post_time: '',
            errorMessage: '',

            video_id: '',
            opts: {
                height: '390',
                width: '640',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                },
              }
        }
        this.onDelete = this.onDelete.bind(this);
        this._onReady = this._onReady.bind(this);
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/api/dailytips/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                var dailytips = res.data;
                var video_arr = dailytips.video_url.split('=');
                this.setState({
                    nurse: dailytips.nurse,
                    nurse_name: dailytips.nurse? dailytips.nurse.fullName : '',
                    patient: dailytips.patient,
                    patient_name: dailytips.patient.fullName,

                    title: dailytips.title,
                    content: dailytips.content,
                    video_url: dailytips.video_url,
                    video_id: video_arr[video_arr.length-1],
                    start_date: dailytips.start_date,
                    end_date: dailytips.end_date,
                    post_time: dailytips.post_time
                });

                
                return dailytips;
            })
            .catch(function(err){
                console.log(err);
                this.setState({errorMessage: err});
            });
    }

    onDelete(e) {
        e.preventDefault();
        console.log("come to delete ");
        if (window.confirm("are you sure want to delete this daily tips?")) {
            axios.delete('http://localhost:5000/api/dailytips/'+this.props.match.params.id)
            .then(() => {
                this.props.history.push('/tips_list/'+this.state.patient.id);
            })
            .catch(function(err){
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
                            <h3>Patient Daily Tips Details</h3>
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
                                    <label  className="labelRight">first responder:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.nurse_name}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Post Time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.post_time}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">start date:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.start_date.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">end date:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.end_date.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Daily Tips:</label>
                                </div>
                                <div className="col-sm-8">
                                <label>{this.state.title}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Nurse Comments:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label>{this.state.content}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  className="labelRight">Motivational Video:</label>
                                </div>
                                <div className="col-sm-8">
                                    <label><a href={this.state.video_url} target="video">{this.state.video_url} </a></label>
                                    <YouTube videoId={this.state.video_id} opts={this.state.opts} onReady={this._onReady} />
                                </div>
                            </div>

                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                            <br />
                           {localStorage.userRole === 'nurse' &&  <button onClick={this.onDelete}>Delete</button>}
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}