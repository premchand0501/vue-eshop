<template>
  <transition name="slide-fade-right">
    <div class="container-fluid fixed-top cartView" v-if="cartToggle" @click="hideCartMenu">
      <div class="container mb-3" @click.stop>
        <h2>Your Cart</h2>
        <hr />
        <ul class="list-group" v-if="cartItems && cartItems.products.length>0">
          <li class="list-group-item" v-for="(prod, index) in cartItems.products" :key="index">
            <router-link class="productWrapp" :to="`/product-details/${prod.productId}`">
              <div class="productImage">
                <img :src="prod.image" :alt="prod.name" class="img-fluid" />
              </div>
              <div class="productDetails">
                <p class="m-0">{{ prod.name }}</p>
                <p class="m-0">
                  <span>₹{{ prod.discountedPrice }}</span>&nbsp;
                  <span class="text-decoration-line-through">{{ prod.price }}</span>&nbsp;
                  <span class="text-success">{{ prod.discount }}% off</span>
                </p>
              </div>
            </router-link>
            <button class="btn btn-danger hiddenBtn" @click="removeFromCart(prod)">&times;</button>
          </li>
        </ul>
        <div class="row" v-else>
          <div class="col col-12">
            <p>No Products in cart</p>
            <button class="btn btn-warning" @click="hideCartMenu">Start Shopping</button>
          </div>
        </div>
        <div class="col col-12 cartTotal">
          <h5 class="d-flex justify-content-between">
            <span>Total Payable</span>
            <span>
              <strong>₹{{totalCartAmt}}</strong>
            </span>
          </h5>
          <button class="btn btn-warning w-100">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { ICartItems, IProduct } from "@/interface/IProduct";

@Component({
  computed: mapGetters(["cartItems", "cartToggle"])
})
export default class Cart extends Vue {
  cartItems!: ICartItems;
  cartToggle!: boolean;
  hideCartMenu() {
    this.$store.dispatch("toggleCart", false);
  }
  get totalCartAmt() {
    let amt = 0;
    this.cartItems.products.map(prod => {
      amt += prod.discountedPrice;
    });
    return amt;
  }
  removeFromCart(prod: IProduct) {
    this.$store.dispatch("removeFromCart", prod);
  }
}
</script>
<style lang="scss" scoped>
.cartView {
  width: 100%;
  min-height: 100vh;
  left: auto;
  cursor: e-resize;

  > .container {
    max-width: 320px;
    min-height: 100vh;
    background-color: #fff;
    margin-right: -15px;
    overflow-y: auto;
    height: 100vh;
    padding-top: 2rem;
    cursor: auto;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    position: relative;

    .cartTotal {
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 1rem;
      width: 320px;
      background-color: white;
      box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.2);
    }
    .list-group {
      margin-bottom: 120px;
      .list-group-item {
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > a {
          color: inherit;
        }
      }
    }
    .productWrapp {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .productImage {
        height: 80px;
        width: 80px;
        margin: 0;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 80px;
        img {
          max-height: 80px;
        }
      }
      .productDetails {
        flex-basis: calc(100% - 80px);
      }
    }
  }
}
</style>