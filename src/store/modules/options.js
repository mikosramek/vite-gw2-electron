import baseOptions from '../../../baseOptions.json';

const state = {
  data : {
    ...baseOptions
  }
};

const mutations = {
  UPDATE_OPTIONS (state, newOptions) {
    state.data = {
      ...state.data,
      ...newOptions
    };
  }
};

const actions = {
  updateOptions ({ commit }, newOptions) {
    // do something async
    commit('UPDATE_OPTIONS', newOptions);
  },
  yourAction : ({ commit }, payload) => {
    commit('YOUR_MUTATION', payload);
  }
};

const getters = {
  allOptions : state => state.data
};

export default {
  state,
  mutations,
  actions,
  getters
};
