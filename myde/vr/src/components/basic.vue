<template>
  <mu-list class="content-menu" :value="value" @change="handleChange">
    <mu-list-item :title="list.title" toggleNested  v-for="(list,index) in lists" :key="index" :disabled="list.disb">
      <mu-icon slot="left" :value="list.iconvalue"/>
      <mu-list-item slot="nested" :title="lst.title" :value="lst.value" :href="lst.href" class="ddl" v-for="(lst,index) in list.dt" :key="index" :disabled="lst.disb">
        <mu-icon slot="left" :value="lst.iconvalue"/>
      </mu-list-item>
    </mu-list-item>
   </mu-list>
</template>
<script>
  export default{
    name:'basic',
    data(){
      return{
        value:'accountall',
        lists:[
          {
            title:'总部账号管理',
            iconvalue:'view_list',
            disb:false,
            dt:[
              {
                title:'账号列表',
                value:'accountall',
                href:'#/hq/accountall',
                iconvalue:'tab',
                disb:false
              },
              {
                title:'新增账号',
                value:'accountadd',
                href:'#/hq/accountadd',
                iconvalue:'tab',
                disb:false
              }
            ]
          },
          {
            title:'权限管理',
            iconvalue:'credit_card',
            disb:true,
            dt:[
              {
                title:'用户组设置',
                value:'pworuser',
                href:'#/hq/pworuser',
                iconvalue:'tab',
                disb:true
              },
              {
                title:'权限设置',
                value:'pworsetup',
                href:'#/hq/pworsetup',
                iconvalue:'tab',
                disb:true
              },
              {
                title:'权限映射',
                value:'pwormap',
                href:'#/hq/pwormap',
                iconvalue:'tab',
                disb:true
              }
            ]
          },
          /*{
            title:'权限管理',
            iconvalue:'credit_card',
            dt:[
              {
                title:'用户组设置',
                value:'pworuser',
                href:'#/hq/pworuser',
                iconvalue:'tab'
              },
              {
                title:'权限设置',
                value:'pworsetup',
                href:'#/hq/pworsetup',
                iconvalue:'tab'
              },
              {
                title:'权限映射',
                value:'pwormap',
                href:'#/hq/pwormap',
                iconvalue:'tab'
              }
            ]
          },*/
          {
            title:'锁定规则管理',
            iconvalue:'account_box',
            disb:true,
            dt:[
              {
                title:'注册审核锁定规则',
                value:'lockte',
                href:'#/hq/lockte',
                iconvalue:'tab',
                disb:true
              },
              {
                title:'注册打款锁定规则',
                value:'lockpy',
                href:'#/hq/lockpy',
                iconvalue:'tab',
                disb:true
              }
            ]
          },
          {
            title:'分润管理',
            iconvalue:'assignmentind',
            disb:true,
            dt:[
              {
                title:'报单分润管理',
                value:'sharesetup',
                href:'#/hq/sharesetup',
                iconvalue:'tab',
                disb:true
              }
            ]
          }
        ]
      }
    },
    methods:{
      handleChange:function(val){
        this.value = val;
      }
    },
    mounted:function(){
      if(this.$route.path =='/hq/accountall'){
        this.value = 'accountall';
      }
      if(this.$route.path =='/hq/accountadd'){
        this.value = 'accountadd';
      }
      if(this.$route.path =='/hq/pworuser'){
        this.value = 'pworuser';
      }
      if(this.$route.path =='/hq/pworsetup'){
        this.value = 'pworsetup';
      }
      if(this.$route.path =='/hq/pwormap'){
        this.value = 'pwormap';
      }
      if(this.$route.path =='/hq/lockte'){
        this.value = 'lockte';
      }
      if(this.$route.path =='/hq/lockpy'){
        this.value = 'lockpy';
      }
      if(this.$route.path =='/hq/sharesetup'){
        this.value = 'sharesetup';
      }
    }
  }
</script>
