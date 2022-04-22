import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class EditUser extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            role: '',
            actived: false,
            errorMessage: ''
        };
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log("why");
        axios.get('http://localhost:5000/api/users/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email:res.data.email,
                    first_name:res.data.first_name,
                    last_name:res.data.last_name,
                    role: res.data.role,
                    actived: res.data.actived
                });
            })
            .catch(function(err){
                console.error(err);
                this.setState({errorMessage: err});
            });
    }

    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            email: this.state.email,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            role:this.state.role,
            actived: this.state.actived
        };

        axios.put('http://localhost:5000/api/users/' 
            + this.props.match.params.id, currentUser
        )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/displayUsers');
            });
            
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Modify Role</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>first Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.role}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Actived:</label>
                                    <label className="radio-inline">
                                    <input type="radio"
                                    name="actived"
                                    group="actived"
                                    value="1"
                                    checked={this.state.actived==true}
                                    onChange={this.onChange} />  Yes
                                    </label>
                                    <label className="radio-inline">
                                    <input type="radio"
                                    name="actived"
                                    group="actived"
                                    value="0"
                                    checked={this.state.actived==false}
                                    onChange={this.onChange} />  No
                                    </label>
                                </div>
                                <br />
                                { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Update users
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}