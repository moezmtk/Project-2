const { DataTypes } = require('sequelize')
const express = require('express')
const User = require('../models/model.user')



  exports.delete = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}