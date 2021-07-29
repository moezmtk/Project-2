
const db = require('../../models/index');
const messages = db.messages;




exports.ajoutMessage = async(req, res) => {  
    console.log('ajout message  "BODY"  ',req.body)  
    messages.create({
        userId_send : req.body.userId_send,
        userId_receiver : req.body.userId_receiver,
        message : req.body.message,
    })
    .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        })
      })
  



}













