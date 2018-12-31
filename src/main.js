import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false;
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2';


Vue.use(VueClipboard);
Vue.use(ElementUI);
Vue.use(axios);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
