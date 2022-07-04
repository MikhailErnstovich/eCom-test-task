import { auth } from '@api';

export default {
  namespaced: true,

  state: () => ({
    authKey: '',
  }),

  actions: {
    async login({ commit }, payload) {
      try {
        const { url, id } = payload;
        const data = await auth.login(url, id);
        if (data.message === 'ok') {
          commit('setAuthKey', id);
        }
      }
      catch (err) {
        throw err;
      }
    }
  },
  
  mutations: {
    setAuthKey(state, data) {
      state.authKey = data;
    }
  },

  getters: {
    getAuthKey(state) {
      return state.authKey;
    }
  }
};