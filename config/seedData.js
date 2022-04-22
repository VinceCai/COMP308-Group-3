const mongoose = require('mongoose');
const User = mongoose.model('User');
const Patient = mongoose.model('Patient');
const Nurse = mongoose.model('Nurse');
const Symptom = mongoose.model('Symptom');

module.exports = function () {
    console.log("check and setup the inital seed data");
    // check and insert the admin, default nurse and patient user account
    User.find({}, function (err, users) {
        if (err) {
            console.error("got error when query user " + err );
            return;
        }
        if (users.length > 0) {
            console.log("skip to insert seed data as we already have user account in database.");
            return;
        }
        // insert default admin user account
        var user = new User({
            "email": "admin@test.com",
            "password": "qwertyu",
            "first_name": "Zhaobin",
            "last_name": "Bu",
            "address": "888 test St",
            "city": "Toronto",
            "phone_number": "808-888-1234",
            "birth_date": "1980-01-01",
            "role": "admin",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
            }
        });
        // insert default nurse user account
        user = new User({
            "email": "nurse@test.com",
            "password": "qwertyu",
            "first_name": "Agenla",
            "last_name": "Wu",
            "address": "111 test St",
            "city": "Toronto",
            "phone_number": "647-888-8881",
            "birth_date": "1990-01-01",
            "role": "nurse",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
                User.findOne({
                    email: "nurse@test.com"
                }).then(found =>{
                    var nurse = new Nurse({
                        "nurse":found._id,
                        "license_number":"543210001"
                    });
                    nurse.save(function (err) {
                        if (err) {
                            console.error("got error when insert nurse account " + err );
                        } else {
                            console.log("succeed to insert a nurse account: "+nurse._id+" on "+ found._id);
                        }
                    });
                });
            }
        });
        // insert default nurse user account
        user = new User({
            "email": "nurse2@test.com",
            "password": "qwertyu",
            "first_name": "Grace",
            "last_name": "Qu",
            "address": "112 test St",
            "city": "Toronto",
            "phone_number": "647-888-8882",
            "birth_date": "1991-05-05",
            "role": "nurse",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
                User.findOne({
                    email: "nurse2@test.com"
                }).then(found =>{
                    var nurse = new Nurse({
                        "nurse":found._id,
                        "license_number":"543210002"
                    });
                    nurse.save(function (err) {
                        if (err) {
                            console.error("got error when insert nurse account " + err );
                        } else {
                            console.log("succeed to insert a nurse account: "+nurse._id+" on "+ found._id);
                        }
                    });
                });
            }
        });

        // insert default patient user account
        user = new User({
            "email": "p001@test.com",
            "password": "qwertyu",
            "first_name": "Kathy",
            "last_name": "Chen",
            "address": "101 test St",
            "city": "Toronto",
            "phone_number": "647-111-1001",
            "birth_date": "2000-01-01",
            "role": "patient",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
                User.findOne({
                    email: "p001@test.com"
                }).then(found =>{
                    var patient = new Patient({
                        "patient":found._id,
                        "health_card_number":"123450001"
                    });
                    patient.save(function (err) {
                        if (err) {
                            console.error("got error when insert patient account " + err );
                        } else {
                            console.log("succeed to insert a user account: "+patient._id+" on "+ found._id);
                        }
                    });
                });
            }
        });
        // insert default patient user account
        user = new User({
            "email": "p002@test.com",
            "password": "qwertyu",
            "first_name": "Tina",
            "last_name": "Li",
            "address": "102 test St",
            "city": "Toronto",
            "phone_number": "647-111-1002",
            "birth_date": "1950-01-01",
            "role": "patient",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
                User.findOne({
                    email: "p002@test.com"
                }).then(found =>{
                    var patient = new Patient({
                        "patient":found._id,
                        "health_card_number":"123450002"
                    });
                    patient.save(function (err) {
                        if (err) {
                            console.error("got error when insert patient account " + err );
                        } else {
                            console.log("succeed to insert a user account: "+patient._id+" on "+ found._id);
                        }
                    });
                });
            }
        });
        // insert default patient user account
        user = new User({
            "email": "p003@test.com",
            "password": "qwertyu",
            "first_name": "Vivian",
            "last_name": "Wang",
            "address": "103 test St",
            "city": "Toronto",
            "phone_number": "647-111-1003",
            "birth_date": "1930-01-01",
            "role": "patient",
            "actived": true
        });
        user.save(function (err) {
            if (err) {
                console.error("got error when insert user account " + err );
            } else {
                console.log("succeed to insert a user account: "+user._id+" on "+ user.email);
                User.findOne({
                    email: "p003@test.com"
                }).then(found =>{
                    var patient = new Patient({
                        "patient":found._id,
                        "health_card_number":"123450003"
                    });
                    patient.save(function (err) {
                        if (err) {
                            console.error("got error when insert patient account " + err );
                        } else {
                            console.log("succeed to insert a user account: "+patient._id+" on "+ found._id);
                        }
                    });
                });
            }
        });
    });


    Symptom.find({}, function (err, symptoms) {
        if (err) {
            console.error("got error when query symptom " + err );
            return;
        }
        if (symptoms.length > 0) {
            console.log("skip to insert seed data as we already have symptoms  in database.");
            return;
        }
        // insert fever symptom 
        var symptom = new Symptom({
            "symptom_title": "Fever",
            "symptom_desc": " Temperature above 38 C",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });

        // insert cough symptom 
        symptom = new Symptom({
            "symptom_title": "Cough",
            "symptom_desc": " A cough is a forceful release of air from the lungs that can be heard.",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });

        // insert Shortness of breath symptom 
        symptom = new Symptom({
            "symptom_title": "Shortness of breath",
            "symptom_desc": "an intense tightening in the chest, air hunger, difficulty breathing, breathlessness or a feeling of suffocation",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });

        // insert chills symptom 
        symptom = new Symptom({
            "symptom_title": "chills",
            "symptom_desc": " a feeling of coldness occurring during a high fever, but sometimes is also a common symptom which occurs alone in specific people",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });

         // insert headache symptom 
        symptom = new Symptom({
            "symptom_title": "headache",
            "symptom_desc": " Headaches can radiate across the head from a central point or have a vise-like quality."
                              +"They can be sharp, throbbing or dull, appear gradually or suddenly. They can last from less than an hour up to several days. ",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });

         // insert diarrhea symptom 
        symptom = new Symptom({
            "symptom_title": "diarrhea",
            "symptom_desc": "  Loose frequent bowel movements ",
        });
        symptom.save(function (err) {
            if (err) {
                console.error("got error when insert symptom  " + err );
            } else {
                console.log("succeed to insert a symptom: "+ symptom.symptom_title +":  "+ symptom.symptom_desc);
            }
        });



    });

    console.log("done to insert the seed data");
};
