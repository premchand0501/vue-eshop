<template>
  <div class="container-fluid productGroup">
    <div class="container">
      <div class="row">
        <div
          class="col col-6 col-md-3 col-sm-4 mb-3"
          v-for="(prod, index) in allProducts"
          :key="`product_${index}`"
        >
          <div class="productWrapp">
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
          </div>
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
  allProducts!: IProductList;
  category!: string;
  created() {
    this.category = this.$route.params.group_id;
    console.log(this.category);
    this.$store.dispatch("loadAllProducts", this.category)
    .then(()=>console.log(JSON.stringify(this.allProducts)));
  }
}
</script>
<style lang="scss" scoped>
</style>