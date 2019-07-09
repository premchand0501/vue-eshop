<template>
    <div class="container profile">
        <div class="row">
            <div class="col col-12">

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import List from '@/components/shopping/List.vue';
import { IShoppingCategory } from '@/interface/ICategory';
import { ILoginData } from '@/interface/ILoginData';

@Component({
    components: {List},
    computed: mapGetters(['logginData']),
})
export default class SideMenu extends Vue {
    public logginData!: ILoginData;
}
</script>