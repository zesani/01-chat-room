<template>
    <div :class="className" style="position:relative;">
      <template v-if="message.source === 'client'">
        <div class="columns is-gapless is-mobile is-multiline level">
           <div class="column is-12 " style="text-align:left;">
             {{ message.username }} :
          </div>
          <div class="column is-2-mobile is-1-tablet level-item " style="text-align:center;">
            <img :src="`../../static/c0${message.avatar}.png`" alt="" class="level-item profile-img">
          </div>
          <div class="column is-10-mobile is-11-tablet" >
            <div class="box-message level-item"  style="">
              <p> {{ message.message }} </p>
              <p class="time"> {{time(message.time)}} </p>
            </div>
          </div>
      </div>
      </template>
      <template v-else-if="message.source === 'local'">
          <div class="box-message-me"  style="">
            <div class="content">
               <p> {{ message.message }} </p>
              <p class="time"> {{time(message.time)}} </p>
            </div>
          </div>
      </template>
      <template v-else>
        {{ message.message  }}
      </template>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ['message', 'show'],
  computed: {
    className () {
      if (this.message.source === 'client') return 'column is-8'
      if (this.message.source === 'local') return 'column is-8 is-offset-4 right-message'
      if (this.message.source === 'join') return 'column is-6 is-offset-3 center-message'
    }
  },
  methods: {
    time (time) {
      return moment(time).format('HH:mm')
    }
  }
}
</script>
<style scoped>
.box-message {
  background-color: #E9EBEE;
  border-radius: 1rem;
  color: black;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  display: inline-block;
  word-wrap: break-word;
  max-width: 100%;
  text-align: justify;
  padding-left: 1rem;
  padding-right: 0.9rem;
  margin-bottom: 0px;
}
.box-message-me {
  background-color:  #5DCCF1;
  border-radius: 1rem;
  color: black;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  max-width:100%;
  text-align:justify;
  padding-left: 0.9rem;
  padding-right: 0.9rem;
}
.right-message {
  text-align: right;
}
.center-message {
  text-align: center;
}
.profile-img {
  width: 100%;
  border-radius: 50px;
}
.time {
  text-align: right;
  font-size: 0.7rem;
  color: black;
  float: right;
  cursor: default;
}
.profile-img {
  border-radius: 100px !important;
  width: 100%;
}
.time:before {
  content: "\f017";
  color: black;
  font-family: FontAwesome;
  display: inline-block;
  margin-right: 4px;
}
</style>
