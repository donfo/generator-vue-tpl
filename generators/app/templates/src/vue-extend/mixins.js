import { mapMutations } from 'vuex'

export default {
  base: {
    computed: {
      setting () {
        return this.$store.state.setting
      },
      base () {
        return this.$store.state.base
      }
    },
    methods: {
      ...mapMutations([
        'loading',
        'toast',
        'alert',
        'confirm'
      ]),
      setTitle (title) {
        // hack在微信等webview中无法修改document.title的情况
        document.title = title
        document.getElementById('iframe').contentWindow.location.reload()
      }
    }
  }
}
