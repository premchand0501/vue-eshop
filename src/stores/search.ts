import { ActionContext, Module } from 'vuex';
import { Search } from '@/interface/Search';
import { RootStore } from '@/interface/RootStore';

export const search:Module<Search, RootStore> = {
    state: {
        searchKeywords: []
    },
    getters: {
        searchKeywords(state: Search){
            return state.searchKeywords;
        }
    },
    mutations: {
        addSearchKeyword(state: Search, item: string){
            if(item !== ''){
                const searches:string[] = state.searchKeywords.filter(i=>i.length > 0);
                searches.push(item);
                state.searchKeywords = [...searches];
                console.log(JSON.stringify(state.searchKeywords));
            }
        }
    },
    actions: {
        addSearchKeyword(context: ActionContext<Search, RootStore>, searchKey: string){
            context.commit('addSearchKeyword', searchKey);
        }
    }
}