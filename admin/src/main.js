import Vue from 'vue';

// ElementUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 异步请求库
// import '@/plugin/axios'
import axios from '@/axios/index';

Vue.prototype.axios = axios;

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import App from './App.vue';
import router from './router/index';
import store from './store';
import './registerServiceWorker';

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
