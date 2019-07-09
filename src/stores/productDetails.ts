import { Module, ActionContext } from 'vuex';
import { Query, IProductDetails, IProduct } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseDatabase } from '@/main';

export const productDetails: Module<IProductDetails, IRootStore> = {
  state: {
    detail: undefined
  },
  getters: {
    detail(state: IProductDetails) {
      return state.detail;
    },
  },
  mutations: {
    getProductDetails(state: IProductDetails, query: Query) {
      console.log(query);
      if (query !== undefined) {
        firebaseDatabase.ref('products')
          .orderByChild(query.key)
          .equalTo(query.value, query.key)
          .once('value', (snapshot) => {
            state.detail = snapshot.val();
            console.log('details', JSON.stringify(state.detail));
          });
      }
    }
  },
  actions: {
    getProductDetails(context: ActionContext<IProductDetails, IRootStore>, productId: number) {
      context.commit('getProductDetails', productId);
    }
  },
};
