// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
document.cookie = 'name=11';
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vueResource from 'vue-resource'
Vue.use(ElementUI)
Vue.use(vueResource)
Vue.config.productionTip = false;
Vue.http.options.credentials = true;
Vue.http.interceptors.push((request, next) => {
  next((response) => {
  if(response.body.status_code == '100405'){
    alert('登录失效，请重新登录');
    router.push('/');
  }else{
    return response;
  }
});
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
