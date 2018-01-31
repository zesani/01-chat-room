<template>
    <div id="chat-room" class="columns is-multiline">
        <div class="column is-12" style="float: right; text-align: right;">
          <a class="button is-primary is-outlined">{{user.username}}</a>
          <a class="button is-info">#{{user.room}}</a>
          <a class="button is-danger" @click="disconnect">Logout</a>
        </div>
        <div class="column is-12 display">
            <div class="columns is-multiline">
                <message-box v-for="(message, index) in messages" :key="index" :username="message.username" :message="message.message" :server="message.server" :right="user.id === message.id && !message.server" />
            </div>
        </div>
        <div class="column is-12 input-chat">
            <b-input v-model="message"></b-input> <br>
            <a class="button is-primary" @click="newMessage">SEND</a>
        </div>
    </div>
</template>
<script>
import MessageBox from './MessageBox'
export default {
  props: ['socket', 'messages', 'user'],
  components: {
    MessageBox
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    newMessage () {
      this.$emit('send-message', this.message)
      this.message = ''
    },
    disconnect () {
      console.log('logout')
      this.socket.emit('disconnect', 'a')
    }
  }
}
</script>
<style scoped>
.display {
  border: 1px solid;
  position: relative;
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
}
.input-chat {
  border: 1px solid;
}
</style>
