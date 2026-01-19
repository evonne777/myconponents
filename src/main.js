// main.js
import Vue from 'vue'
import App from './App'
import router from './router'

// ✅ 正确引入 Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import request from '@/utils/request';
import '@/components/UCI'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$http = request;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
