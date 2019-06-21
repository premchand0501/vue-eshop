<template>
    <div class="container-fluid fixed-top bg-color create">
        <div class="row">
            <div class="col col-12">
                <form @submit.prevent="addNewCategory">
                    <h2>Add New Category</h2>
                    <div class="form-group">
                        <input type="text" placeholder="Category Name" class="form-control" 
                        v-model="categoryData.title" required/>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Icon name" class="form-control" 
                        v-model="categoryData.icon" required/>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Color name or code" class="form-control" 
                        v-model="categoryData.color" required/>
                    </div>
                    <div class="form-group">
                        <select class="form-control w-100" v-model="categoryData.iconType">
                            <option value="icon">Icon</option>
                            <option value="image">Image</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Sub Categories" class="form-control" 
                        v-model="categoryData.items" required/>
                        <p><small>Seperate multiple sub categories with comma.</small></p>
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                    <button type="submit" class="btn btn-outline-dark ml-3" @click="goBack">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {ShoppingCategory} from '@/interface/ShoppingCategory';

@Component
export default class CreateCategory extends Vue{
    categoryData = {
        title: "Facebook",
        icon: "logo-facebook",
        color: "red",
        iconType: "icon",
        items: "news, status"
    }
    addNewCategory(){
        Object.values(this.categoryData).forEach(item=>{
            if(item == ""){
                return;
            }
        });
        const listItem: string[] = this.categoryData.items.trim().split(",");
        const category: ShoppingCategory = { 
            ...this.categoryData, 
            icon: this.categoryData.iconType==='image'?this.categoryData.icon+'.svg':this.categoryData.icon,
            items: listItem.map(i=>i.trim()) 
        };
        this.$store.dispatch('addCategory', category);
        this.goBack();
    }
    goBack(){
        this.$router.replace('/');
    }
}
</script>
<style lang="scss" scoped>
.create{
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    form{
        max-width: 500px;
        margin: 0 auto;
        background-color: #fff;
        padding: 1rem;
        margin-top: 2rem;
    }
}
</style>
