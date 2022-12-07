import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  }
})

// 重写push|replace方法
// const originPush = router.push; // 保存路由原有的push方法
// const originReplace = router.replace; // 保存路由原有的replace方法

// router.push = function(to, resolve, reject) {
//   // 将this指回VueRouter
//   if (resolve && reject) {
//     originPush.call(this, to, resolve, reject);
//   } else {
//     originPush.call(this, to, () => {}, () => {});
//   }
// }
// router.replace = function(to: any, resolve: any, reject: any) {
//   if (resolve && reject) {
//     originReplace.call(this, to, resolve, reject);
//   } else {
//     originReplace.call(this, to, () => {}, () => {});
//   }
// }

router.beforeEach((to, from, next) => {
  if (!nprogress.isStarted()) {
    nprogress.start();
  }
  next();
})

router.afterEach(() => {
  nprogress.done();
})

export default router
