<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="loadingXp.show"
      :position="loadingXp.position"
      :text="loadingXp.title"
      :class="{full: loadingXp.full}">
    </loading>
    <toast v-model="toastXpShow"
      :type="toastXp.type"
      :time="toastXp.time"
      :width="toastXp.width"
      :is-show-mask="toastXp.isShowMask"
      :text="toastXp.title"
      @on-show="toastXp.onShow"
      @on-hide="toastXp.onHide">
    </toast>
    <alert v-model="alertXpShow"
      :title="alertXp.title"
      :button-text="alertXp.buttonText"
      :mask-transition="alertXp.maskTransition"
      :dialog-transition="alertXp.dialogTransition"
      @on-show="alertXp.onShow"
      @on-hide="alertXp.onHide">
      <span v-html="alertXp.content" v-if="alertXp.content"></span>
    </alert>
    <confirm v-model="confirmXpShow"
      :title="confirmXp.title"
      :confirm-text="confirmXp.confirmText"
      :cancel-text="confirmXp.cancelText"
      :mask-transition="confirmXp.maskTransition"
      :dialog-transition="confirmXp.dialogTransition"
      :hide-on-blur="confirmXp.hideOnBlur"
      @on-cancel="confirmXp.onCancel"
      @on-confirm="confirmXp.onConfirm"
      @on-show="confirmXp.onShow"
      @on-hide="confirmXp.onHide">
      <span v-html="confirmXp.content" v-if="confirmXp.content"></span>
    </confirm>
  </div>
</template>

<script>
import { Loading, Toast, Alert, Confirm } from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Loading,
    Toast,
    Alert,
    Confirm
  },
  computed: {
    ...mapGetters({
      loadingXp: 'loading',
      toastXp: 'toast',
      alertXp: 'alert',
      confirmXp: 'confirm'
    }),
    toastXpShow: {
      get () {
        return this.toastXp.show
      },
      set (show) {
        this.$store.commit('toast', { show })
      }
    },
    alertXpShow: {
      get () {
        return this.alertXp.show
      },
      set (show) {
        this.$store.commit('alert', { show })
      }
    },
    confirmXpShow: {
      get () {
        return this.confirmXp.show
      },
      set (show) {
        this.$store.commit('confirm', { show })
      }
    }
  }
}
</script>

<style src="vux/src/styles/reset.less" lang="less"></style>

<style>
@import './assets/postcss/index.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.full {
  position: fixed;
  z-index: 5001;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
}
.weui-dialog .weui-dialog__bd {
  min-height: initial;
}
</style>
