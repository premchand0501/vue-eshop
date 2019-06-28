import { ILoginData } from '@/interface/ILoginData';
import { Module } from 'vuex';
import { IRootStore } from '@/interface/IRootStore';

export const user: Module<ILoginData, IRootStore> = {
    state: {
        loginStatus: false,
        profileData: undefined
    },
    getters: {
        loginStatus(state: ILoginData){
            return state.loginStatus;
        },
        profileData(state: ILoginData){
            return state.profileData;
        }
    },
    mutations: {

    }
}