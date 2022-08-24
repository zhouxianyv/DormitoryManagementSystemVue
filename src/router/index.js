import Vue from 'vue';
import Router from 'vue-router';
import index from '@/page/index/index.vue';
import store from '@/store/index.js';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: '门户页面',
      component: index
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/page/login/index.vue'], resolve),
    },
    {
      path: '/user',
      name: '学生详情页',
      component: resolve => require(['@/page/user/index.vue'], resolve),
    },
    {
      path: '/news',
      name: '学校资讯 & 公告通知',
      component: resolve => require(['@/page/news/index.vue'], resolve),
    },
    {
      path: '/report',
      name: '上报问题',
      component: resolve => require(['@/page/report/index.vue'], resolve),
    },
    {
      path: '/admin',
      name: '管理员模块',
      component: resolve => require(['@/page/admin/index.vue'], resolve),
      children: [
        {
          path: 'home',
          name: '首页',
          component: resolve => require(['@/page/admin/home/index.vue'], resolve),
        },
        {
          path: 'menu',
          name: '菜单管理',
          component: resolve => require(['@/page/admin/menu/index.vue'], resolve),
        },
        {
          path: 'role',
          name: '角色管理',
          component: resolve => require(['@/page/admin/role/index.vue'], resolve),
        },
        {
          path: 'user',
          name: '管理员管理',
          component: resolve => require(['@/page/admin/user/index.vue'], resolve),
        },
        {
          path: 'build',
          name: '宿舍楼管理',
          component: resolve => require(['@/page/admin/build/index.vue'], resolve),
        },
        {
          path: 'room',
          name: '宿舍管理',
          component: resolve => require(['@/page/admin/room/index.vue'], resolve),
        },
        {
          path: 'student',
          name: '学生管理',
          component: resolve => require(['@/page/admin/student/index.vue'], resolve),
        },
        {
          path: 'banner',
          name: '轮播图管理',
          component: resolve => require(['@/page/admin/banner/index.vue'], resolve),
        },
        {
          path: 'information',
          name: '学校资讯管理',
          component: resolve => require(['@/page/admin/information/index.vue'], resolve),
        },
        {
          path: 'notice',
          name: '通知公告管理',
          component: resolve => require(['@/page/admin/notice/index.vue'], resolve),
        },
        {
          path: 'report',
          name: '上报问题管理',
          component: resolve => require(['@/page/admin/report/index.vue'], resolve),
        },
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return true;
  }
  if (store.state.login.user.token) {
    next();
    return true;
  }
  next('/login');
});

export default router;