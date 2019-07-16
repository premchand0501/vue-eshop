import { ActionContext, Module } from 'vuex';
import { IRootStore } from '@/interface/IRootStore';
import { ISlideData } from '@/interface/ISlides';
import { firebaseDatabase } from '@/main';

export const slides: Module<ISlideData, IRootStore> = {
  state: {
    slides: [],
  },
  getters: {
    slides(state: ISlideData) {
      return state.slides;
    },
  },
  mutations: {
    loadAllSlides(state: ISlideData, item: string) {
      firebaseDatabase.ref(`Slides`).on('value', (snapshot) => {
        state.slides = snapshot.val();
      })
    }
  },
  actions: {
    loadAllSlides(context: ActionContext<ISlideData, IRootStore>, searchKey: string) {
      context.commit('loadAllSlides', searchKey);
    }
  },
};
