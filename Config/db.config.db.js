const express = require('express')
const mysql = require('mysql')
const { Sequelize } = require('sequelize')



const sequelize  = new Sequelize('base', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  })

  

module.exports = sequelize