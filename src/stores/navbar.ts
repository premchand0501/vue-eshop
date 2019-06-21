import { RootStore } from '@/interface/RootStore';
import { NavbarStore } from '@/interface/NavbarStore';
import { Module, ActionContext } from 'vuex';

export const navbar: Module<NavbarStore, RootStore> = {
    state: {
        navbarToggle: false,
        searchToggle: false
    },
    getters: {
        navbarToggle(state: NavbarStore){
            return state.navbarToggle;
        },
        searchToggle(state: NavbarStore){
            return state.searchToggle;
        }
    },
    mutations: {
        toggleNavbar(state: NavbarStore, flag: boolean){
            console.log("navbarToggle", flag);
            state.navbarToggle = flag;
        },
        toggleSearch(state: NavbarStore, flag: boolean){
            state.searchToggle = flag;
        }
    },
    actions: {
        toggleNavbar(context: ActionContext<NavbarStore, RootStore>, flag: boolean){
            context.commit('toggleNavbar', flag);
        },
        toggleSearch(context: ActionContext<NavbarStore, RootStore>, flag: boolean){
            context.commit('toggleSearch', flag);
        }
    }
}