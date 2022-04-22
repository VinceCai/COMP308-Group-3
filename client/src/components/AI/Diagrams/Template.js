import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import './Style.css';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import BodyTemperature from "./BodyTemperature";
import Respiratory from "./Respiratory";
import HeartRate from "./HeartRate";
import BloodPressure from "./BloodPressure";
import Weight from "./Weight";

class Template extends Component {
  
  render() {    
    return (
		<div>
			<BrowserRouter>		  
				<Row>
					<Nav to="/bodyTemperature" className="flex-sm-column double-top-space" id="sidebar">
						<ListGroup className="nav nav-sidebar flex-sm-column">
							<ListGroup.Item>
								<a href={"/vital_list/"+localStorage.userId} data-toggle="open" aria-expanded="false" className="dropdown-toggle"><span>Health History</span></a>
							</ListGroup.Item>
							<ListGroup>
								<ListGroup className="sub-menu open" id="lineCharts">
									<ListGroup.Item> <NavLink to="/bodyTemperature">Body Temperature</NavLink></ListGroup.Item>
									<ListGroup.Item> <NavLink to="/heartRate">Heart Rate</NavLink></ListGroup.Item>									
									<ListGroup.Item> <NavLink to="/respiratory">Respiratory</NavLink></ListGroup.Item>
									<ListGroup.Item> <NavLink to="/bloodPressure">Blood Pressure</NavLink></ListGroup.Item>
									<ListGroup.Item> <NavLink to="/weight">Weight</NavLink></ListGroup.Item>
								</ListGroup>
							</ListGroup>
						</ListGroup>
					</Nav>
					
					<Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
						<Container>
							<div className="content top-space">
								<Route path="/bodyTemperature" component={BodyTemperature}/>
								<Route path="/heartRate" component={HeartRate}/>
								<Route path="/respiratory" component={Respiratory}/>
								<Route path="/bloodPressure" component={BloodPressure}/>
								<Route path="/weight" component={Weight}/>
							</div>
						</Container>
					</Col>					
				</Row>			
			</BrowserRouter>	
		</div>
    );
  }
}

export default Template;