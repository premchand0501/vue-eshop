<template>
  <transition name="fade-anim">
    <div class="toast show" role="alert" v-if="snackbarInfo.flag">
      <div class="toast-header">
        <strong class="mr-auto">{{snackbarInfo.title}}</strong>
        <button
          type="button"
          class="btn btn-link p-0"
          @click="snackbarInfo.flag = false"
        >{{snackbarInfo.dismissBtnTitle !='' ?snackbarInfo.dismissBtnTitle: '&times;'}}</button>
      </div>
      <div class="toast-body">{{snackbarInfo.desc}}</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ISnackbarInfo } from "../../interface/ISnackbarInfo";
import { globalEventBus } from "../../main";
@Component
export default class Snackbar extends Vue {
  public snackbarInfo: ISnackbarInfo = {
    title: "",
    desc: "",
    dismissBtnTitle: "",
    flag: false
  };
  created() {
    globalEventBus.$on("snackbar", (snackBarData: ISnackbarInfo) => {
      this.snackbarInfo.title = snackBarData.title;
      this.snackbarInfo.desc = snackBarData.desc;
      this.snackbarInfo.dismissBtnTitle = snackBarData.dismissBtnTitle;
      this.snackbarInfo.flag = snackBarData.flag;

      const timeout = setTimeout(() => {
        this.snackbarInfo.title = "";
        this.snackbarInfo.desc = "";
        this.snackbarInfo.dismissBtnTitle = "";
        this.snackbarInfo.flag = false;
        clearTimeout(timeout);
      }, 5000);
    });
  }
}
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  z-index: 1100;
  bottom: 1rem;
  left: 1rem;
  width: 320px;
  background-color: #222;
  color: #ddd;
  .toast-header {
    background-color: #222;
    color: #ddd;
    border-bottom: none;
  }
  .btn-link {
    color: var(--warning);
    font-size: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border: none;
    text-decoration: none;
  }
}
</style>
