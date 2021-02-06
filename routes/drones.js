const express = require('express');

// require the Drone model here
const DroneModel = require('../models/Drone.model.js')
const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
    DroneModel.find()
    .then((drones)=> {
      res.render('drones/list.hbs', {drones})
    })
    .catch(()=> {
      console.log('Error finding route')
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const {newDrone, newPropellers, newMaxSpeed} = req.body
  let myNewDrone = {
    name: newDrone,
    propellers: newPropellers,
    maxSpeed : newMaxSpeed 
  }

  DroneModel.create(myNewDrone)
  .then(()=> {
    res.redirect('/drones')
  })
  .catch(()=> {
    res.render('drones/create-form.hbs')
  })

})

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id

  DroneModel.findById(id)
  .then((drones)=> {
    res.render('drones/update-form.hbs', {drones})
  })
  .catch(()=> {
    console.log('Something went wrong while getting drone to edit')
  })
  
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
     let id = req.params.id
     const {newDrone, newPropellers, newMaxSpeed} = req.body

     let updatedDrone= {
       name: newDrone,
       propellers: newPropellers,
       maxSpeed: newMaxSpeed
     }

      DroneModel.findByIdAndUpdate(id, updatedDrone)
      .then(()=> {
        res.redirect('/drones')
       })
      .catch(()=> {
        res.render('drones/update-form.hbs')
      })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let id = req.params.id
  
   DroneModel.findByIdAndDelete(id)
   .then(()=> {
     res.redirect('/drones')
    })
   .catch(()=> {
     res.render('drones/update-form.hbs')
   })
});

module.exports = router;
