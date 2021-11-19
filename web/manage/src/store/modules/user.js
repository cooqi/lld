
const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data
  }
}

const actions = {
  setToken ({ commit }, data) {
    commit('SET_TOKEN', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
