// Iteration #1
require('../configs/db.config.js');
const mongoose = require('mongoose');

const { Mongoose } = require('mongoose')
//require the model

let DroneModel = require('../models/Drone.model.js')

//insert into the model

const drones = [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
  ]

DroneModel.create(drones)
    .then((result)=> {
        console.log('Data seeded', result.length)
        //always close the connection after seeding
        //please make sure you require mongoose at the top of the file
        mongoose.disconnect()
    })
    .catch(()=> {
        console.log('Data seeding went wrong!')
    })
