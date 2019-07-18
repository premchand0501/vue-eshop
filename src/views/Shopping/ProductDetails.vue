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
          <CartButton />
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
            <router-link :to="`/product-list/${detail.groupId}`">{{detail.brand}}</router-link>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="d-block m-0">₹{{detail.discountedPrice}}</h3>
              <span>
                <button class="btn btn-dark mr-3" @click="addToCart">Add To Cart</button>
                <button class="btn btn-primary">Buy</button>
              </span>
            </div>
            <ul class="list-group mt-3">
              <li
                class="list-group-item dropdown d-flex justify-content-between"
                @click="openPanel('details')"
              >
                Details
                <span :class="{'show': currentToggle == 'details'}">
                  <faIcon icon="chevron-down"></faIcon>
                </span>
              </li>
              <div class="dropdown-menu" :class="{'show': currentToggle == 'details'}">
                <p class="p-3">{{ detail.description }}</p>
              </div>
            </ul>
            <ul class="list-group mt-3">
              <li
                class="list-group-item dropdown d-flex justify-content-between"
                @click="openPanel('shipping')"
              >
                Shipping
                <span :class="{'show': currentToggle == 'shipping'}">
                  <faIcon icon="chevron-down"></faIcon>
                </span>
              </li>
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
import CartButton from "@/components/shopping/CartButton.vue";

@Component({
  components: { Navbar, CartButton },
  computed: mapGetters(["detail"])
})
export default class ProductDetails extends Vue {
  public detail!: IProduct;
  public productId!: number;
  public currentToggle = "details";
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
  public addToCart() {
    this.$store.dispatch("addToCart", this.detail);
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
    > span {
      transform: rotate(0);
      transition: transform 0.5s ease;
    }
    > span.show {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
  }
  .dropdown-menu {
    position: relative;
  }
  .productImage img {
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