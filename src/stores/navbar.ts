import { IRootStore } from '@/interface/IRootStore';
import { INavbarStore } from '@/interface/INavbarStore';
import { Module, ActionContext } from 'vuex';

export const navbar: Module<INavbarStore, IRootStore> = {
    state: {
        navbarToggle: false,
        searchToggle: false
    },
    getters: {
        navbarToggle(state: INavbarStore){
            return state.navbarToggle;
        },
        searchToggle(state: INavbarStore){
            return state.searchToggle;
        }
    },
    mutations: {
        toggleNavbar(state: INavbarStore, flag: boolean){
            console.log("navbarToggle", flag);
            state.navbarToggle = flag;
        },
        toggleSearch(state: INavbarStore, flag: boolean){
            state.searchToggle = flag;
        }
    },
    actions: {
        toggleNavbar(context: ActionContext<INavbarStore, IRootStore>, flag: boolean){
            context.commit('toggleNavbar', flag);
        },
        toggleSearch(context: ActionContext<INavbarStore, IRootStore>, flag: boolean){
            context.commit('toggleSearch', flag);
        }
    }
}