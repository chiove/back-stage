import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
    },
    {
      path: '/login', component: resolve => require(['@/components/contain/login'],resolve)
    },
    {
      path: '/index',
      // redirect:'/index/dailyData',
      component: resolve => require(['@/components/contain/index'],resolve),
      meta: {
        requiresAuth: true
      },
      children:[
      {
        path: '/index/dailyData',
        component: resolve => require(['@/components/containFrame/dailyData'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/weekData',
        component: resolve => require(['@/components/containFrame/weekData'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/studentsCare',
        component: resolve => require(['@/components/containFrame/studentsCare'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/studentsSearch',
        component: resolve => require(['@/components/containFrame/studentsSearch'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/teacherCheck',
        component: resolve => require(['@/components/containFrame/teacherCheck'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        name:'studentsDetails',
        path: '/index/studentsDetails',
        component: resolve => require(['@/components/containFrame/studentsDetails'],resolve),
        meta: {
          requiresAuth: true
        }
      }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
export default router
