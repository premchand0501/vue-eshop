import { ActionContext, Module } from 'vuex';
import { ISearch } from '@/interface/ISearch';
import { IRootStore } from '@/interface/IRootStore';

export const search: Module<ISearch, IRootStore> = {
    state: {
        searchKeywords: [],
    },
    getters: {
        searchKeywords(state: ISearch) {
            return state.searchKeywords;
        },
    },
    mutations: {
        addSearchKeyword(state: ISearch, item: string) {
            if (item !== '') {
                const searches: string[] = state.searchKeywords.filter((i) => i.length > 0);
                searches.push(item);
                state.searchKeywords = [...searches];
                console.log(JSON.stringify(state.searchKeywords));
            }
        },
    },
    actions: {
        addSearchKeyword(context: ActionContext<ISearch, IRootStore>, searchKey: string) {
            context.commit('addSearchKeyword', searchKey);
        },
    },
};
