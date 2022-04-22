import React, {Component} from 'react';
//import { Link } from 'react-router-dom';


class DisplayCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        //console.log("DisplayCourses");
        
    }
    

    render() {
        return (
            <div className="container">
                <div >
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Clinic and Patient System - Homepage</h1>
                    </div>
                    
                    <h2>Welcome to the Nurse and Patient System </h2>
                    <div>
                        <ul>
                            <li align="left" class="text-info">Weihao Cai</li>
                            <li align="left" class="text-info">Marisa D'Cruze</li>
                            <li align="left" class="text-info">Mohamed Shaheen Kaipally</li>
                            <li align="left" class="text-info">Isaac Kim</li>
                            <li align="left" class="text-info">Khanh Hung Phan</li>
                            <li align="left" class="text-info">Leshawn Phillips</li>

                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayCourses