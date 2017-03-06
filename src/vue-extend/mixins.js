const defaultShow = (opts) => {
  return Object.keys(opts).length > 0 ? Object.assign({ show: true }, opts) : {}
}

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
      setTitle (title) {
        // hack在微信等webview中无法修改document.title的情况
        document.title = title
        document.getElementById('iframe').contentWindow.location.reload()
      },
      loading (opts) {
        if (typeof opts === 'string') {
          opts = { text: opts }
        } else if (typeof opts === 'boolean') {
          opts = { show: opts }
        }
        this.$store.commit('loading', defaultShow(opts))
      },
      toast (opts) {
        opts = typeof opts === 'string' ? { text: opts } : opts
        this.$store.commit('toast', defaultShow(opts))
      },
      alert (opts) {
        opts = typeof opts === 'string' ? { title: opts } : opts
        this.$store.commit('alert', defaultShow(opts))
      },
      confirm (opts) {
        this.$store.commit('confirm', defaultShow(opts))
      }
    }
  }
}
