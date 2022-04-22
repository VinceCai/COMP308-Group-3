import React from 'react';
import {register} from './UserFunctions';
import './Register.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            password:'',
            first_name:'',
            last_name:'',
            address:'',
            city:'',
            phone_number:'',
            email:'',
            birth_date: '',
            role: 'patient',
            health_card_number: '',
            license_number: '',
            errorMessage: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            password:this.state.password,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            address:this.state.address,
            city:this.state.city,
            phone_number: this.state.phone_number,
            email: this.state.email,
            birth_date: this.state.birth_date,
            health_card_number: this.state.health_card_number,
            license_number:this.state.license_number,
            role: this.state.role
        };
        register(newUser).then(res => {
                if(res.error){
                    console.log(res);
                    this.setState({errorMessage: res.error});
                }
                else {
                    this.props.history.push(`/login`);
                }
        });
    }

    render() {
        return (
            <div className="container">

                        <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                            <h3 className="h3 mb-3 font-weight-normal">Please Sign Up</h3>
                            
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="email" className="labelRight">Email Address:</label>
                                </div>
                                <div className="col-8">
                                    <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="password" className="labelRight">Password:</label>
                                </div>
                                <div className="col-8">
                                    <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="first_name" className="labelRight">First Name:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="first_name" className="labelRight">Last Name:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="address" className="labelRight">Address:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="city" className="labelRight">City:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="city"
                                    placeholder="Enter City Name"
                                    value={this.state.city}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="phone_number" className="labelRight">Phone Number:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="phone_number"
                                    placeholder="Enter phone Number"
                                    value={this.state.phone_number}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="birth_date" className="labelRight">Date of Birth:</label>
                                </div>
                                <div className="col-8">
                                    <input type="date"
                                    className="form-control"
                                    name="birth_date"
                                    value={this.state.birth_date} 
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="role" className="labelRight">User Role:</label>
                                </div>
                                <div className="col-8">
                                <label className="radio-inline">
                                    <input type="radio"
                                    name="role"
                                    group="role"
                                    value="patient"
                                    checked={this.state.role === "patient"}
                                    onChange={this.onChange} />  Patient
                                    </label>
                                    <label className="radio-inline">
                                    <input type="radio"
                                    name="role"
                                    group="role"
                                    value="nurse"
                                    checked={this.state.role === "nurse"}
                                    onChange={this.onChange} />  Nurse
                                    </label>
                                </div>
                            </div>
                            {this.state.role === 'patient' ? 
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="health_card_number" className="labelRight">Health Card Number:</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="number"
                                        className="form-control"
                                        name="health_card_number"
                                        value={this.state.health_card_number} 
                                        onChange={this.onChange}/>
                                    </div>
                                </div>
                            : null}
                            {this.state.role === 'nurse' ? 
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="license_number" className="labelRight">License Number:</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="number"
                                        className="form-control"
                                        name="license_number"
                                        value={this.state.license_number} 
                                        onChange={this.onChange}/>
                                    </div>
                                </div>
                            : null}
                            { this.state.errorMessage && 
                            <h3 className="text-danger"> { this.state.errorMessage } </h3> }
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
        )
    }

}
export default Register
