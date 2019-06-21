<template>
    <div class="container profile">
        <div class="row">
            <div class="col col-12">

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapGetters } from 'vuex';
import List from "@/components/shopping/List.vue";
import {ShoppingCategory} from '@/interface/ShoppingCategory';
import {LoginData} from '@/interface/LoginData';

@Component({
    components: {List},
    computed: mapGetters(['logginData'])
})
export default class SideMenu extends Vue{
    logginData!: LoginData;
}
</script>