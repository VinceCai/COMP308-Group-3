import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import DisplayUsers from './components/users/DisplayUsers';//admin components
import EditUser from './components/users/EditUser';
import DeleteUser from './components/users/DeleteUser';

import AcceptPatient from './components/nurse/patients/AcceptPatient';//nurse components
import DropPatient from './components/nurse/patients/DropPatient';//nurse components
import MyPatients from './components/nurse/patients/MyPatients';//nurse components
import NoNursePatients from './components/nurse/patients/NoNursePatients';//nurse components

import VitalList from './components/vital/List';
import VitalAdd from './components/vital/Add';
import VitalDetails from './components/vital/Details';
import VitalNotes from './components/vital/Notes';

import EmergencyList from './components/emergency/List';
import EmergencyAdd from './components/emergency/Add';
import EmergencyDetails from './components/emergency/Details';
import EmergencyNotes from './components/emergency/Notes';

import DailyTipsList from './components/dailytips/List';
import DailyTipsAdd from './components/dailytips/Add';
import DailyTipsDetails from './components/dailytips/Details';



import AiHealth from './components/AI/Health/AiHealth';
import Predict from './components/AI/Health/predict';

import Template from './components/AI/Diagrams/Template';
import BodyTemperature from './components/AI/Diagrams/BodyTemperature';
import BloodPressure from './components/AI/Diagrams/BloodPressure';
import HeartRate from './components/AI/Diagrams/HeartRate';
import Respiratory from './components/AI/Diagrams/Respiratory';
import Weight from './components/AI/Diagrams/Weight';




class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            
            <Route exact path="/displayUsers" component={DisplayUsers} />
            <Route exact path="/editUser/:id" component={EditUser} />
            <Route exact path="/deleteUser/:id" component={DeleteUser} />

            <Route exact path="/noNursePatients" component={NoNursePatients} />
            <Route exact path="/myPatients" component={MyPatients} />
            <Route exact path="/acceptPatient/:id" component={AcceptPatient} />
            <Route exact path="/dropPatient/:id" component={DropPatient} />

            <Route exact path="/vital_list/:userId/:patientId?" component={VitalList} />
            <Route exact path="/vital_add/:patientId" component={VitalAdd} />
            <Route exact path="/vital_details/:id" component={VitalDetails} />
            <Route exact path="/vital_notes/:id" component={VitalNotes} />

            <Route exact path="/emergency_list/:userId/:patientId?" component={EmergencyList} />
            <Route exact path="/emergency_add/:patientId" component={EmergencyAdd} />
            <Route exact path="/emergency_details/:id" component={EmergencyDetails} />
            <Route exact path="/emergency_notes/:id" component={EmergencyNotes} />

            <Route exact path="/tips_list/:patientId" component={DailyTipsList} />
            <Route exact path="/tips_add/:patientId" component={DailyTipsAdd} />
            <Route exact path="/tips_details/:id" component={DailyTipsDetails} />
           

            <Route exact path="/template/" component={Template} />
            <Route exact path="/bodyTemperature/" component={BodyTemperature} />
            <Route exact path="/bloodPressure/" component={BloodPressure} />
            <Route exact path="/heartRate/" component={HeartRate} />
            <Route exact path="/respiratory/" component={Respiratory} />
            <Route exact path="/weight/" component={Weight} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
