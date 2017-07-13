<template>
  <mu-list class="content-menu" :value="value" @change="handleChange">
    <mu-list-item :title="list.title" toggleNested  v-for="(list,index) in lists" :key="index" class="ddti">
      <mu-icon slot="left" :value="list.iconvalue"/>
      <mu-list-item slot="nested" :title="lst.title" :value="lst.value" :href="lst.href" class="ddl" v-for="(lst,index) in list.dt" :key="index">
        <mu-icon slot="left" :value="lst.iconvalue"/>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
</template>
<script>
  export default{
    name:'wbasic',
    data(){
      return{
        value:'finance',
        lists:this.lists = [
          /*{
            title:'财务管理',
            iconvalue:'view_list',
            dt:[
              {
                title:'财务统计',
                value:'finance',
                href:'#/hq/finance',
                iconvalue:'tab'
              }
            ]
          },*/
          {
            title:'报单管理',
            iconvalue:'credit_card',
            dt:[
              {
                title:'工作室报单处理',
                value:'dfhandle',
                href:'#/hq/dfhandle',
                iconvalue:'receipt'
              },
              {
                title:'工作室报单历史',
                value:'dfhistory',
                href:'#/hq/dfhistory',
                iconvalue:'history'
              }
            ]
          },
          /*{
            title:'提现管理',
            iconvalue:'account_box',
            dt:[
              {
                title:'提现申请处理',
                value:'withdrawhandle',
                href:'#/hq/withdrawhandle',
                iconvalue:'tab'
              },
              {
                title:'提现申请历史',
                value:'withdrawhistory',
                href:'#/hq/withdrawhistory',
                iconvalue:'tab'
              }
            ]
          },*/
          {
            title:'工作室管理',
            iconvalue:'assignmentind',
            dt:[
              {
                title:'工作室考核',
                value:'assessment',
                href:'#/hq/assessment',
                iconvalue:'done_all'
              },
              {
                title:'工作室审批',
                value:'workaccountall',
                href:'#/hq/workaccountall',
                iconvalue:'add'
              },
              /*{
                title:'工作室添加',
                value:'addworkaccount',
                href:'#/hq/addworkaccount',
                iconvalue:'add'
              },*/
              {
                title:'工作室列表',
                value:'workaccountlist',
                href:'#/hq/workaccountlist',
                iconvalue:'view_list'
              }
            ]
          },
          {
            title:'奖励规则',
            iconvalue:'call_missed_outgoing',
            dt:[
              {
                title:'奖励规则设置',
                value:'rewardrule',
                href:'#/hq/rewardrule',
                iconvalue:'trending_down'
              }
            ]
          },
          {
            title:'密码管理',
            iconvalue:'group_work',
            dt:[
              {
                title:'系统拨币密码修改',
                value:'workaccountpsd',
                href:'#/hq/workaccountpsd',
                iconvalue:'lock_outline'
              },
              {
                title:'系统登录密码修改',
                value:'workaccountpsdm',
                href:'#/hq/workaccountpsdm',
                iconvalue:'lock'
              }
            ]
          }
        ]
      }
    },
    watch:{
      '$route':'getval'
    },
    methods:{
      handleChange:function(val){
        this.value = val;
      },
      getval:function(){
        this.value = this.$route.path.split('/')[2];
      }
    },
    mounted:function(){
      this.getval();
      /*if(this.$route.path =='/hq/finance'){
        this.value = 'finance';
      }
      if(this.$route.path =='/hq/dfhandle'){
        this.value = 'dfhandle';
      }
      if(this.$route.path =='/hq/dfhistory'){
        this.value = 'dfhistory';
      }
      if(this.$route.path =='/hq/withdrawhandle'){
        this.value = 'withdrawhandle';
      }
      if(this.$route.path =='/hq/withdrawhistory'){
        this.value = 'withdrawhistory';
      }
      if(this.$route.path =='/hq/assessment'){
        this.value = 'assessment';
      }
      if(this.$route.path =='/hq/addworkaccount'){
        this.value = 'addworkaccount';
      }
      if(this.$route.path =='/hq/workaccountlist'){
        this.value = 'workaccountlist';
      }
      if(this.$route.path =='/hq/workaccountpsd'){
        this.value = 'workaccountpsd';
      }
      if(this.$route.path =='/hq/workaccountpsdm'){
        this.value = 'workaccountpsdm';
      }
      if(this.$route.path == '/hq/rewardrule'){
        this.value = 'rewardrule'
      }*/
    }
  }
</script>
<style>
  .mu-item.selected,.mu-item.selected .mu-item-left{
    color:#0066cc !important;
  }
  .ddti .mu-item{
    color:#444;
  }
  .ddti .mu-item-left{
    color:#666;
  }
  .ddti .ddl .mu-item,.ddti .ddl .mu-item-left{
    color:#999;
  }

</style>
