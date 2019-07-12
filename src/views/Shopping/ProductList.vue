<template>
  <div class="container-fluid productGroup fixed-top" v-if="allProducts && allProducts.length> 0">
    <Navbar class="w-100">
      <template v-slot:navLeftButtons>
        <button class="btn btn-link backBtn" type="button" @click="goBack">
          <faIcon icon="arrow-left"></faIcon>
          <span class="pl-3">{{allProducts[0].brand}}</span>
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
        <div
          class="col col-6 col-md-3 col-sm-4"
          v-for="(prod, index) in allProducts"
          :key="`product_${index}`"
        >
          <router-link class="productWrapp" :to="`/product-details/${prod.productId}`">
            <div class="productImage">
              <img :src="prod.image" :alt="prod.name" class="img-fluid" />
            </div>
            <div class="productDetails">
              <p class="m-0">{{ prod.name }}</p>
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
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IProductList, Query, IProduct } from "@/interface/IProduct";
import Navbar from "@/components/shopping/Navbar.vue";
@Component({
  components: { Navbar },
  computed: mapGetters(["allProducts"])
})
export default class ProductList extends Vue {
  allProducts!: IProduct[];
  groupId!: number;
  created() {
    console.log(this.allProducts);
    this.groupId = +this.$route.params.group_id;
    console.log(this.groupId);
    this.$store
      .dispatch("loadProductsByCategory", {
        key: "groupId",
        value: this.groupId
      } as Query)
      .then(() => console.log(JSON.stringify(this.allProducts)));
  }
  goBack() {
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.productGroup {
  min-height: 100vh;
  padding-top: 5rem;
  .col:nth-child(odd) {
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  .col:nth-child(2) {
    border-top: 1px solid #ddd;
  }
  .col {
    padding-top: 0.5rem;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
}
</style>