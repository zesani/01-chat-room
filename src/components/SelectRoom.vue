<template>
    <div id="register" class="columns is-multiline">
        <div class="column is-12 input-username">
          Select your Room:
          <b-field>
            <b-radio-button v-model="room"
                  native-value="general">
                  General
              </b-radio-button>
              <b-radio-button v-model="room"
                  native-value="game">
                  Game
              </b-radio-button>
              <b-radio-button v-model="room"
                  native-value="learning">
                  Learning
              </b-radio-button>
            </b-field>
            What your name ?
            <b-input v-model="username"></b-input> <br>
            <a class="button is-primary" @click="addNewuser">OK</a>
        </div>
    </div>
</template>
<script>
import MessageBox from './MessageBox'
export default {
  props: ['socket'],
  components: {
    MessageBox
  },
  data () {
    return {
      username: '',
      room: 'general'
    }
  },
  methods: {
    addNewuser () {
      this.socket.emit('add new user', this.username, this.room)
    }
  }
}
</script>
<style scoped>
#register {
  padding-top: 25vh;
}
</style>
