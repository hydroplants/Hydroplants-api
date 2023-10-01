var express = require('express');
var router = express.Router();
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 9002
var temp = 100

var app = express();
const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls

io.on('connection', (socket) => {
  console.log('client connected: ',socket.id);
  socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})

setInterval(()=>{
  io.to('clock-room').emit('temperature', temp)
},1000)
server.listen(PORT, err=> {
if(err) console.log(err)
console.log('Server running on Port ', PORT)
})

router.post('/', (req, res) => {
    const { temperature } = req.body;
    temp = temperature;
    console.log(`Received temperature data: ${temp} °C`);
    
    // Send a response
    res.status(200).send('Temperature data received successfully.');
});

router.get('/', (req, res, next) =>{
    return temp;
})

//var sqlite3 = require('sqlite3').verbose();

//var db = new sqlite3.Database('/plant_care_data.db', sqlite3.OPEN_READONLY, (err) => {
//    if (err) {
//        console.log(err.message);
//    }
//    console.log('Connected to the Plant Care DB.');
//});

//router.get('/', (req, res, next) => {
//    db.all('SELECT * FROM temperatures', [], (err, rows) => {
//        if (err) {
//            res.status(400).json({'error': err.message});
//            return;
//        }
//        res.status(200).json({rows});
//    });
//});


module.exports = router;