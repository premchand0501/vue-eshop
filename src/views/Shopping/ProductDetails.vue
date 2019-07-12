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
import Navbar from "@/components/shopping/Navbar.vue";
@Component({
  components: { Navbar },
  computed: mapGetters(["detail"])
})
export default class ProductDetails extends Vue {
  detail!: IProduct;
  productId!: number;
  created() {
    this.productId = +this.$route.params.prod_id;
    console.log(this.productId);
    this.$store
      .dispatch("getProductDetails", this.productId)
      .then(() => console.log(JSON.stringify(this.detail)));
  }
  beforeDestroy() {
    this.detail = { ...this.detail, image: "" };
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