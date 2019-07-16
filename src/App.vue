<template>
  <div id="app">
    <transition name="slideup">
      <router-view />
    </transition>
    <div class="loading" v-show="loading">
      <p>{{loadingText}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { globalEventBus } from './main';

@Component
export default class App extends Vue {
  public loading: boolean = false;
  public loadingText: string = '';
  public created() {
    globalEventBus.$on('loading', (flag: boolean, text: string) => {
      this.loading = flag;
      this.loadingText = text;
    });
    // globalEventBus.$on('snackbar', (flag: boolean, text: string)=>{
    //   this.loading = flag;
    //   this.loadingText = text;
    // });
  }
}
</script>

<style lang="scss">
@import "./assets/css/style.scss";
.loading {
  position: fixed;
  z-index: 1100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</style>