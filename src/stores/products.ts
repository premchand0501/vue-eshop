import { Module, ActionContext } from 'vuex';
import { IProduct, Query, IProductList } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase, globalEventBus } from '@/main';

export const products: Module<IProductList, IRootStore> = {
    state: {
        products: [],
        landingProducts: [],
        landingPageCategories: []
    },
    getters: {
        allProducts(state: IProductList) {
            return state.products;
        },
        allLandingProducts(state: IProductList) {
            return state.landingProducts;
        },
        allLandingPageCategories(state: IProductList) {
            return state.landingPageCategories;
        },
    },
    mutations: {
        loadAllProducts(state: IProductList) {
            firebaseDatabase.ref('products').on('value', (snapshot) => {
                state.products = snapshot.val();
                state.products = state.products.filter(item => item != null)
            });
        },
        loadProductsByCategory(state: IProductList, query: Query) {
            console.log(query);
            if (query !== undefined) {
                firebaseDatabase.ref('products')
                    .orderByChild(query.key)
                    .equalTo(query.value)
                    .on('value', (snapshot) => {
                        state.products = snapshot.val();
                        state.products = state.products.filter(item => item != null)
                    });
            }
        },
        loadAllLandingProducts(state: IProductList) {
            firebaseDatabase.ref('products').on('value', (snapshot) => {
                state.landingProducts = snapshot.val();
                state.landingProducts = state.landingProducts.filter(item => item != null)
            });
        },
        loadLandingProductsByCategory(state: IProductList, query: Query) {
            console.log(query);
            if (query !== undefined) {
                firebaseDatabase.ref('products')
                    .orderByChild(query.key)
                    .equalTo(query.value)
                    .on('value', (snapshot) => {
                        state.landingProducts = snapshot.val();
                        state.landingProducts = state.landingProducts.filter(item => item != null)
                        if (state.landingProducts) {
                            const catSet: Set<string> = new Set<string>();
                            state.landingProducts.forEach(item => catSet.add(item.brand));
                            state.landingPageCategories = [...catSet];
                        }
                    });
            }
        },
        addNewProductToGroup(state: IProductList, item: IProduct) {
            firebaseDatabase.ref(`products/${state.products.length}`).set(item, (err) => {
                globalEventBus.$emit('addNewProductToGroup', err);
            });
        },
    },
    actions: {
        loadAllProducts(context: ActionContext<IProductList, IRootStore>) {
            context.commit('loadAllProducts');
        },
        loadProductsByCategory(context: ActionContext<IProductList, IRootStore>, query: object) {
            context.commit('loadProductsByCategory', query);
        },
        loadAllLandingProducts(context: ActionContext<IProductList, IRootStore>) {
            context.commit('loadAllLandingProducts');
        },
        loadLandingProductsByCategory(context: ActionContext<IProductList, IRootStore>, query: object) {
            context.commit('loadLandingProductsByCategory', query);
        },
        addNewProductToGroup(context: ActionContext<IProductList, IRootStore>, product: IProduct) {
            context.commit('addNewProductToGroup', product);
        },
    },
};
