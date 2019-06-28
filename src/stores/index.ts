import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { category } from './category';
import { user } from './user';
import { search } from './search';
import { navbar } from './navbar';
import { landingPageProducts } from './landingPageProducts';
import { IRootStore } from '@/interface/IRootStore';

Vue.use(Vuex);

export const store: Store<IRootStore> = new Vuex.Store<IRootStore>({
    state: {
        version: "1.0"
    },
    modules: {
        user,
        category,
        search,
        navbar,
        landingPageProducts
    },
})