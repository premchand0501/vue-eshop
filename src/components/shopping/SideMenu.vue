<template>
  <div class="container sidemenu p-0" @click="hideMenu">
    <div class="container" @click.stop>
      <List v-bind:listData="shoppingList" v-if="shoppingList" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import List from "@/components/shopping/List.vue";
import { IShoppingCategory } from "@/interface/ICategory";
import { mapGetters } from "vuex";

@Component({
  components: { List },
  computed: mapGetters(["shoppingList"])
})
export default class SideMenu extends Vue {
  public shoppingList!: IShoppingCategory[];
  public created() {
    this.$store
      .dispatch("loadCategory")
      .then(() => console.log(this.shoppingList));
    console.log("sidemenu");
  }
  public hideMenu() {
    this.$store.dispatch("toggleNavbar", false);
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/_variables.scss";
.sidemenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  max-width: 320px;
  display: block;
  cursor: w-resize;
  z-index: 1029;

  > .container {
    cursor: auto;
    max-width: 320px;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    overflow-y: auto;
    padding-top: 4rem !important;
  }
}
@media screen and (max-width: 850px) {
  .sidemenu {
    max-width: 100%;
    z-index: 1030;
    > .container {
      padding-top: 0 !important;
    }
  }
}
</style>
