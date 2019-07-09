<template>
  <nav class="navbar navbar-expand-xs navbar-dark fixed-top shoppingNav">
    <button class="navbar-toggler" type="button" @click="showSideMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/" class="navbar-brand"><em>eShop</em></router-link>
    <div class="btn-group">
      <button class="navbar-toggler" type="button" @click="addNewCategory">
        <i class="icon ion-md-add"></i>
      </button>
      <button class="navbar-toggler" type="button" @click="enableSearch">
        <i class="icon ion-md-search"></i>
      </button>
    </div>
    <transition name="slide-fade">
      <SideMenu v-if="navbarToggle"/>
    </transition>
    <Search/>
  </nav>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Search from './Search.vue';
import SideMenu from '@/components/shopping/SideMenu.vue';
import { mapGetters } from 'vuex';

@Component({
  components: { Search, SideMenu },
  computed: mapGetters(['navbarToggle', 'searchToggle']),
})
export default class Navbar extends Vue {
  public searchToggle!: boolean;
  public navbarToggle!: boolean;
  public enableSearch() {
    this.$store.dispatch('toggleSearch', true);
  }
  public addNewCategory() {
    this.$router.push(this.$route.path + '/create-category');
  }
  public showSideMenu() {
    this.$store.dispatch('toggleNavbar', true);
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.shoppingNav {
  background-color: $primary;
  color: white;
  box-shadow: 0 2px 4px transparentize($color: $dark, $amount: 0.75);
  height: 4rem;

  .navbar-toggler {
    border: none;
    font-size: 90%;
  }
  .navbar-brand {
    color: white;
    font-weight: 600;
  }
}
@media screen and (max-width: 850px){
.shoppingNav {
  .navbar-toggler {
    font-size: 100%;
  }
}
}
</style>