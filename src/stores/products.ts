import { Module, ActionContext } from 'vuex';
import { IProduct, Query, IProductList } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase, globalEventBus } from '@/main';

export const products: Module<IProductList, IRootStore> = {
    state: {
        group: [],
    },
    getters: {
        allProducts(state: IProductList) {
            return state.group;
        },
    },
    mutations: {
        loadAllProducts(state: IProductList) {
            firebaseDatabase.ref('products').once('value', (snapshot) => {
                state.group = snapshot.val();
                console.log(state.group);
            });
        },
        loadProductsByGroupId(state: IProductList, groupId: string) {
            firebaseDatabase.ref(`products/${groupId}`).once('value', (snapshot) => {
                state.group = snapshot.val();
                console.log(state.group);
            });
        },
        loadProductsByCategory(state: IProductList, query: Query) {
            console.log(query);
            if (query !== undefined) {
                firebaseDatabase.ref('products')
                    .orderByChild(query.key)
                    .equalTo(query.value)
                    .once('value', (snapshot) => {
                        state.group = snapshot.val();
                        console.log(state.group);
                    });
            }
        },
        addNewProductToGroup(state: IProductList, item: IProduct) {
            firebaseDatabase.ref(`products/${state.group.length}`).set(item, (err) => {
                console.log(err);
                globalEventBus.$emit('addNewProductToGroup', err);
            });
        },
    },
    actions: {
        loadAllProducts(context: ActionContext<IProductList, IRootStore>) {
            context.commit('loadAllProducts');
        },
        loadProductsByGroupId(context: ActionContext<IProductList, IRootStore>, groupId: string) {
            context.commit('loadProductsByGroupId', groupId);
        },
        loadProductsByCategory(context: ActionContext<IProductList, IRootStore>, query: object) {
            context.commit('loadProductsByCategory', query);
        },
        addNewProductToGroup(context: ActionContext<IProductList, IRootStore>, product: IProduct) {
            context.commit('addNewProductToGroup', product);
        },
    },
};
