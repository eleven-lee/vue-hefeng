import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('components/index/index')
const Category = () => import('components/category/category')
const Order = () => import('components/order/order')
const User = () => import('components/user/user')
const Search = () => import('components/search/search')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
