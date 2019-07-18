<template>
  <div class="container-fluid productGroup" v-if="productsFiltered">
    <div class="row border-bottom mb-3" v-if="productsFiltered[0]">
      <div class="container">
        <div class="row">
          <div class="col-12 productGroupHeader">
            <div class="groupTitle">
              <img
                :src="productsFiltered[0].image"
                alt="product"
                class="img-fluid"
                v-if="productsFiltered[0].image != ''"
              />
              <div>
                <h5>{{productsFiltered[0].brand}}</h5>
              </div>
            </div>
            <router-link
              :to="`/product-list/${productsFiltered[0].groupId}`"
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
            v-for="(prod, index) in productsFiltered"
            :key="`product_${index}`"
          >
            <div class="productWrapp">
              <router-link class="productImage" :to="`/product-details/${prod.productId}`">
                <img :src="prod.image" :alt="prod.name" class="img-fluid" />
              </router-link>
              <div class="productDetails">
                <router-link class="detail" :to="`/product-details/${prod.productId}`">
                  <p>{{ prod.name }}</p>
                  <p>
                    <span>₹{{ prod.discountedPrice }}</span>&nbsp;
                    <span class="text-decoration-line-through">{{ prod.price }}</span>&nbsp;
                    <span class="text-success">{{ prod.discount }}% off</span>
                  </p>
                </router-link>
                <button class="btn btn-outline-dark cartBtn" @click.stop="addToCart(prod)">
                  <faIcon icon="plus"></faIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/interface/IProduct";

@Component
export default class ProductGroup extends Vue {
  @Prop() public productProp!: IProduct[];
  public productsFiltered!: IProduct[];
  @Prop() public catTitle!: string;
  public created() {
    this.productsFiltered = this.productProp.filter(
      item => item.brand === this.catTitle
    );
    console.log(JSON.stringify(this.productProp));
  }
  addToCart(prod: IProduct) {
    this.$store.dispatch("addToCart", prod);
  }
}
</script>