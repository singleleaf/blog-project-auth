import Vue from 'vue'
import '@/assets/style/global.css'
import '@/assets/icon/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'


// 异步请求库
// import '@/plugin/axios'
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')