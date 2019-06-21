import { ActionContext, Module } from 'vuex';
import { Category } from '@/interface/Category';
import { ShoppingCategory } from '@/interface/ShoppingCategory';
import { RootStore } from '@/interface/RootStore';

export const category: Module<Category, RootStore> = {
    state: {
        shoppingList: []
    },
    getters: {
        shoppingList(state: Category){
            return state.shoppingList
        }
    },
    mutations:{
        loadCategory(state: Category, items: ShoppingCategory[]){
            state.shoppingList = items;
        },
        addCategory(state: Category, item: ShoppingCategory){
            state.shoppingList.push(item);
        }
    },
    actions:{
        loadCategory(context: ActionContext<Category, RootStore>, categories: ShoppingCategory[]){
            context.commit('loadCategory', categories);
        },
        addCategory(context: ActionContext<Category, RootStore>, category: ShoppingCategory){
            context.commit('addCategory', category);
        }
    }
}