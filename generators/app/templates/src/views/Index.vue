<template>
  <div class="hello">
    <Hello></Hello>
    <group>
      <cell title="hello" value="hello" link="hello"></cell>
      <cell title="user" value="user" link="user"></cell>
    </group>
    <h2>TITLE</h2>
    <x-button type="primary" @click.native="clickToast">点我</x-button>
  </div>
</template>

<script>
// import Api from 'api'
import { Group, Cell, XButton } from 'vux'
import Hello from 'components/Hello'

export default {
  components: {
    Group,
    Cell,
    XButton,
    Hello
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App Index'
    }
  },
  methods: {
    clickToast () {
      this.toast({
        title: 'aaaa',
        onHide: () => {
          this.alert({
            title: 'bbbb',
            content: 'cccc',
            onHide: () => {
              this.confirm({
                title: 'hahah Confirm'
              })
            }
          })
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // Api.getSetting().then(response => {
    //   console.log(response)
    //   next()
    // })
    setTimeout(() => {
      next()
    }, 1000)
  }
}
</script>

<style rel="stylesheet/scss">
h1, h2 {
  font-weight: normal;
  &:before {
    content: '';
    circle: 50px #ff0;
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
