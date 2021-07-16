const express = require('express')


exports.deepClone = (req,res)=>{
    
   
    //exemple : {"firstName": "James", "lastName": "Bond", "age": 9}
    const obj1 = req.body  
    const obj2 = Object.assign({},obj1)
    res.json({result:obj2})
    console.log('obj1 = ',obj1)
    console.log('obj2 = ',obj2)

}