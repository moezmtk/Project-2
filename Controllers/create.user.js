const { DataTypes } = require('sequelize')
const express = require('express')
const User = require('../models/user.model')
//exemple : { "first_name": "demes", "last_name" : "demess", "email" : "demes@gmail.com", "phone" : "31354546", "status" : "1" }

exports.createUser = async(req, res) => {    
    
    console.log('creat.user "BODY"  ',req.body)

    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password:req.body.password,
      email: req.body.email}
      )
      
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        })
      })
  


    }