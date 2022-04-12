// actions can run asynchronously
// mutations don't

export default {
  addIncome ({ commit }, payload) {
    commit('newIncome', payload)
  },
  addExpense ({ commit }, payload) {
    commit('newExpense', payload)
  },
  deleteIncome ({ commit }, id) {
    commit('removeIncome', id)
  },
  deleteExpense ({ commit }, id) {
    commit('removeExpense', id)
  }
}
