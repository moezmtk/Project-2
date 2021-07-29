
const db = require('../../models/index');
const messages = db.messages;

exports.find2UserChat = (req, res) => {

    const userId_send = req.params.userId_send
    const userId_receiver = req.params.userId_receiver

    console.log('param : receiver ',userId_receiver,' send ',userId_send)

    messages.findAll({ where: { userId_receiver: userId_receiver, userId_send: userId_send } })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with param =" + username
      })
    })
}











