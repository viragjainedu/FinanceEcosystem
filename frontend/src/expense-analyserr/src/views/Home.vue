<template>
  <div id="home">
    <!-- main -->
    <div class="main">
      <div class="left-content">
        <!-- vertical chart bar -->
        <HorizontalBar
        class="mb-3 box"
        :currency="currency"></HorizontalBar>

        <!-- dropdown menu for selecting a currency -->
        <div id="currency-box" class="box">
          <div class="form-group row">
            <label for="currency" class="col-sm-2 col-form-label">Currency</label>
            <select v-model="currency" id="currency" class="custom-select col-sm-10">
              <option
                v-for="(currency,id) in currencies"
                :key="id"
                :value="currency.symbol">{{ currency.label }} &ndash; ({{ currency.symbol }})
              </option>
            </select>
            <form action="">
            <table>
            <tbody>
            <tr>
            <label for="savingsAmt" class="col-sm-30 col-form-label">Savings % </label>  <td>  <input type="number" v-model="savings" name="savings" id="savings" class="form-control col-sm-5" placeholder="Add Percentage of money you want to Save"></td>
            <td> Savings Amount: {{ savingsAmt }} </td></tr>
            <tr><label for="investment" class="col-sm-30 col-form-label">Investment % </label>  <td>  <input type="number" v-model="invest" name="invest" id="invest" class="form-control col-sm-5" placeholder="Add Percentage of money you want to Invest"></td>
            <td> Investment Amount: {{ investment }} </td>
            </tr>
            </tbody>
            </table>
            </form>
          </div>
        </div>

        <!-- list of all incomes that has been inserted -->
        <div id="income" class="box">
          <table class="table table-borderless text-center">
            <thead>
              <tr>
                <th scope="col" colspan="2" class="text-left">INCOME</th>
                <th scope="col">Received</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-data" v-for="(inc,index) in income" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ inc.name }}</td>
                <td>{{ currency }}{{ inc.amount }}</td>
                <td>
                  <a href="" @click.prevent="removeIncome(index)" class="badge badge-danger"><b-icon-trash></b-icon-trash></a>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-left"><a href="" @click.prevent="toggleForm('incomeBtn')" id="incomeBtn" class="ml-5">&plus; Add item</a></td>
                <td class="text-success font-weight-bold">{{ currency }}{{ totalIncome }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- a form for adding new income to the list -->
        <div v-if="isAddIncomeClicked" id="add-income" class="add-income box pt-3 pb-3">
          <h5>New Income</h5>
          <hr>
          <form action="">
            <div class="form-row">
              <div class="form-group col-6">
                <input type="text" v-model="newIncomeName" name="incomeName" id="incomeName" class="form-control" placeholder="Add income name">
              </div>
              <div class="form-group col-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">{{ currency }}</div>
                  </div>
                  <input type="number" v-model="newIncomeAmount" name="incomeAmount" id="incomeAmount" class="form-control" placeholder="Amount">
                </div>
              </div>
              <div class="col-2">
                <button type="submit" @click.prevent="submitIncome()" class="btn btn-success btn-block">&plus;Add</button>
              </div>
            </div>
          </form>
        </div>

        <!-- list of all expenses that has been inserted -->
        <div id="expense" class="box">
          <table class="table table-borderless text-center">
            <thead>
              <tr>
                <th scope="col" colspan="2" class="text-left">EXPENSES</th>
                <th scope="col">Category</th>
                <th scope="col" colspan="2">Spent</th>
                <th scope="col" colspan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense,index) in expenses" :key="index" class="table-data" :title="expense.desc">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ expense.name }}</td>
                <td>{{ expense.category }}</td>
                <td>{{ currency }}{{ expense.amount }}</td>
                <td colspan="2">
                  <a href="" @click.prevent="removeExpense(index)" class="badge badge-danger"><b-icon-trash></b-icon-trash></a>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-left"><a href="" @click.prevent="toggleForm('expenseBtn')" id="expenseBtn" class="ml-5">&plus; Add item</a></td>
                <td class="text-danger font-weight-bold">{{ currency }}{{ totalExpenses }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- a form for adding new expense to the list -->
        <div v-if="isAddExpenseClicked === true" id="add-expense" class="add-expense box pt-3 pb-3">
          <h5>New Expense</h5>
          <hr>
          <form action="">
            <div class="form-row">
              <!-- item name -->
              <div class="form-group col-5">
                <input type="text" v-model="newExpenseName" name="expenseName" id="expenseName" class="form-control" placeholder="Add expense name">
              </div>
              <!-- select menu -->
              <select name="sel" v-model="newExpenseCategory" id="sel" class="custom-select col-4">
                <option value="" selected>-- Select category --</option>
                <option value="Food">Food</option>
                <option value='Housing & Rent'>Housing</option>
                <option value="Clothing & Fashion">Clothing and Fashion</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Groceries">Groceries</option>
                <option value="Health & Medical">Health & Medical</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Loan Payment">Loan Payment</option>
                <option value="Others">Others</option>
              </select>
              <!-- amount -->
              <div class="form-group col-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">{{ currency }}</div>
                  </div>
                  <input type="number" v-model="newExpenseAmount" name="spentAmount" id="spentAmount" class="form-control" placeholder="Amount">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-12">
                <textarea v-model="newExpenseDesc" name="description" id="description" class="form-control" rows="3" placeholder="Description" title="Write some description about your expense"></textarea>
              </div>
            </div>
            <button type="submit" @click.prevent="submitExpense()" class="btn btn-success btn-block m-1">&plus; Add item</button>
          </form>
        </div>
      </div>

      <div class="right-content">
        <PieChart></PieChart>

        <!-- money allocation on each category -->
        <table id="right-table" class="table mt-3">
          <tbody>
            <tr v-for="(el,id) in datasets" :key="id">
              <th scope="row">{{ el.category }}</th>
              <td>{{ currency }}{{ el.amount }}</td>
              <td>({{ el.ratio }}%)</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <td>{{ currency }}{{ totalExpenses }}</td>
              <td>{{ incomeToExpenseRatio }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalBar from '@/components/HorizontalBar.vue'
import PieChart from '@/components/PieChart.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    HorizontalBar,
    PieChart
  },
  data () {
    return {
      currency: '$',
      isAddIncomeClicked: false,
      isAddExpenseClicked: false,
      newIncomeName: null,
      newIncomeAmount: null,
      newExpenseName: null,
      newExpenseCategory: null,
      newExpenseAmount: null,
      newExpenseDesc: null,
      currencies: [
        {
          label: 'USD',
          symbol: '$'
        },
        {
          label: 'EUR',
          symbol: '€'
        },
        {
          label: 'GBP',
          symbol: '£'
        },
        {
          label: 'JPY',
          symbol: '¥'
        },
        {
          label: 'KRW',
          symbol: '₩'
        },
        {
          label: 'CNY',
          symbol: '¥'
        },
        {
          label: 'INR',
          symbol: '₹'
        },
        {
          label: 'SGD',
          symbol: '$'
        },
        {
          label: 'IDR',
          symbol: 'Rp'
        },
        {
          label: 'MYR',
          symbol: 'RM'
        },
        {
          label: 'AUD',
          symbol: '$'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'income',
      'expenses',
      'categories',
      'totalIncome',
      'totalExpenses',
      'balance',
      'incomeToExpenseRatio',
      'investment',
      'savingsAmt',
      'invest',
      'savings'
    ]),
    /**
     * creating datasets which contain categories,
     * total amount of money spent on each category,
     * and ratio between amount spent on each category and total expenses + balance
     */
    datasets: function () {
      const costs = []
      this.categories.forEach(category => {
        let amount = 0
        let ratio = 0
        this.expenses.forEach(expense => {
          if (expense.category === category) {
            amount += expense.amount
          }
        })
        ratio = Math.round((amount / (this.balance + this.totalExpenses)) * 100)
        costs.push({ category, amount, ratio })
      })
      return costs
    }
  },
  methods: {
    ...mapActions([
      'addIncome',
      'addExpense',
      'deleteIncome',
      'deleteExpense'
    ]),
    /**
     * insert new record from the form to the income list
     */
    submitIncome () {
      if (this.newIncomeName && this.newIncomeAmount) {
        this.addIncome({
          name: this.newIncomeName,
          amount: parseInt(this.newIncomeAmount)
        })
        this.newIncomeName = null
        this.newIncomeAmount = null
      } else {
        console.log('ERROR: Income name and amount can\'t be empty.')
      }
    },
    /**
     * insert new record from the form to the expense list
     */
    submitExpense () {
      if (this.newExpenseName && this.newExpenseCategory && this.newExpenseAmount) {
        // actions
        this.addExpense({
          name: this.newExpenseName,
          category: this.newExpenseCategory,
          amount: parseInt(this.newExpenseAmount),
          desc: this.newExpenseDesc
        })
        // reset form
        this.newExpenseName = null
        this.newExpenseCategory = null
        this.newExpenseAmount = null
        this.newExpenseDesc = null
      } else {
        console.log('ERROR: Expense fields cannot be empty.')
      }
    },
    /**
     * remove a record from the income list
     */
    removeIncome (id) {
      this.deleteIncome(id)
    },
    /**
     * remove a record from the expense list
     */
    removeExpense (id) {
      this.deleteExpense(id)
    },
    /**
     * show or hide form when '+add item' button is pressed
     */
    toggleForm (id) {
      if (id === 'incomeBtn') this.isAddIncomeClicked = !this.isAddIncomeClicked
      if (id === 'expenseBtn') this.isAddExpenseClicked = !this.isAddExpenseClicked
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .main {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
  }
  #horizontal, .right-content {
    display: none;
  }
  .left-content {
    padding: 20px;
  }
}

@media screen and (min-width: 600px) {
  .main {
    display: grid;
    grid-template-columns: 7fr 4fr;
    max-width: 100%;
  }
  .left-content, .right-content {
    padding: 20px;
  }
}
  .box {
    padding: 5px 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 2px 5px rgba(100, 100, 100, 0.2);
  }
  .table-data {
    border-bottom: 1px solid #eee;
  }
  .badge {
    margin: 0px 2px;
  }
  /* .right-content {
    background: #eee;
  } */
  #right-table tbody tr {
    font-size: 0.75em;
    line-height: 2px;
  }
  #right-table tbody tr th {
    color: #5f5f5f;
  }
  #right-table tbody tr td {
    color: #a0a0a0;
  }
</style>
