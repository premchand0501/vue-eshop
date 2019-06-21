<template>
    <div class="container-fluid">
        <div class="row">
            <Navbar class="w-100"/>
            <SwiperWrapper/>
            <transition name="fall-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/shopping/Navbar.vue";
import SwiperWrapper from "@/components/shopping/SwiperWrapper.vue";

@Component({
    components:{ Navbar, SwiperWrapper }
})
export default class Shopping extends Vue {
}
</script>
<style lang="scss" scoped>
</style>
