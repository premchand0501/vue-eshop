import { ILoginData, ILoginCredentials, IUserData } from '@/interface/ILoginData';
import { Module, ActionContext } from 'vuex';
import { IRootStore } from '@/interface/IRootStore';

import { firebaseAuth } from '@/main';

export const user: Module<ILoginData, IRootStore> = {
    state: {
        loginStatus: false,
        profileData: {},
        errors: []
    },
    getters: {
        loginStatus(state: ILoginData) {
            return state.loginStatus;
        },
        profileData(state: ILoginData) {
            return state.profileData;
        },
        getErrors(state: ILoginData) {
            return state.errors;
        }
    },
    mutations: {
        async loginUser(state: ILoginData, userData: ILoginCredentials) {
            firebaseAuth
                .signInWithEmailAndPassword(userData.email, userData.password)
                .then(res => {
                    if (res.user != null) {
                        const firebaseData: IUserData = {
                            name: res.user.displayName!,
                            email: res.user.email!,
                            refreshToken: res.user.refreshToken
                        }
                        state.profileData = {...firebaseData};
                    }
                })
                .catch(err => console.log(err));
        }
    },
    actions: {
        loginUser(context: ActionContext<ILoginData, IRootStore>, userData: ILoginCredentials) {
            context.commit('loginUser', userData);
        }
    }
}