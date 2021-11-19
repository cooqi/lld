
const state = {
  cachedViews: []// keep-alive的组件
}

const mutations = {
  SET_CACHE: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (view.meta.keepAlive) {
      state.cachedViews.push(view.name)
    }
  }
}

const actions = {
  setCache ({ commit }, view) {
    commit('SET_CACHE', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
