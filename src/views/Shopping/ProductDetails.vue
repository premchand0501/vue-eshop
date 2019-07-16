<template>
  <div class="container-fluid productGroup fixed-top" v-if="detail">
    <Navbar class="w-100">
      <template v-slot:navLeftButtons>
        <button class="btn btn-link backBtn" type="button" @click="goBack">
          <faIcon icon="arrow-left"></faIcon>
          <span class="pl-3">{{detail.name}}</span>
        </button>
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
    <div class="container">
      <div class="row">
        <div class="col col-12 col-md-6 col-sm-6 mb-3">
          <div class="productImage">
            <img :src="detail.image" :alt="detail.name" class="img-fluid" />
          </div>
        </div>
        <div class="col col-12 col-md-6 col-sm-6 mb-3">
          <div class="details">
            <h2>{{detail.name}}</h2>
            <router-link :to="`/product-detail/${detail.groupId}`">{{detail.brand}}</router-link>
            <hr />
            <div class="d-flex justify-content-between">
              <span class="d-block">₹{{detail.discountedPrice}}</span>
              <button class="btn btn-primary">Buy</button>
            </div>
            <ul class="list-group mt-3">
              <li class="list-group-item dropdown" @click="openPanel('details')">Details</li>
              <div class="dropdown-menu" :class="{'show': currentToggle == 'details'}">
                <p class="p-3">{{ detail.description }}</p>
              </div>
            </ul>
            <ul class="list-group mt-3">
              <li class="list-group-item dropdown" @click="openPanel('shipping')">Shipping</li>
              <div class="dropdown-menu" :class="{'show': currentToggle == 'shipping'}">
                <p class="p-3">{{ detail.description }}</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IProduct } from "@/interface/IProduct";
import Navbar from "@/components/shopping/Navbar.vue";

@Component({
  components: { Navbar },
  computed: mapGetters(["detail"])
})
export default class ProductDetails extends Vue {
  public detail!: IProduct;
  public productId!: number;
  public currentToggle = "";
  public created() {
    this.productId = +this.$route.params.prod_id;
    console.log(this.productId);
    this.$store
      .dispatch("getProductDetails", this.productId)
      .then(() => console.log(JSON.stringify(this.detail)));
  }
  public goBack() {
    this.$router.back();
  }
  public openPanel(panel: string) {
    this.currentToggle = this.currentToggle == panel ? "" : panel;
  }
}
</script>
<style lang="scss" scoped>
.productGroup {
  min-height: 100vh;
  padding-top: 5rem;
  height: 100vh;
  overflow-y: auto;

  .dropdown {
    cursor: pointer;
  }
  .dropdown-menu {
    position: relative;
  }
  .productImage img {
    height: 50vh;
    max-height: 480px;
    margin: 0 auto;
    display: block;
  }
  .productDetails {
    p {
      overflow: visible;
      text-overflow: initial;
      white-space: normal;
    }
  }
}
</style>