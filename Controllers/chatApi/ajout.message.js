
const db = require('../../models/index');
const messages = db.messages;
const io = require('./index')



exports.ajoutMessage = async(req, res) => {  
    console.log('ajout message  "BODY"  ',req.body)  
    messages.create({
        userId_send : req.body.userId_send,
        userId_receiver : req.body.userId_receiver,
        message : req.body.message,
    })
    .then(data => {
        res.send(data)




        io.on('connection', (socket) => {
          socket.on('chat message', ({userId_send , message}) => {
            io.emit('chat message', {userId_send , message});
          });
        });




      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        })
      })
  


}













