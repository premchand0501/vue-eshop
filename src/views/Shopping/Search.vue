<template>
  <transition name="reveal">
    <div class="container-fluid searchBox fixed-top">
      <Navbar class="w-100">
        <template v-slot:navLeftButtons>
          <button class="btn btn-link backBtn" type="button" @click="goBack">
            <faIcon icon="arrow-left"></faIcon>
          </button>
        </template>
        <template v-slot:navTitle>
          <form class="input-group" @submit.prevent="searchRequest">
            <input type="text" class="form-control" v-model="searchInput" />
            <div class="input-group-append">
              <button class="btn btn-link" type="submit">
                <faIcon icon="search"></faIcon>
              </button>
            </div>
          </form>
        </template>
      </Navbar>
      <!-- <div class="container">
        <div class="row">
          <div class="col col-12">
            <transition name="fade-anim">
              <form
                v-if="showContent"
                class="input-group"
                @submit.prevent="searchRequest"
                @click.stop
                style="transition-delay: 0.2s;"
              >
                <input type="text" class="form-control" v-model="searchInput" />
                <div class="input-group-append">
                  <button class="btn btn-link" type="submit">
                    <i class="icon ion-md-search"></i>
                  </button>
                </div>
              </form>
            </transition>
            <transition name="fade-anim">
              <p
                v-if="showContent"
                class="text-light m-auto"
                style="max-width: 500px; transition-delay: 1s;"
              >
                <router-link
                  v-for="(k, i) in searchKeywords"
                  :to="`/product-details/${k}`"
                  class="badge badge-light mr-1 mb-1"
                  v-show="k.length!==0"
                  :key="`k_${i}`"
                >{{k}}</router-link>
              </p>
            </transition>
          </div>
        </div>
      </div>-->
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Navbar from "@/components/shopping/Navbar.vue";
@Component({
  components: { Navbar },
  computed: mapGetters(["searchKeywords"])
})
export default class Search extends Vue {
  public searchInput: string = "";
  public searchKeywords!: string[];

  public searchRequest(event: Event) {
    event.stopPropagation();
    console.log("submit");
    this.$store.dispatch("addSearchKeyword", this.searchInput);
  }
  goBack() {
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.searchBox {
  min-height: 100vh;
  background-color: #fff;
  .form-control {
    background: #ffffff70;
    border: none;
    border-radius: 1rem;
    max-width: 500px;
  }
  .input-group {
    margin: 0 auto;
    width: 50%;
  }
  .btn-link {
    width: 2rem;
  }
}
@media screen and (max-width: 850px) {
  .searchBox {
    .input-group {
      width: 80%;
    }
  }
}
</style>