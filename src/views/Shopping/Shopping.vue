<template>
    <div class="container-fluid" style="padding-top: 4rem;">
        <div class="row">
            <Navbar class="w-100"/>
            <SwiperWrapper/>
            <transition name="fall-in">
                <router-view/>
            </transition>
            <ProductGroup />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/shopping/Navbar.vue";
import SwiperWrapper from "@/components/shopping/SwiperWrapper.vue";
import ProductGroup from "@/components/shopping/ProductGroup.vue";

@Component({
    components:{ Navbar, SwiperWrapper, ProductGroup }
})
export default class Shopping extends Vue {
}
</script>
<style lang="scss" scoped>
</style>
