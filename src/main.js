// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
// import router from './router'
Vue.use(VueRouter)
Vue.use(VueResource) 
import Comment from './components/home/comment/comment.vue'
import Store from './components/home/store/store.vue'
import Goods from './components/home/goods/goods.vue'
import './common/stylus/base.styl'
import './common/stylus/icon.styl'





// Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: 'Goods' },
  { path: '/comment', component: Comment },
  { path: '/store', component: Store },
  { path: '/goods', component: Goods }
]
const router = new VueRouter({
  linkActiveClass: 'myActive',
  routes // (缩写) 相当于 routes: routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>',
  router
})