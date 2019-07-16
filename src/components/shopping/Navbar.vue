<template>
  <nav class="navbar navbar-expand-xs navbar-dark fixed-top shoppingNav">
    <slot name="navLeftButtons"></slot>
    <slot name="navTitle"></slot>
    <slot name="navRightButtons"></slot>
  </nav>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {}
</script>