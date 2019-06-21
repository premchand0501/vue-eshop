import { LoginData } from '@/interface/LoginData';
import { Module } from 'vuex';
import { RootStore } from '@/interface/RootStore';

export const user: Module<LoginData, RootStore> = {
    state: {
        loginStatus: false,
        profileData: undefined
    },
    getters: {
        loginStatus(state: LoginData){
            return state.loginStatus;
        },
        profileData(state: LoginData){
            return state.profileData;
        }
    },
    mutations: {

    }
}