<template>
  <div class="container-fluid p-0">
    <div ref="swiperContainer" class="swiper-container">
      <div class="swiper-wrapper" v-if="slides">
        <!-- Slides -->
        <div class="swiper-slide" v-for="(slide, index) in slides" :key="`slide_${index}`">
          <router-link :to="slide.details.link">
            <img
              :src="slide.imageUrl"
              :alt="slide.details.title"
              class="swiper-lazy"
              @load="updateSwiper"
            />
          </router-link>
        </div>
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
import Swiper, {
  SelectableElement,
  SwiperOptions,
  NavigationOptions
} from "swiper";
import { firebaseDatabase } from "../../main";
import { mapGetters } from "vuex";
import { ISlides } from "@/interface/ISlides";

@Component({
  computed: mapGetters(["slides"])
})
export default class SwiperWrapper extends Vue {
  slides!: ISlides[];
  public mySwiper!: Swiper;
  public mySwiperNextBtn!: HTMLElement;
  public mySwiperPrevBtn!: HTMLElement;
  public mySwiperPagination!: HTMLElement;
  public swiperOptions!: SwiperOptions;
  public created() {
    window.addEventListener("resize", this.updateSwiper);
    this.$store.dispatch("loadAllSlides").then(() => this.updateSwiper());
  }
  public updateSwiper() {
    this.mySwiper.update();
    this.mySwiper.detachEvents();
    this.mySwiper.attachEvents();
  }
  public mounted() {
    this.swiperOptions = {
      autoplay: true,
      spaceBetween: 20,
      lazy: true,
      preloadImages: false,
      navigation: {
        nextEl: this.$refs.mySwiperNextBtn as HTMLElement,
        prevEl: this.$refs.mySwiperPrevBtn as HTMLElement
      },
      pagination: {
        el: this.$refs.mySwiperPagination as HTMLElement,
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 1
        },
        1200: {
          slidesPerView: 2
        },
        1920: {
          slidesPerView: 3
        }
      }
    };
    this.mySwiper = new Swiper(
      this.$refs.swiperContainer as HTMLElement,
      this.swiperOptions
    );
  }
  public beforeDestroy() {
    window.removeEventListener("resize", this.updateSwiper);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";
@import url("~swiper/dist/css/swiper.min.css");

.swiper-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 30vh;

  .swiper-slide {
    background-color: $light;
    border-radius: 0.25rem;
    margin-right: 1rem;
    background: #ddd no-repeat center / contain;
    border: 1px solid #ddd;
    overflow: hidden;
    img {
      object-fit: cover;
      height: 30vh;
      width: 100%;
    }
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
