<template>
    <div id="app">
        <div class="columns is-mobile">
            <router-view
              :socket="socket"
              :messages="messages"
              :users="users"
              :user="user"
              :rooms="rooms"
              @send-message="sendMessage"
              class="column is-10-tablet is-offset-2-tablet is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen bg"
            />
        </div>
    </div>
</template>

<script>
/* global io */
export default {
  name: 'App',
  data () {
    return {
      socket: '',
      users: [],
      user: '',
      messages: [],
      rooms: [{
        name: 'General',
        value: 'general',
        number: 0
      }, {
        name: 'Game',
        value: 'game',
        number: 0
      }, {
        name: 'Learning',
        value: 'learning',
        number: 0
      }]
    }
  },
  mounted () {
    if (!this.socket) this.socket = io.connect()
    this.socket.on('update room', (numberUser) => {
      this.rooms.forEach(room => {
        room.number = numberUser[room.value]
      })
    })
    // get all message from server
    this.socket.on('get all messages', (messages) => {
      this.messages = messages.map(message => {
        return {
          username: message.username,
          id: message.id,
          avatar: message.avatar,
          message: message.message,
          source: 'client',
          room: message.room
        }
      })
    })
    // add user suscess
    this.socket.on('login', (user) => {
      this.user = user
      this.$router.push('/chat-room')
    })

    this.socket.on('user joined', (newUser) => {
      this.messages.push({
        username: newUser.username,
        id: newUser.id,
        message: `${newUser.username} joined`,
        source: 'join',
        room: newUser.room
      })
    })
    this.socket.on('user leaved', (user) => {
      this.messages.push({
        username: user.username,
        id: user.id,
        message: `${user.username} leaved`,
        source: 'join',
        room: user.room
      })
    })
    if (this.user === '') this.$router.push('/')
    this.socket.on('new message', (message) => {
      this.messages.push(message)
      this.$nextTick(() => {
        var objDiv = document.getElementById('display-chat')
        objDiv.scrollTop = objDiv.scrollHeight
      })
    })
    this.socket.on('change room', (room) => {
      this.user.room = room
    })
    this.socket.on('disconnect', () => {
      this.user = ''
      console.log('disconnect')
      location.reload()
    })
  },
  methods: {
    sendMessage (message) {
      this.messages.push({
        username: this.user.username,
        id: this.user.id,
        message,
        source: 'local',
        room: this.user.room
      })
      this.socket.emit('new message', message)
    }
  }
}
</script>

<style>
html, body {
  min-height: 100vh;
  /* overflow-y: hidden; */
  overflow-x: hidden;
  background-color: #fafafa;
}
#app {
  color: #2c3e50;
  min-height: 100vh;
}
.bg {
  min-height: 100vh;
  margin-top: 0;
  background-color: #F7C444;
  color: black;
}
</style>
