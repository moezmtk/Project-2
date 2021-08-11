const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http").createServer();
var server   = require('http');
var io       = require('socket.io')(server);





var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");
const Role = db.role;

//db.sequelize.sync();



app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});


require('./Routers/auth.routes')(app);
require('./Routers/user.routes')(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
const router = require("./Routers/router")
app.use('/',router)

app.get("/",(req,res)=>{
  res.sendFile(__dirname + '/controllers/chatApi/index.html')
 


})




