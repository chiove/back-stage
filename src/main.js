import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'
import promise from 'es6-promise'
import Vuex from 'vuex'
import echarts from 'echarts'
import store from './store'
import './common/css/common.css'

Vue.config.productionTip = false

promise.polyfill()
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
Vue.prototype.$axios.interceptors.request.use(
  config => {
    console.log(config)
    if(sessionStorage.getItem('token')){
      let paramsData = sessionStorage.getItem('token')
      config.headers = {
        token:paramsData
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

Vue.prototype.$axios.interceptors.response.use(
  response => {
    if(response.data.code === "000444"){
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      })
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          sessionStorage.token = "";
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response)
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

export const bus = new Vue();
