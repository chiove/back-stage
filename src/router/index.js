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
      // redirect:'/apiMan',
      component: resolve => require(['@/components/contain/index'],resolve),
      // children:[
      //   {// 接口管理
      //     path: '/apiMan',
      //     component: resolve => require(['@/components/containRight/api_management/api_management'],resolve),
      //     children:[
      //   {
      //     path: '/apiMan/detail',
      //     component: resolve => require(['@/components/containRight/api_management/api_m_detail'],resolve),
      //     children:[
      //       {
      //         path:'/apiMan/detail/auth',
      //         component: resolve => require(['@/components/containRight/api_management/api_authorized_detail'],resolve),
      //       }
      //     ]
      //   },
      //   // {
      //   //   path:'/apiMan/auth',
      //   //   component: resolve => require(['@/components/containRight/api_management/api_authorized_detail'],resolve),
      //   // }
      // ]
      // },
      // {// 应用分类
      //   path: '/newApi',
      //   // redirect:'/newApi/newCreated_api', 
      //   component: resolve => require(['@/components/containRight/newCreated_api/newCreated_api'],resolve),
      //   // children:[
      //   //     ]
      // },{
      //   path:'/checkedApi',
      //   component: resolve => require(['@/components/containRight/checked_api/checked_api'],resolve),

      // }
      // ] 
  }
  ]
})

