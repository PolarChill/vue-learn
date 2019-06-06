import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
// import Mall from '@/components/Cart/Index.vue';
import KForm from '@/components/KForm/FormTest.vue';
import EleForm from '@/components/eleForm/ElementForm.vue';
Vue.use(Router);

const routers =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      props:true,
      redirect:`/home/mall`,
      name:'home',
      children: [
        {
          path: 'mall/:user?',
          name: 'mall',
          props: true,
          // route level code-splitting  懒加载
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "mall" */ '@/components/Cart/Index.vue')
        },
        {
          path: 'kform/:user?',
          name: 'kform',
          component: KForm
        },
        {
          path: 'eleform/:user?',
          name: 'eleform',
          component: EleForm
        },
        {
          path: 'about/:user?',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
      ]
    },
    // 通配符 , 匹配所有路由, 应该放在最后
    {
      path: '*',
      name: 'not-fount',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue')
    }
  ],

  
});
routers.beforeEach((to, from, next) => {
  
  if (sessionStorage.getItem('user') || to.path ==='/login' || (to.name === 'not-fount')) {
    next()
  } else {
    alert('请登录')
    next('/login')
  }
})
export default routers