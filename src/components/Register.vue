<template>
    <div id="register" class="columns is-multiline is-mobile">
        <div class="column is-12 is-hidden-mobile"></div>
        <div class="column is-8-mobile is-offset-2-mobile is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop">
          <img src="../assets/C1.png" style="width: 100%;" alt="">
        </div>
        <div class="column is-10-mobile is-offset-1-mobile is-8-tablet is-offset-2-tablet">
            <strong> Select your Room : </strong>
            <b-field>
                <b-radio-button v-for="r in rooms" v-model="room" :key="r.value" :native-value="r.value">{{ r.name }} {{r.number}}</b-radio-button>
            </b-field>
            <strong> What your name ?  </strong>
            <b-input  size="is-medium" v-model="username" @keyup.enter.native="addNewuser" minlength="1"  maxlength="10"></b-input> <br>
        </div>
        <div class="column is-10-mobile is-offset-1-mobile is-8-tablet is-offset-2-tablet">
            <div class="columns is-mobile">
              <div class="column" @click="avatar = 1" :style="avatar === 1 ? 'background-color: #fff; border-radius: 100px;' : ''">
                <img src="../assets/c01.png" alt="" >
              </div>
              <div class="column" @click="avatar = 2" :style="avatar === 2 ? 'background-color: #fff; border-radius: 100px;' : ''">
                <img src="../assets/c02.png" alt="" >
              </div>
              <div class="column" @click="avatar = 3" :style="avatar === 3 ? 'background-color: #fff; border-radius: 100px;' : ''">
                <img src="../assets/c03.png" alt="" >
              </div>
              <div class="column" @click="avatar = 4" :style="avatar === 4 ? 'background-color: #fff; border-radius: 100px;' : ''">
                <img src="../assets/c04.png" alt="">
              </div>
            </div>
            <a class="button is-primary" @click="addNewuser">OK</a>
        </div>

    </div>
</template>
<script>
import MessageBox from './MessageBox'
export default {
  props: ['socket', 'rooms'],
  components: {
    MessageBox
  },
  data () {
    return {
      username: '',
      room: 'general',
      avatar: 1,
      avatars: [
        {
          id: 1,
          path: 'c01.png'
        },
        {
          id: 2,
          path: 'c02.png'
        },
        {
          id: 3,
          path: 'c04.png'
        },
        {
          id: 4,
          path: 'c05.png'
        }
      ]
    }
  },
  methods: {
    addNewuser () {
      this.socket.emit('add new user', this.username, this.room, this.avatar)
    }
  }
}
</script>
<style scoped>
</style>
