<template>
  <div id="pie">
    <canvas id="pieChart" height="250"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Pie',
  data () {
    return {
      pieChart: null
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'balance',
      'expenses'
    ]),
    amount: function () {
      const amount = []
      this.categories.map(category => {
        let sum = 0
        this.expenses.map((expense, index) => {
          if (expense.category === category) {
            sum += expense.amount
          } else if (index === this.expenses.length - 1 && sum === 0) {
            sum = 0
          }
        })
        amount.push(sum)
      })
      return amount
    }
  },
  mounted () {
    var ctx = document.getElementById('pieChart').getContext('2d')
    var config = {
      type: 'doughnut',
      data: {
        labels: ['Balance', ...this.categories],
        datasets: [{
          data: [this.balance, ...this.amount],
          backgroundColor: [
            '#ccc',
            '#fd3a69',
            '#706897',
            '#ec524b',
            '#fecd1a',
            '#19d3da',
            '#ff9a76',
            '#9088d4',
            '#81b214',
            '#799351',
            '#fcf876',
            '#07689f'
          ],
          borderColor: [
            '#ccc',
            '#fd3a69',
            '#706897',
            '#ec524b',
            '#fecd1a',
            '#19d3da',
            '#ff9a76',
            '#9088d4',
            '#81b214',
            '#799351',
            '#fcf876',
            '#07689f'
          ],
          borderWidth: 1,
          weight: 1
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          position: 'top',
          text: 'Ratio between Expenses and Income (%)'
        }
      }
    }

    // create a piechart object
    this.pieChart = new Chart(ctx, config)
  },
  watch: {
    balance: {
      immediate: false,
      handler () {
        this.pieChart.config.data.datasets[0].data[0] = this.balance
        this.pieChart.update()
      }
    },
    expenses: {
      immediate: false,
      handler () {
        this.pieChart.config.data.datasets[0].data = [this.balance, ...this.amount]
        this.pieChart.update()
      }
    }
  }
}
</script>
