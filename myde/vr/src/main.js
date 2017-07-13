// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import vueResource from 'vue-resource'
import axios from 'axios';
Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.http.interceptors.push((request, next) => {
    //此处this为请求所在页面的Vue实例
  // modify request
  //request.method = 'POST';在请求之前可以进行一些预处理和配置

  // continue to next interceptor
  next((response) => {
    //在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    /*if(response.body.status == '100405'){
        alert("登录失效，请重新登录");
        if(sessionStorage.getItem('type') == 'hq'){
          router.push('/hqlogin');
        }else{
          router.push('/worklogin');
        }
    }else{
        return response;
    }*/
  });
})
//Vue.http.headers.common['Authorization'] = 'eyJpYXQiOjE0OTI0ODI0OTcsImV4cCI6MTQ5Mzc3ODQ5NywiYWxnIjoiSFMyNTYifQ.eyJpZCI6MX0.SIomxx9xQP4On3InSyKkA82jA5OUU1gvIUs3XlOJzSE';
/*Vue.http.options.emulateJSON = true;*/
/*Vue.http.options.emulateHTTP = true;*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
