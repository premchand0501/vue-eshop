<template>
  <div class="container-fluid app" :class="{'active': navbarToggle}">
    <div class="row">
      <Navbar class="w-100">
        <template v-slot:navLeftButtons>
          <button class="btn btn-link" type="button" @click="showSideMenu">
            <faIcon icon="bars"></faIcon>
          </button>
        </template>
        <template v-slot:navTitle>
          <router-link to="/" class="navbar-brand">
            <em>eShop</em>
          </router-link>
        </template>
        <template v-slot:navRightButtons>
          <div class="btn-group">
            <router-link to="/cart" class="btn btn-link">
              <faIcon icon="shopping-bag"></faIcon>
            </router-link>
            <router-link to="/search" class="btn btn-link">
              <faIcon icon="search"></faIcon>
            </router-link>
          </div>
        </template>
      </Navbar>
      <transition name="slide-fade">
        <SideMenu v-if="navbarToggle" />
      </transition>
      <SwiperWrapper />
      <ProductGroup
        :productProp="allLandingProducts"
        v-for="(cat, ind) in allLandingPageCategories"
        :catTitle="cat"
        :key="ind"
      />
      <transition name="slideup">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/shopping/Navbar.vue";
import SwiperWrapper from "@/components/shopping/SwiperWrapper.vue";
import ProductGroup from "@/components/shopping/ProductGroup.vue";
import SideMenu from "@/components/shopping/SideMenu.vue";
import { mapGetters } from "vuex";
import { IProduct, Query } from "@/interface/IProduct";

@Component({
  components: { Navbar, SwiperWrapper, ProductGroup, SideMenu },
  computed: mapGetters([
    "allLandingProducts",
    "allLandingPageCategories",
    "navbarToggle",
    "searchToggle"
  ])
})
export default class Shopping extends Vue {
  allLandingProducts!: IProduct[];
  allLandingPageCategories!: string[];

  searchToggle!: boolean;
  navbarToggle!: boolean;
  enableSearch() {
    this.$store.dispatch("toggleSearch", true);
  }
  addNewCategory() {
    this.$router.push(this.$route.path + "/create-category");
  }
  showSideMenu() {
    let flag = !this.navbarToggle;
    this.$store.dispatch("toggleNavbar", flag);
  }

  created() {
    if (window.innerWidth > 850) {
      this.$store.dispatch("toggleNavbar", true);
    }
    this.$store.dispatch("loadLandingProductsByCategory", {
      key: "showOnLandingPage",
      value: "true"
    } as Query);
  }
  beforeCreate() {
    document.title = "eShop | Vuex and Firebase E-Commerce app";
  }
}
</script>
<style lang="scss" scoped>
.app {
  padding-top: 4rem;
  padding-right: 2rem;
}
@media screen and (min-width: 850px) {
  .app.active {
    padding-left: 335px;
  }
}
</style>
