import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
let router = new VueRouter({ routes });

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // 验证当前路由所有的匹配中是否需要有登陆验证的
  let islogin = localStorage.getItem('token') != 'undefined' ? true : false;
  console.log('是否授权登录', to.meta.noNeedLogin, islogin);

  if (!to.meta.noNeedLogin) {
    if (islogin) {
      next();
    } else {
      // 没有登陆的时候跳转到登陆界面
      next('/Login');
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
  next();
});

export default router;
