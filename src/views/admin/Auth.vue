<template>
  <div class="container-fluid">
    <div class="container bg-light p-3">
      <h3>Login to continue</h3>
      <form>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Auth extends Vue {}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 1rem auto;
}
</style>