import { ActionContext, Module } from 'vuex';
import { ICategory, IShoppingCategory } from '@/interface/ICategory';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseStorage } from '@/main';

export const category: Module<ICategory, IRootStore> = {
    state: {
        shoppingList: []
    },
    getters: {
        shoppingList(state: ICategory){
            return state.shoppingList
        }
    },
    mutations:{
        loadCategory(state: ICategory){
            firebaseStorage.ref('categories').on('value', (snapshot)=>{
                state.shoppingList = snapshot.val();
                console.log(state.shoppingList);
            })
        },
        addCategory(state: ICategory, item: IShoppingCategory){
            firebaseStorage.ref('categories/'+state.shoppingList.length).set(item);
        }
    },
    actions:{
        loadCategory(context: ActionContext<ICategory, IRootStore>){
            context.commit('loadCategory');
        },
        addCategory(context: ActionContext<ICategory, IRootStore>, category: IShoppingCategory){
            context.commit('addCategory', category);
        }
    }
}