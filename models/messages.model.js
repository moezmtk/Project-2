
module.exports = (sequelize, Sequelize) => {
    const messages = sequelize.define("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId_send: {
        type: Sequelize.INTEGER,
      },
      userId_receiver: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING
      }
    });
  
    return messages;
  };
  













