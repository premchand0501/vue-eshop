import { Module, ActionContext } from 'vuex';
import { IProductGroup, IProduct, IProductList } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase } from '@/main';

export const landingPageProducts: Module<IProductList, IRootStore> = {
    state: {
        group: [],
    },
    getters: {
        productList(state: IProductList){
            return state.group;
        }
    },
    mutations: {
        loadProducts(state: IProductList){
            console.log("loadProducts");
            firebaseDatabase.ref('landing-page-products').on('value', (snapshot)=>{
                state.group = snapshot.val();
                console.log(state.group);
            })
        },
        addProductToGroup(state: IProductList, item: IProduct){
            state.group.forEach((grp: IProductGroup)=>{
                if(grp.id == item.groupId){
                    firebaseDatabase.ref(`landing-page-products/${grp.id}/${grp.products.length}`).set(item);
                }
            })
        }
    },
    actions:{
        loadProducts(context: ActionContext<IProductList, IRootStore>){
            context.commit('loadProducts');
        },
        addProductToGroup(context: ActionContext<IProductList, IRootStore>, productGroup: IProductGroup){
            context.commit('addProductToGroup', productGroup);
        }
    }
}