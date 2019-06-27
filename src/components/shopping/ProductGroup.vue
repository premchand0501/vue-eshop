<template>
  <div class="container-fluid productGroup">
    <div class="row border-bottom mb-3">
      <div class="container">
        <div class="row">
          <div class="col-12 productGroupHeader">
            <div class="groupTitle">
              <img
                src="https://rukminim1.flixcart.com/image/633/633/jv5k2a80/backpack/g/s/d/daypack-dtw17bk-016c-laptop-backpack-ducati-original-imafg4gtksgekeeg.jpeg?q=100"
                alt="product"
                class="img-fluid"
              >
              <div>
                <h5>Ducati &amp; Giordano</h5>
                <p>
                  <small>Under ₹799|Backpacks</small>
                </p>
              </div>
            </div>
            <button class="btn btn-primary">View All</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col col-6 col-md-3 col-sm-4 mb-3">
            <div class="productWrapp">
              <div class="productImage">
                <img
                  src="https://rukminim1.flixcart.com/image/633/633/jv5k2a80/backpack/g/s/d/daypack-dtw17bk-016c-laptop-backpack-ducati-original-imafg4gtksgekeeg.jpeg?q=100"
                  alt="product"
                  class="img-fluid"
                >
              </div>
              <div class="productDetails text-center">
                <p>Ducati DAYPACK 24 L Laptop Backpack</p>
                <p>
                  <span>₹560</span>&nbsp;
                  <span class="text-decoration-line-through">2799</span>&nbsp;
                  <span class="text-success">79% off</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col col-6 col-md-3 col-sm-4 mb-3">
            <div class="productWrapp">
              <div class="productImage">
                <img
                  src="https://rukminim1.flixcart.com/image/633/633/jv5k2a80/backpack/g/s/d/daypack-dtw17bk-016c-laptop-backpack-ducati-original-imafg4gtksgekeeg.jpeg?q=100"
                  alt="product"
                  class="img-fluid"
                >
              </div>
              <div class="productDetails text-center">
                <p>Ducati DAYPACK 24 L Laptop Backpack</p>
                <p>
                  <span>₹560</span>&nbsp;
                  <span class="text-decoration-line-through">2799</span>&nbsp;
                  <span class="text-success">79% off</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col col-6 col-md-3 col-sm-4 mb-3">
            <div class="productWrapp">
              <div class="productImage">
                <img
                  src="https://rukminim1.flixcart.com/image/633/633/jv5k2a80/backpack/g/s/d/daypack-dtw17bk-016c-laptop-backpack-ducati-original-imafg4gtksgekeeg.jpeg?q=100"
                  alt="product"
                  class="img-fluid"
                >
              </div>
              <div class="productDetails text-center">
                <p>Ducati DAYPACK 24 L Laptop Backpack</p>
                <p>
                  <span>₹560</span>&nbsp;
                  <span class="text-decoration-line-through">2799</span>&nbsp;
                  <span class="text-success">79% off</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col col-6 col-md-3 col-sm-4 mb-3">
            <div class="productWrapp">
              <div class="productImage">
                <img
                  src="https://rukminim1.flixcart.com/image/633/633/jv5k2a80/backpack/g/s/d/daypack-dtw17bk-016c-laptop-backpack-ducati-original-imafg4gtksgekeeg.jpeg?q=100"
                  alt="product"
                  class="img-fluid"
                >
              </div>
              <div class="productDetails text-center">
                <p>Ducati DAYPACK 24 L Laptop Backpack</p>
                <p>
                  <span>₹560</span>&nbsp;
                  <span class="text-decoration-line-through">2799</span>&nbsp;
                  <span class="text-success">79% off</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class ProductGroup extends Vue {
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";
.productGroup {
  background-color: $light;
  padding: 0 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 4px transparentize($color: $dark, $amount: 0.8);
  .productDetails {
    p {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .productGroupHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    .groupTitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    h5,
    p {
      margin-bottom: 0;
    }
    img {
      max-width: 3rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
