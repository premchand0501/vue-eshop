import { IRootStore } from '@/interface/IRootStore';
import { INavbarStore } from '@/interface/INavbarStore';
import { Module, ActionContext } from 'vuex';

export const navbar: Module<INavbarStore, IRootStore> = {
    state: {
        navbarToggle: false,
        cartToggle: false,
    },
    getters: {
        navbarToggle(state: INavbarStore) {
            return state.navbarToggle;
        },
        cartToggle(state: INavbarStore) {
            return state.cartToggle;
        },
    },
    mutations: {
        toggleNavbar(state: INavbarStore, flag: boolean) {
            console.log('navbarToggle', flag);
            state.navbarToggle = flag;
        },
        toggleCart(state: INavbarStore, flag: boolean) {
            console.log('cartToggle', flag);
            state.cartToggle = flag;
        },
    },
    actions: {
        toggleNavbar(context: ActionContext<INavbarStore, IRootStore>, flag: boolean) {
            context.commit('toggleNavbar', flag);
        },
        toggleCart(context: ActionContext<INavbarStore, IRootStore>, flag: boolean) {
            context.commit('toggleCart', flag);
        },
    },
};
