import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '@/components/login'
import reset from '@/components/reset'
import administrator from '@/components/administrator'
import adpower from '@/components/adpower'
import adamend from '@/components/amend'
import admanagerlist from '@/components/admanagerlist'
import add from '@/components/add'
import lawyerpass from '@/components/lawyerpass'
import lawyerwait from '@/components/lawyerwait'
import lawyerrebut from '@/components/lawyerrebut'
import scoringpass from '@/components/scoringpass'
import scoringwait from '@/components/scoringwait'
import articlelist from '@/components/articlelist'
import articleadd from '@/components/articleadd'
import reportwait from '@/components/reportwait'
import reportpass from '@/components/reportpass'
import orderwait from '@/components/orderwait'
import orderpass from '@/components/orderpass'
import bribewait from '@/components/bribewait'
import bribepass from '@/components/bribepass'
import visitwait from '@/components/visitwait'
import visitpass from '@/components/visitpass'
import delegatewait from '@/components/delegatewait'
import delegatepass from '@/components/delegatepass'
import warningwait from '@/components/warningwait'
import warningpass from '@/components/warningpass'
import caselawyerwait from '@/components/caselawyerwait'
import caselawyerpass from '@/components/caselawyerpass'
import caserelatedwait from '@/components/caserelatedwait'
import caserelatedpass from '@/components/caserelatedpass'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',beforeEnter:function(to, from, next) {
      function IETester(userAgent){
        var UA =  userAgent || navigator.userAgent;
        if(/msie/i.test(UA)){
          return UA.match(/msie (\d+\.\d+)/i)[1];
        }else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
          return UA.match(/rv:(\d+\.\d+)/)[1];
        }
        return false;
      }
      if (IETester() >= 10 || !IETester()) {
            next({path: "/login"})
          } else {
            next({path: "/reset"})
          }
      }
    },
    {
      path:'/reset',
      name:'reset',
      component:reset
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/ad',
      name:'administrator',
      component:administrator,
      children:[
        {
          path:'adpower',
          component:adpower
        },
        {
          path:'adamend',
          component:adamend
        },
        {
          path:'admanagerlist',
          component:admanagerlist
        },
        {
          path:'add',
          component:add
        },
        {
          path:'lawyerpass',
          component:lawyerpass
        },
        {
          path:'lawyerwait',
          component:lawyerwait
        },
        {
          path:'lawyerrebut',
          component:lawyerrebut
        },
        {
          path:'scoringpass',
          component:scoringpass
        },
        {
          path:'scoringwait',
          component:scoringwait
        },
        {
          path:'articlelist',
          component:articlelist
        },
        {
          path:'articleadd',
          component:articleadd
        },
        {
          path:'reportwait',
          component:reportwait
        },
        {
          path:'reportpass',
          component:reportpass
        },
        {
          path:'orderpass',
          component:orderpass
        },
        {
          path:'orderwait',
          component:orderwait
        },
        {
          path:'bribewait',
          component:bribewait
        },
        {
          path:'bribepass',
          component:bribepass
        },
        {
          path:'visitwait',
          component:visitwait
        },
        {
          path:'visitpass',
          component:visitpass
        },
        {
          path:'delegatewait',
          component:delegatewait
        },
        {
          path:'delegatepass',
          component:delegatepass
        },
        {
          path:'warningwait',
          component:warningwait
        },
        {
          path:'warningpass',
          component:warningpass
        },
        {
          path:'caselawyerwait',
          component:caselawyerwait
        },
        {
          path:'caselawyerpass',
          component:caselawyerpass
        },
        {
          path:'caserelatedwait',
          component:caserelatedwait
        },
        {
          path:'caserelatedpass',
          component:caserelatedpass
        }
      ]
    }
  ]
})
