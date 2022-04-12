export default {
  newIncome (state, payload) {
    state.income.push(payload)
  },
  newExpense (state, payload) {
    state.expenses.push(payload)
  },
  removeIncome (state, id) {
    state.income.splice(id, 1)
  },
  removeExpense (state, id) {
    state.expenses.splice(id, 1)
  }
}
