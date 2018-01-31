import Vue from 'vue'
import Router from 'vue-router'
import ChatRoom from '@/components/ChatRoom'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chat-room',
      name: 'ChatRoom',
      component: ChatRoom
    },
    {
      path: '/',
      name: 'Register',
      component: Register
    }
  ]
})
