var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))
var port = process.env.PORT || 3000

var numberUser = {
  all: 0,
  general: 0,
  learning: 0,
  game: 0
}
var storeMessages = []
io.on('connection', function (socket) {
  var addedUser = false
  socket.emit('update room', numberUser)
  // socket.emit('get all messages', storeMessages)
  socket.on('add new user', function (username, room, avatar) {
    if (addedUser) return
    numberUser['all']++
    socket.username = username
    socket.avatar = avatar
    addedUser = true
    socket.join(room, function () {
      numberUser[room]++
      socket.room = room
      socket.emit('login', {
        username: socket.username,
        id: socket.id,
        room: socket.room,
        avatar: socket.avatar,
        time: Date.now()
      })
      socket.to(socket.room).emit('user joined', {
        username: socket.username,
        id: socket.id,
        room: socket.room,
        avatar: socket.avatar,
        time: Date.now(),
        numberUser: numberUser
      })
      io.sockets.emit('update room', numberUser)
    })
    socket.on('new message', function (data) {
      console.log(socket.avatar)
      let message = {
        username: socket.username,
        id: socket.id,
        avatar: socket.avatar,
        message: data,
        source: 'client',
        room: socket.room,
        time: Date.now()
      }
      socket.to(socket.room).emit('new message', message)
      storeMessages.push(message)
    })
    socket.on('join room', function (room) {
      socket.leave(socket.room, function () {
        numberUser[socket.room]--
        socket.to(socket.room).emit('user leaved', {
          username: socket.username,
          id: socket.id,
          room: socket.room,
          avatar: socket.avatar
        })
        socket.join(room, function () {
          socket.room = room
          numberUser[socket.room]++
          socket.to(socket.room).emit('user joined', {
            username: socket.username,
            id: socket.id,
            room: socket.room,
            avatar: socket.avatar
          })
          socket.emit('change room', socket.room)
          io.sockets.emit('update room', numberUser)
        })
      })
    })
    socket.on('disconnect', function (reason) {
      numberUser[socket.room]--
      console.log('disconnect', socket.room, reason)
      socket.to(socket.room).emit('user leaved', {
        username: socket.username,
        id: socket.id,
        room: socket.room,
        avatar: socket.avatar
      })
      io.sockets.emit('update room', numberUser)
    })
  })
})

http.listen(port, function () {
  console.log('listening on *:', port)
})
