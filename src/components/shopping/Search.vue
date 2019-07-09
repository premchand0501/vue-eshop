<template>
  <transition name="reveal" @after-enter="showContent = true">
    <div class="container-fluid searchBox" 
      v-if="searchToggle" 
      @click="closeSearch">
      <div class="container">
        <div class="row">
          <div class="col col-12">
            <transition name="fade-anim">
              <form
                v-if="showContent"
                class="input-group"
                @submit.prevent="searchRequest"
                @click.stop
                style="transition-delay: 0.2s;"
              >
                <input type="text" class="form-control" v-model="searchInput">
                <div class="input-group-append">
                  <button class="btn btn-link" type="submit">
                    <i class="icon ion-md-search"></i>
                  </button>
                </div>
              </form>
            </transition>
            <transition name="fade-anim">
              <p
                v-if="showContent"
                class="text-light m-auto"
                style="max-width: 500px; transition-delay: 1s;"
              >
                <router-link
                  v-for="(k, i) in searchKeywords"
                  :to="`/category/${k}`"
                  class="badge badge-light mr-1 mb-1"
                  v-show="k.length!==0"
                  :key="`k_${i}`"
                >{{k}}</router-link>
              </p>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
@Component({
  computed: mapGetters(['searchKeywords', 'searchToggle']),
})
export default class Search extends Vue {
  public searchInput: string = '';

  public searchToggle!: boolean;

  public searchKeywords!: string[];

  public showContent: boolean = false;

  public closeSearch() {
    this.showContent = false;
    setTimeout(() => {
      this.$store.dispatch('toggleSearch', false);
    }, 250);
  }
  public searchRequest(event: Event) {
    event.stopPropagation();
    console.log('submit');
    this.$store.dispatch('addSearchKeyword', this.searchInput);
  }
}
</script>
<style lang="scss" scoped>
.searchBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0000008c;
  overflow: hidden;
  transform-origin: 100% 0;
  align-items: flex-start;
  padding-top: 20vh;
  cursor: zoom-out;
  z-index: 1000;

  .input-group {
    max-width: 500px;
    margin: 0 auto;
    border-bottom: 2px solid #ddd;
    .form-control {
      height: 5rem;
      background-color: transparent;
      border: none;
      font-size: 3rem;
      font-weight: 300;
      text-align: center;
      color: #ddd;
    }
    .form-control:focus {
      box-shadow: none;
    }
    .btn {
      font-size: 2rem;
      color: #ddd;
    }
  }
}
</style>