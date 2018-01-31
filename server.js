var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use('/', express.static('dist'))
var numberUser = 0
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

http.listen(3000, function () {
  console.log('listening on *:3000')
})
