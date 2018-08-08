import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login', component: resolve => require(['@/components/contain/login'],resolve)
    },
    {
      path: '/index',
      redirect:'/index/dailyData',
      component: resolve => require(['@/components/contain/index'],resolve),
      children:[
      {
        path: '/index/dailyData',
        component: resolve => require(['@/components/containFrame/dailyData'],resolve),
      },
      {
        path: '/index/weekData',
        component: resolve => require(['@/components/containFrame/weekData'],resolve),
      },
      {
        path: '/index/studentsCare',
        component: resolve => require(['@/components/containFrame/studentsCare'],resolve),
      },
      {
        path: '/index/studentsSearch',
        component: resolve => require(['@/components/containFrame/studentsSearch'],resolve),
      },
      {
        path: '/index/teacherCheck',
        component: resolve => require(['@/components/containFrame/teacherCheck'],resolve),
      }]
    },
  ]
})

