
const db = require('../../models/index');
const messages = db.messages;

exports.update = (req, res) => {
    const id = req.params.id
    

    messages.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was updated successfully."
          })
        } else {
          res.send({
            message: `Cannot update message with id=${id}. Maybe message was not found or req.body is empty!`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating message with id=" + id
        })
      })
      
  }







  exports.delete = async (req, res) => {
    try {
        await messages.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "message Deleted"
        });


        

        io.on('delete-message', (socket) => {
          socket.on('delete-message', ({userId_send , message}) => {
            io.emit('delete-message', {userId_send , message});
          });
        });





    } catch (err) {
        console.log(err);
    }
}








