import { ActionContext, Module } from 'vuex';
import { ICategory, IShoppingCategory } from '@/interface/ICategory';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase } from '@/main';

export const category: Module<ICategory, IRootStore> = {
    state: {
        categoryList: [],
    },
    getters: {
        shoppingList(state: ICategory) {
            return state.categoryList;
        },
    },
    mutations: {
        loadCategory(state: ICategory) {
            firebaseDatabase.ref('categories').once('value', (snapshot) => {
                state.categoryList = snapshot.val();
            });
        },
        addCategory(state: ICategory, item: IShoppingCategory) {
            firebaseDatabase.ref('categories/' + state.categoryList.length).set({ ...item, groupId: state.categoryList.length });
        },
    },
    actions: {
        loadCategory(context: ActionContext<ICategory, IRootStore>) {
            context.commit('loadCategory');
        },
        addCategory(context: ActionContext<ICategory, IRootStore>, category: IShoppingCategory) {
            context.commit('addCategory', category);
        },
    },
};
