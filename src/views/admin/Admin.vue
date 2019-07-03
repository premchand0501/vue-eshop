<template>
  <div class="container-fluid p-0">
    <div class="container">
      <h3 to="/" class="text-primary text-center mt-3">
        <em>eShop</em>
      </h3>
      <ul class="list-group">
        <p class="text-uppercase text-dark m-0" style="opacity: 0.6">
          <small>Options</small>
        </p>
        <router-link to="/admin/create-category" class="list-group-item">Create New Category</router-link>
        <router-link
          :to="{path:'/admin/product', query: {type:'add'}}"
          class="list-group-item"
        >Add New Product</router-link>
      </ul>
    </div>
    <transition name="fall-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CreateCategory from "./CreateCategory.vue";

@Component({
  components: { CreateCategory }
})
export default class Admin extends Vue {}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 1rem auto;
}
</style>