<template>
  <div id="app">
      <section class="section">
          <div class="container">
            <div class="columns is-multiline">
              <router-view :socket="socket" :messages="messages" :users="users" :user="user" @send-message="sendMessage" class="column is-6 is-offset-3 bg"/>
            </div>
          </div>
      </section>
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
      messages: []
    }
  },
  mounted () {
    if (!this.socket) {
      this.socket = io('http://localhost:3000')
    }
    this.socket.on('user joined', (newUser) => {
      this.users.push(newUser)
    })
    // let user = JSON.parse(localStorage.getItem('user'))
    // if (user) {
    //   console.log(user)
    //   this.socket.emit('add new user', user.username, user.room)
    // }
    if (this.user === '') {
      this.$router.push('/')
    }
    this.socket.on('login', (user) => {
      this.user = user
      // localStorage.setItem('user', JSON.stringify(this.user))
      this.$router.push('/chat-room')
    })
    this.socket.on('logout', () => {
      // localStorage.removeItem('user')
      this.user = ''
      this.$router.push('/')
    })
    this.socket.on('new message', (message) => {
      this.messages.push(message)
    })
  },
  methods: {
    sendMessage (message) {
      this.messages.push({
        username: this.user.username,
        id: this.user.id,
        message,
        server: false
      })
      this.socket.emit('new message', message)
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
.bg {
  background-color: black;
  min-height: 80vh;
  color: #fff;
}
</style>
