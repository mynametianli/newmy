// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import city from './components/city'
import foo from './components/foo'
import getfood from './components/getfood'
import shopcar from './components/shopcar1'
import ownmsg from './components/ownmsg'
import owncar from './components/owncar'
import buygoods from './components/buygoods1'
import order from './components/order'
import foodetail from './components/foodetail'
import cardsuccess from './components/cardsuccess'
import paycards from './components/paycards'
import mypay from './components/mypay'
import getattention from './components/getattention'
import ownno from './components/ownno'
import vrlogin from './components/vrlogin'
import mycode from './components/mycode'
import wechatpay from './components/wechatpay'
import paymycard from './components/paymycard'
/*import paymoney from './components/paymoney'*/
//vue路由
Vue.use(VueRouter)
const router = new VueRouter({
 /* mode: 'history',*/
  /* base: __dirname,*/
  routes: [
    { path: '/', beforeEnter:function(to, from, next){
        if(localStorage.getItem("mycity")){
          next({path:"/foo"})
        }else{
          next({path:"/city"})
        }
    }},
    { path: '/city', component:city},
   /* { path: '/foo/:id',name:'foo',component: foo },*/
    { path: '/foo',component: foo},
    { path: '/getfood',component: getfood },
    {path:'/shopcar',component:shopcar},
    {path:'/my',component:ownmsg,children:[
      {
        path:"getattention",
        component:getattention
      },
      {
        path:"ownno",
        component:ownno
      }
    ]},
    {path:'/owncar',component:owncar},
    {path:'/buygoods',name:'buygoods',component:buygoods},
    {path:'/order',component:order},
    {path:'/foodetail',component:foodetail},
    {path:'/cardsuccess',component:cardsuccess},
    {path:'/paycards',component:paycards},
    {path:'/mypay',component:mypay},
    {path:'/vrlogin',component:vrlogin},
    {path:'/mycode',component:mycode},
    {path:'/wechatpay/',component:wechatpay},
    {path:'/paymycard/',component:paymycard},
    {path:'/wechatpay/getfood',redirect:"/getfood"},
    {path:'/paymycard/cardsuccess',redirect:"/cardsuccess"}
  /*  {path:'/paymoney',component:paymoney}*/
  ],
})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: "<App><App/>",
  components: { App },
  mounted:function(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      $(function() {
        FastClick.attach(document.body);
      });
    } else if (/android/.test(ua)) {

    }
    $.ajax({
      type:"get",
      url:"/user/info",
      success:function(res){
         res = JSON.parse(res);
         if(res.status == "success"){
              sessionStorage.setItem("userhead",res.pic);
              if(res["tradebook_acct"]){
                sessionStorage.setItem("uservr",res["tradebook_acct"]);
              }
                sessionStorage.setItem("username",res.nickname);
         }
      }
    })
  }
}).$mount("#app")
