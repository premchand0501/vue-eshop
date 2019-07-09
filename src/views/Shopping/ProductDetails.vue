<template>
  <div class="container-fluid productGroup" v-if="detail">
    <div class="container">
      <div class="row">
        <div class="col col-12 col-md-6 col-sm-6">
          <div class="productImage">
            <img :src="detail.image" :alt="detail.name" class="img-fluid" />
          </div>
        </div>
        <div class="col col-12 col-md-6 col-sm-6">
          <div class="details">
            <router-link :to="`/product-detail/${detail.groupId}`"></router-link>
            <h2>{{detail.name}}</h2>
            <hr />
            <h4>₹{{ detail.discountedPrice }}</h4>
            <p>{{ detail.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IProduct } from "../../interface/IProduct";
@Component({
  computed: mapGetters(["detail"])
})
export default class ProductDetails extends Vue {
  public detail!: IProduct;
  public productId!: number;
  public created() {
    this.productId = +this.$route.params.prod_id;
    console.log(this.productId);
    this.$store
      .dispatch("getProductDetails", {
        key: "productId",
        value: this.productId
      })
      .then(() => console.log(JSON.stringify(this.detail)));
  }
}
</script>
<style lang="scss" scoped>
.productGroup {
  .productDetails {
    p {
      overflow: visible;
      text-overflow: initial;
      white-space: normal;
    }
  }
}
</style>