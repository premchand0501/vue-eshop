import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { category } from './category';
import { user } from './user';
import { search } from './search';
import { navbar } from './navbar';
import { RootStore } from '@/interface/RootStore';

Vue.use(Vuex);

export const store: Store<RootStore> = new Vuex.Store<RootStore>({
    state: {
        version: "1.0"
    },
    modules: {
        user,
        category,
        search,
        navbar
    },
})