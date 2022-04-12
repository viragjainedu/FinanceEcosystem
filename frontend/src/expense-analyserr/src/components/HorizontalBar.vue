<template>
  <div id="horizontal">
    <canvas id="barChart" height="125"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js'
import { mapGetters } from 'vuex'
export default {
  name: 'horizontal',
  props: {
    currency: String
  },
  data () {
    return {
      barChart: null
    }
  },
  computed: {
    ...mapGetters([
      'categories',
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
  mounted: function () {
    var ctx = document.getElementById('barChart').getContext('2d')
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...this.categories],
        datasets: [{
          label: `${this.currency} of Money Spent`,
          data: [...this.amount],
          barPercentage: 1,
          backgroundColor: [
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
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          position: 'top',
          text: 'Amount of Expenses Spent This Month ($)'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  },
  watch: {
    expenses: {
      immediate: false,
      handler () {
        this.barChart.config.data.datasets[0].data = this.amount
        this.barChart.update()
      }
    },
    currency: {
      immediate: false,
      handler () {
        this.barChart.config.data.datasets[0].label = `${this.currency} of Money Spent`
        this.barChart.update()
      }
    }
  }
}
</script>
