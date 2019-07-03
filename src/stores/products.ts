import { Module, ActionContext } from 'vuex';
import { IProduct, IProductList } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase, globalEventBus } from '@/main';

export const products: Module<IProductList, IRootStore> = {
    state: {
        group: [],
    },
    getters: {
        allProducts(state: IProductList) {
            return state.group;
        }
    },
    mutations: {
        loadAllProducts(state: IProductList, groupId: string) {
            if(groupId != ''){
                console.log(groupId);
                const ref = firebaseDatabase.ref('products');
                const onValueChange = 
                ref.orderByChild('groupId').equalTo(parseInt(groupId)).on('value', (snapshot) => {
                    state.group = snapshot.val();
                    console.log(state.group);
                    ref.off('value', onValueChange);
                });
            }
            else{
                firebaseDatabase.ref('products').on('value', (snapshot) => {
                    state.group = snapshot.val();
                    console.log(state.group);
                })
            }
        },
        addNewProductToGroup(state: IProductList, item: IProduct) {
            firebaseDatabase.ref(`products/${state.group.length}`).set(item, (err)=>{
                console.log(err);
                globalEventBus.$emit('addNewProductToGroup', err);
            })
        }
    },
    actions: {
        loadAllProducts(context: ActionContext<IProductList, IRootStore>, groupId: string) {
            context.commit('loadAllProducts', groupId);
        },
        addNewProductToGroup(context: ActionContext<IProductList, IRootStore>, product: IProduct) {
            context.commit('addNewProductToGroup', product);
        }
    }
}