import { createStore } from 'vuex';

import Auth from './modules/auth.js'

export default createStore({
  modules: { Auth },
});
