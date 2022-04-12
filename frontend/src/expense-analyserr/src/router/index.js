import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FinancialAdvice from '../views/Financial_Advice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/advice',
    name: 'FinancialAdvice',
    component: FinancialAdvice
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
