<template>
  <div class="container-fluid" style="padding-top: 4rem;">
    <div class="row">
      <Navbar class="w-100" />
      <SwiperWrapper />
      <transition name="fall-in">
        <router-view />
      </transition>
      <ProductGroup :productProp="allProducts" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/shopping/Navbar.vue";
import SwiperWrapper from "@/components/shopping/SwiperWrapper.vue";
import ProductGroup from "@/components/shopping/ProductGroup.vue";
import { mapGetters } from "vuex";
import { IProductList } from "../../interface/IProduct";

@Component({
  components: { Navbar, SwiperWrapper, ProductGroup },
  computed: mapGetters(["allProducts"])
})
export default class Shopping extends Vue {
  public allProducts!: IProductList;
  public created() {
    this.$store.dispatch("loadProductsByCategory", {
      key: "showOnLandingPage",
      value: "true"
    });
  }
  public beforeCreate() {
    document.title = "eShop | Vuex and Firebase E-Commerce app";
  }
}
</script>