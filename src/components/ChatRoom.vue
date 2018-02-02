<template>
    <div  id="chat-room" class="columns is-multiline is-mobile">
       <div class="column is-10-mobile is-offset-1-mobile is-gapless is-10-tablet is-offset-1-tablet">
            <div class="header-chat">
              <strong>Name : </strong>{{user.username}} <br>
              <strong>Select your Room :</strong>
              <b-field>
                  <b-radio-button v-for="r in rooms" :key="r.value" v-model="room" @click.native="joinRoom($event.target.value)" :native-value="r.value"> {{r.name}}({{r.number}})</b-radio-button>
              </b-field>
            </div>
        </div>
        <div class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet">
          <div class="display" id="display-chat">
                <div class="columns is-multiline is-mobile">
                    <message-box v-for="(message, index) in messages" :key="index" :message="message" v-if="!(message.source === 'local' && message.id !== user.id) && (user.room === message.room)"/>
                </div>
            </div>
        </div>
        <div class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet">
            <div class="box-input">

                <b-input maxlength="25" v-model="message" @keyup.enter.native="newMessage"></b-input> <br>
                <a class="button is-primary" @click="newMessage">SEND</a>
            </div>
        </div>
    </div>
</template>
<script>
import MessageBox from './MessageBox'
export default {
  props: ['socket', 'messages', 'user', 'rooms'],
  components: {
    MessageBox
  },
  data () {
    return {
      message: '',
      room: ''
    }
  },
  mounted () {
    this.room = this.user.room
  },
  methods: {
    newMessage () {
      if (this.message === '') return
      this.$emit('send-message', this.message)
      this.message = ''
      this.$nextTick(() => {
        var objDiv = document.getElementById('display-chat')
        objDiv.scrollTop = objDiv.scrollHeight
      })
    },
    disconnect () {
      this.socket.disconnect()
    },
    joinRoom (room) {
      if (room) this.socket.emit('join room', room)
    }
  },
  watch: {
    'user.room' (room) {
      if (room) this.room = room
    }
  }
}
</script>
<style scoped>
.box-input {
  margin-top: 1%;
  width: 100%;
  left: 0%;
}
.display {
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: #fafafa;
}
</style>
