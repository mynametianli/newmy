import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import worklogin from '@/components/worklogin'
import hqlogin from '@/components/hqlogin'
import register from '@/components/register'
import resetpsd from '@/components/resetpsd'
import setmypsd from '@/components/setmypsd'
import setwepsd from '@/components/setwepsd'
import workroom from '@/components/workroom'
import workincomerecord from '@/components/workincomerecord'
import workcustomsrecord from '@/components/workcustomsrecord'
import workcustomspost from '@/components/workcustomspost'
import workmemberlist from '@/components/workmemberlist'
import workmemberadd from '@/components/workmemberadd'
import workmemberpass from '@/components/workmemberpass'
import workinformationget from '@/components/workinformationget'
import workmemberhty from '@/components/workmemberhty'
import workpsdmodify from '@/components/workpsdmodify'
import hq from '@/components/hq'
import accountall from '@/components/accountall'
import accountadd from '@/components/accountadd'
import hqlockte from '@/components/hqlockte'
import hqlockpy from '@/components/hqlockpy'
import hqsharesetup from '@/components/hqsharesetup'
import hqfinance from '@/components/hqfinance'
import hqdfhandle from '@/components/hqdfhandle'
import hqdfhistory from '@/components/hqdfhistory'
import hqwithdrawhandle from '@/components/hqwithdrawhandle'
import hqwithdrawhistory from '@/components/hqwithdrawhistory'
import hqaddworkaccount from '@/components/hqaddworkaccount'
import hqassessment from '@/components/hqassessment'
import hqpworuser from '@/components/hqpworuser'
import hqworkaccountlist from '@/components/hqworkaccountlist'
import activate from '@/components/activate'
import rewardrule from '@/components/hqrewardrule'
import workaccountall from '@/components/hqworkaccountall'
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/worklogin',
      component:worklogin
    },
    {
      path:'/hqlogin',
      component:hqlogin
    },
    {
      path:'/activate',
      name:'activate',
      component:activate
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path:'/resetpsd',
      name:'resetpsd',
      component:resetpsd
    },
    {
      path:'/workroom',
      name:'workroom',
      component:workroom,
      children:[
        {
          path:'workincomerecord',
          component:workincomerecord
        },
        {
          path:'workcustomsrecord',
          component:workcustomsrecord
        },
        {
          path:'workcustomspost',
          component:workcustomspost
        },
        {
          path:'workmemberlist',
          component:workmemberlist
        },
        {
          path:'workmemberadd',
          component:workmemberadd
        },
        {
          path:'workmemberpass',
          component:workmemberpass
        },
        {
          path:'workmemberhty',
          component:workmemberhty
        },
        {
          path:'workinformationget',
          component:workinformationget
        },
        {
          path:'workpsdmodify',
          component:workpsdmodify
        }
      ]
    },
    {
      path:'/hq',
      name:'hq',
      component:hq,
      children:[
        {
          path:'accountall',
          component:accountall
        },
        {
          path:'accountadd',
          component:accountadd
        },
        {
          path:'lockte',
          component:hqlockte
        },
        {
          path:'lockpy',
          component:hqlockpy
        },
        {
          path:'sharesetup',
          component:hqsharesetup
        },
        {
          path:'finance',
          component:hqfinance
        },
        {
          path:'dfhandle',
          component:hqdfhandle
        },
        {
          path:'dfhistory',
          component:hqdfhistory
        },
        {
          path:'withdrawhandle',
          component:hqwithdrawhandle
        },
        {
          path:'withdrawhistory',
          component:hqwithdrawhistory
        },
        {
          path:'addworkaccount',
          component:hqaddworkaccount
        },
        {
          path:'assessment',
          component:hqassessment
        },
        {
          path:'pworuser',
          component:hqpworuser
        },
        {
          path:'workaccountlist',
          component:hqworkaccountlist
        },
        {
          path:'workaccountpsd',
          component:setmypsd
        },
        {
          path:'workaccountpsdm',
          component:setwepsd
        },
        {
          path:'rewardrule',
          component:rewardrule
        },
        {
          path:'workaccountall',
          component:workaccountall
        }
      ]
    }
  ]
})
