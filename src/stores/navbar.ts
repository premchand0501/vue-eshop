import { IRootStore } from '@/interface/IRootStore';
import { INavbarStore } from '@/interface/INavbarStore';
import { Module, ActionContext } from 'vuex';

export const navbar: Module<INavbarStore, IRootStore> = {
    state: {
        navbarToggle: false,
    },
    getters: {
        navbarToggle(state: INavbarStore) {
            return state.navbarToggle;
        },
    },
    mutations: {
        toggleNavbar(state: INavbarStore, flag: boolean) {
            console.log('navbarToggle', flag);
            state.navbarToggle = flag;
        },
    },
    actions: {
        toggleNavbar(context: ActionContext<INavbarStore, IRootStore>, flag: boolean) {
            context.commit('toggleNavbar', flag);
        },
    },
};
