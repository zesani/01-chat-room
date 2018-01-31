<template>
    <div :class="className" v-show="right || server">
      {{ username }} say:<br>
      <div class="box-message">
          <p>
            {{ message }}
          </p>
      </div>
    </div>
</template>
<script>
export default {
  props: ['username', 'message', 'right', 'server'],
  computed: {
    className () {
      return this.right ? 'column is-10 is-offset-2 right-message' : 'column is-10'
    }
  }
}
</script>
<style scoped>
.box-message {
  background-color: #fff;
  border-radius: 10px;
  color: black;
  padding: 10px;
  display: inline-block;
}
.right-message {
  float: right;
  text-align: right;
}
</style>
