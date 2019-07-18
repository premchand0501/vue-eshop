import { ActionContext, Module } from 'vuex';
import { ICartItems, IProduct } from '@/interface/IProduct';
import { IRootStore } from '@/interface/IRootStore';
import { globalEventBus } from '@/main';
import { ISnackbarInfo } from '@/interface/ISnackbarInfo';

export const cart: Module<ICartItems, IRootStore> = {
  state: {
    products: [],
    count: 0
  },
  getters: {
    cartItems(state: ICartItems) {
      state.count = state.products.length;
      return { ...state };
    },
  },
  mutations: {
    addToCart(state: ICartItems, item: IProduct) {
      const ifAlreadyInCart = state.products.filter(prod => prod.productId == item.productId);
      if (ifAlreadyInCart.length == 0 && item !== null) {
        state.products.push(item);
        globalEventBus.$emit('snackbar', { title: 'Cart', desc: `${item.name} added to cart`, dismissBtnTitle: '', flag: true } as ISnackbarInfo);
      }
      else {
        globalEventBus.$emit('snackbar', { title: 'Cart', desc: 'Product already present in cart', dismissBtnTitle: '', flag: true } as ISnackbarInfo);
      }
    },
    removeFromCart(state: ICartItems, item: IProduct) {
      if (item !== null) {
        const newProdList = state.products.filter(prod => prod.productId !== item.productId);
        state.products = newProdList;
      }
    },
  },
  actions: {
    addToCart(context: ActionContext<ICartItems, IRootStore>, item: IProduct) {
      context.commit('addToCart', item);
    },
    removeFromCart(context: ActionContext<ICartItems, IRootStore>, item: IProduct) {
      context.commit('removeFromCart', item);
    }
  },
};
