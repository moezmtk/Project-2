const db = require("../models");
const config = require("../Config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    
    password: CryptoJS.AES.encrypt(req.body.password, 'secret-key-123').toString()
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      var bytes  = CryptoJS.AES.decrypt(user.password, 'secret-key-123');
      var passwords = bytes.toString(CryptoJS.enc.Utf8);
      
      var passwordIsValid = ( req.body.password==passwords);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const redisClient = require('../Middleware/init_redis')
 




exports.logout=  (req, res)=> {
      const { userId, token } = req;
    
      redisClient.get(userId, (error, data) => {
        if (error) {
          res.send({ error });
        }
   
        if (data !== null) {
          const parsedData = JSON.parse(data);
          parsedData[userId].push(token);
          redisClient.setex(userId, 3600, JSON.stringify(parsedData));
          return res.send({
            status: 'success',
            message: 'Logout successful',
          });
        }
    
        const blacklistData = {
          [userId]: [token],
        };
        redisClient.setex(userId, 3600, JSON.stringify(blacklistData));
        return res.send({
            status: 'success',
            message: 'Logout successful',
        });
      });

}



    







