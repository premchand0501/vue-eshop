<template>
  <div class="container">
    <div ref="swiperContainer" class="swiper-container">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div>
        <button class="btn btn-link swiper-button-prev" ref="mySwiperPrevBtn"></button>
        <button class="btn btn-link swiper-button-next" ref="mySwiperNextBtn"></button>
      </div>
      <div class="swiper-pagination" ref="mySwiperPagination"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Swiper, { SelectableElement, SwiperOptions, NavigationOptions } from "swiper";

@Component
export default class SwiperWrapper extends Vue {
  mySwiper!: Swiper;
  mySwiperNextBtn!: HTMLElement;
  mySwiperPrevBtn!: HTMLElement;
  mySwiperPagination!: HTMLElement;
  swiperOptions!: SwiperOptions;

  mounted() {
    this.swiperOptions = {
      autoplay: true,
      spaceBetween: 20,
      navigation: {
        nextEl: this.$refs.mySwiperNextBtn as SelectableElement,
        prevEl: this.$refs.mySwiperPrevBtn as SelectableElement
      }
    };
    console.log(this.mySwiperNextBtn);
    this.mySwiper = new Swiper(
      this.$refs.swiperContainer as SelectableElement,
      this.swiperOptions
    );
  }
  nextSlide() {
    // this.mySwiper.navigation();
  }
  prevSlide() {}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';
@import url("~swiper/dist/css/swiper.min.css");

.swiper-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 30vh;

  .swiper-slide {
    background-color: $light;
    border-radius: 0.25rem;
    padding: 1rem;
    margin-right: 1rem;
  }
  .swiper-button-next {
    transform: scale(0.6);
    right: 0;
  }
  .swiper-button-prev {
    transform: scale(0.6);
    left: 0;
  }
}
</style>
