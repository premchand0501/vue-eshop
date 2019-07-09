<template>
  <div class="container-fluid productGroup" v-if="productProp">
    <div class="row border-bottom mb-3" v-if="productProp[0]">
      <div class="container">
        <div class="row">
          <div class="col-12 productGroupHeader">
            <div class="groupTitle">
              <img
                :src="productProp[0].image"
                alt="product"
                class="img-fluid"
                v-if="productProp[0].image != ''"
              />
              <div>
                <h5>{{productProp[0].brand}}</h5>
              </div>
            </div>
            <router-link
              :to="`/product-list/${productProp[0].groupId}`"
              class="btn btn-primary"
            >View All</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <div
            class="col col-6 col-md-3 col-sm-4 mb-3"
            v-for="(prod, index) in productProp"
            :key="`product_${index}`"
          >
            <router-link class="productWrapp" :to="`/product-details/${prod.productId}`">
              <div class="productImage">
                <img :src="prod.image" :alt="prod.name" class="img-fluid" />
              </div>
              <div class="productDetails text-center">
                <p>{{ prod.name }}</p>
                <p>
                  <span>₹{{ prod.discountedPrice }}</span>&nbsp;
                  <span class="text-decoration-line-through">{{ prod.price }}</span>&nbsp;
                  <span class="text-success">{{ prod.discount }}% off</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "../../interface/IProduct";

@Component
export default class ProductGroup extends Vue {
  @Prop() public productProp!: IProduct;
  created() {
    console.log(JSON.stringify(this.productProp));
  }
}
</script>