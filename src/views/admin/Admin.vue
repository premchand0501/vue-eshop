<template>
  <div class="container-fluid">
    <div class="container">
      <h3>Admin works</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Admin extends Vue {
  
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 1rem auto;
}
</style>