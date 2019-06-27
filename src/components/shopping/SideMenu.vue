<template>
  <div class="container sidemenu p-0" @click="hideMenu">
    <div class="container" @click.stop>
      <List v-bind:listData="shoppingList" v-if="shoppingList"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import List from "@/components/shopping/List.vue";
import { ShoppingCategory } from "@/interface/ShoppingCategory";
import { mapGetters } from 'vuex';

@Component({
  components: { List },
  computed: mapGetters(['shoppingList'])
})
export default class SideMenu extends Vue {
  shoppingList!: ShoppingCategory[];

  created() {
    this.getCategories();
  }
  hideMenu() {
    this.$store.dispatch('toggleNavbar', false);
  }
  async getCategories() {
    const res = await fetch("http://localhost:4000/categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Type': 'application/json'
      },
      body: JSON.stringify( { query: '{categories}'})
    });
    const jsonData = await res.json();
    if (jsonData.hasOwnProperty("category_list")) {
      const categories: ShoppingCategory[] = jsonData[
        "category_list"
      ] as ShoppingCategory[];
      this.$store.dispatch("loadCategory", categories);
      console.log(this.shoppingList);
    }
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
  max-width: 100%;
  display: block;
  cursor: w-resize;
  z-index: 1030;

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
    background-color: darken($light-dark, 5%);
    overflow-y: hidden;
  }
}
</style>
