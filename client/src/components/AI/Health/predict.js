import React, {Component} from 'react';
import axios from 'axios';
//import './Predict.css';

export default class Predict extends Component {

    constructor(props){
        super(props);
        this.onChangeSepal_length = this.onChangeSepal_length.bind(this);
        this.onChangeSepal_width = this.onChangeSepal_width.bind(this);
        this.onChangePetal_length = this.onChangePetal_length.bind(this);
        this.onChangePetal_width = this.onChangePetal_width.bind(this);
        this.onChangeCategory=this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            body_temperature: '37.2',
            heart_rate: '60',
            respiratory_rate: '14',
            high_blood_pressure:'120',
            category: 'dont know'
        }
    }

    componentDidMount() {
    }

    onSubmit(e) {
        e.preventDefault();

        const cf= {
            body_temperature:this.state.body_temperature,
            heart_rate:this.state.heart_rate,
            respiratory_rate:this.state.respiratory_rate,
            high_blood_pressure:this.state.high_blood_pressure,
        };
        const queryParams = `?body_temperature=${cf.body_temperature}`
            + `&heart_rate=${cf.heart_rate}`
            + `&respiratory_rate=${cf.respiratory_rate}`
            + `&high_blood_pressure=${cf.high_blood_pressure}`
        console.log(cf);
        axios.get('http://localhost:5000/api/predict' + queryParams
        )
            .then(res => {
                console.log(res.data);
                this.setState({
                    category:res.data
                });
            });
            
    }

    onChangeSepal_length(e) {
        this.setState({
            body_temperature:e.target.value
        });
    }
    onChangeSepal_width(e) {
        this.setState({
            heart_rate:e.target.value
        });
    }
    onChangePetal_length(e) {
        this.setState({
            respiratory_rate:e.target.value
        });
    }
    onChangePetal_width(e) {
        this.setState({
            high_blood_pressure:e.target.value
        });
    }
    onChangeCategory(e) {
        this.setState({
            category:e.target.value
        })
    }
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>AI Game - predict your health risk in the future (still testing and improving) </h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Body Temperature:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="30.0"
                                        max="50.0"
                                        value={this.state.body_temperature}
                                        onChange={this.onChangeSepal_length}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Heart Rate:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="1.0"
                                        max="100.0"
                                        value={this.state.heart_rate}
                                        onChange={this.onChangeSepal_width}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Respiratory Rate:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="10.0"
                                        max="20.0"
                                        value={this.state.respiratory_rate}
                                        onChange={this.onChangePetal_length}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>High Blood Pressure:</label>
                                    <input type="float"
                                        className="form-control"
                                        min="60.0"
                                        max="300.0"
                                        value={this.state.high_blood_pressure}
                                        onChange={this.onChangePetal_width}
                                    />
                                </div>
                                
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Query
                            </button>
                            </form>
                            <div className="form-group">
                                <br />
                                    <label>Health Risk: (Heart disease, Hypertension, Diabetes)</label>
                                    <input type="text"
                                        className="form-control"
                                        min="1.0"
                                        max="10.0"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                    />
                                </div>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}