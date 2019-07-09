<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col col-12">
                <ul class="list-group" v-if="listData.length>0">
                    <ListItem v-for='(item, index) in listData' v-bind:key="index" v-bind:item='item'/>
                </ul>
                <p class="text-center text-warning" v-else>Loading Categories..</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ListItem from './ListItem.vue';
import { IShoppingCategory } from '@/interface/ICategory';
@Component({
    components: { ListItem },
})
export default class List extends Vue {
    @Prop() public listData!: IShoppingCategory[];

}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 640px){
    .container{
        padding-left: 0;
        padding-right: 0;
        overflow-x: hidden;
    }
}
</style>
