
const db = require('../../models/index');
const messages = db.messages;

exports.findOneUserMesseges = (req, res) => {

    const userId_send = req.params.userId
    
    console.log('param : ',userId_send)

    messages.findAll({ where: { userId_send: userId_send } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with param =" + userId_send
      })
    })
}









