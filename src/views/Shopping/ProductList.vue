<template>
  <div class="container-fluid productGroup">
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
            <div class="productDetails text-center">
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
import { IProductList } from "../../interface/IProduct";
@Component({
  computed: mapGetters(["allProducts"])
})
export default class ProductList extends Vue {
  public allProducts!: IProductList;
  public groupId!: number;
  public created() {
    this.groupId = +this.$route.params.group_id;
    console.log(this.groupId);
    this.$store
      .dispatch("loadProductsByCategory", {
        key: "groupId",
        value: this.groupId
      })
      .then(() => console.log(JSON.stringify(this.allProducts)));
  }
}
</script>
<style lang="scss" scoped>
.productGroup {
  padding-top: 1rem;
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