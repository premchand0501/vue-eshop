<template>
  <li class="list-group-item">
    <span
      class="iconBase"
      @click="toggleMenu(item.name, item.items)"
      :style="{backgroundColor: item.color}"
      :class="{'scaleYAnim': currentItemMenuVisible === item.name}"
    >
      <img :alt="item.title" v-if="item.iconType == 'image'" :src="item.icon" />
      <faIcon :icon="`${item.icon}`"></faIcon>
    </span>
    <span @click="toggleMenu(item.name)">
      {{item.title}}
      <transition-group
        class="dropdown"
        tag="ul"
        name="scale-fade"
        v-if="item.items && currentItemMenuVisible === item.name"
      >
        <router-link
          class="dropdown-item"
          @click.stop
          v-for="(it, ind) in item.items"
          :key="`item_${ind}`"
          :data-index="ind"
          :to="`${item.groupId}?subcat=${it}`"
          :style="{transitionDelay: `${ind/5}s`}"
        >
          <span>{{it}}</span>
          <button class="btn btn-link">
            <faIcon icon="arrow-right"></faIcon>
          </button>
        </router-link>
      </transition-group>
      <button class="btn btn-link text-dark float-right">
        <faIcon icon="arrow-right"></faIcon>
      </button>
    </span>
  </li>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IShoppingCategory } from "@/interface/ICategory";
@Component
export default class ListItem extends Vue {
  @Prop() public item!: IShoppingCategory;
  public currentItemMenuVisible: string = "";
  public toggleMenu(menuName: string, subCat: string[]) {
    if (subCat && subCat.length > 0) {
      if (this.currentItemMenuVisible === "") {
        this.currentItemMenuVisible = menuName;
      } else {
        this.currentItemMenuVisible = "";
      }
    } else {
      this.$router.push({ path: `product-list/${this.item.groupId}` });
      this.$store.dispatch("toggleNavbar", false);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

.list-group-item {
  line-height: 4rem;
  background-color: $light;
  color: $dark;
  border-bottom: 1px solid $light-dark;
  display: table;

  > span {
    line-height: 2.4rem;
    cursor: pointer;
    display: table-cell;
  }
  // > span:last-child {
  //   padding-left: 1rem;
  // }

  .iconBase {
    cursor: pointer;
    width: 2.5rem;
    max-height: 2.5rem;
    background-color: white;
    border-radius: 1.25rem;
    mix-blend-mode: darken;
    text-align: center;
    img {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.5rem;
    }
  }

  .dropdown {
    line-height: 3rem;
    flex-basis: 100%;
    animation: fadeUp 0.25s ease forwards 1;
    transform-origin: 0 0;
    padding: 0;
    .dropdown-item {
      background-color: $light-dark;
      color: $dark;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.5rem;
      transform-origin: 0 0;
      font-size: 0.9rem;
      border-bottom: 1px solid $light-dark;

      .btn-link {
        color: inherit;
      }
    }
  }
}
.scaleYAnim {
  animation: scaleYAnim 0.25s ease 1 forwards;
  transform-origin: 0 0;
}
.list-group-item:first-child {
  border-top: 1px solid $light-dark;
}

.scale-fade-enter-active {
  animation: fadeUp 0.25s ease forwards 1;
}
.scale-fade-leave-active {
  animation: fadeUp 0.25s ease reverse 1;
}
@media screen and (max-width: 640px) {
  .list-group-item {
    border-radius: 0;
  }
}
@keyframes fadeUp {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(100%);
    opacity: 1;
  }
}
@keyframes scaleYAnim {
  0% {
    transform: scaleY(2.5rem);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
