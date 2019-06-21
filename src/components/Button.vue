<template>
  <button v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private msg!: string;
}
</script>
<style lang="scss" scoped>
.btn{
  img{
    height: 1rem;
  }
  img:first-child{
    margin-right: 0.5rem;
  }
  img:last-child{
    margin-left: 0.5rem;
  }
}
</style>
