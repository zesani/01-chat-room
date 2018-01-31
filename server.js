var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require("path");
app.use('/', express.static(path.join(__dirname, 'dist')))
var numberUser = 0
var port = process.env.PORT || 3000

// console.log(". = %s", path.resolve("."));
// console.log("__dirname = %s", path.resolve(__dirname));
// console.log(express.static('dist'))
// .use((req, res) => res.sendFile(INDEX) )
app.get('/hello', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')) )
io.on('connection', function (socket) {
  console.log('new connect')
  var addedUser = false
  numberUser++
  socket.on('add new user', function (username, room) {
    if (addedUser) return
    socket.username = username
    addedUser = true
    console.log(username, room)
    socket.join(room, function () {
      console.log(socket.username)
      socket.room = room
      socket.emit('login', {
        username: socket.username,
        id: socket.id,
        room: socket.room
      })
      socket.broadcast.emit('user joined', {
        username: socket.username,
        id: socket.id
      })
    })
    socket.on('new message', function (data) {
      console.log(socket.room)
      socket.to(socket.room).emit('new message', {
        username: socket.username,
        id: socket.id,
        message: data,
        server: true
      })
    })
    socket.on('disconnect', function (a) {
      console.log('1')
      socket.disconnect(true, function () {
        console.log('2')
        socket.emit('logout')
      })
    })
    socket.on('new message', function (data) {
      console.log(socket.room)
      socket.to(socket.room).emit('new message', {
        username: socket.username,
        id: socket.id,
        message: data
      })
    })
  })
})

http.listen(port, function () {
  console.log('listening on *:', port)
})
