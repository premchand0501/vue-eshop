<template>
  <button to="/cart" class="btn btn-link" @click="cartViewToggle">
    <faIcon icon="shopping-bag"></faIcon>
    <span class="badge badge-warning" v-if="cartItems && cartItems.count">{{cartItems.count}}</span>
  </button>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { ICartItems } from "../../interface/IProduct";
@Component({
  computed: mapGetters(["cartItems", "cartToggle"])
})
export default class CartButton extends Vue {
  cartToggle!: boolean;
  cartItems!: ICartItems;
  cartViewToggle() {
    const flag: boolean = !this.cartToggle;
    this.$store.dispatch("toggleCart", flag);
  }
}
</script>
<style lang="scss" scoped>
.btn-link {
  position: relative;
  .badge {
    position: absolute;
    animation: revealAnimIn 0.5s ease forwards;
  }
}
</style>
