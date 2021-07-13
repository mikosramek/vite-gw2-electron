import { createStore } from 'vuex';

// import { createPersistedState, createSharedMutations } from 'vuex-electron';
import options from './modules/options';

// import modules from './modules/index';

const store = createStore({
  modules : {
    options
  },
  plugins : [
    // createPersistedState(),
    // createSharedMutations()
  ]
});

// export default new Vuex.Store({
//   modules,
//   plugins : [
//     createPersistedState(),
//     createSharedMutations()
//   ],
//   strict : process.env.NODE_ENV !== 'production'
// });

export default store;
