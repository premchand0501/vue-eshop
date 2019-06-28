<template>
    <div class="container-fluid" style="padding-top: 4rem;">
        <div class="row">
            <Navbar class="w-100"/>
            <SwiperWrapper/>
            <transition name="fall-in">
                <router-view/>
            </transition>
            <template v-for="(prod, name, index) in productList">
                <ProductGroup :productProp="prod" :key="`prodGroups_${index}_${prod.id}`"/>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/shopping/Navbar.vue";
import SwiperWrapper from "@/components/shopping/SwiperWrapper.vue";
import ProductGroup from "@/components/shopping/ProductGroup.vue";
import { mapGetters } from 'vuex';
import { IProductList } from '../../interface/IProduct';

@Component({
    components:{ Navbar, SwiperWrapper, ProductGroup },
    computed: mapGetters(['productList'])
})
export default class Shopping extends Vue {
    productList!: IProductList;
    created(){
        this.$store.dispatch('loadProducts');
    }
    beforeCreate(){
        document.title = "eShop | Vuex and Firebase E-Commerce app"
    }
}
</script>
<style lang="scss" scoped>
</style>
