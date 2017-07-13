<template>
    <div id="workroom">
      <div class="work-header">
        <div class="logo l">
          <mu-icon value="language" :size="size" class="imgicon"></mu-icon>
        </div>
        <div class="text l">
          VR9工作室后台管理系统
        </div>
          <div class="r out-to">
            <span class="l accounttitle">{{accountname}}</span>
            <mu-flat-button label="退出" @click="goout($router)" color="#fff" class='r'/>
          </div>
        <!--<div class="nav">
          <mu-tabs value="tab1" class="nav-tab">
            <mu-tab value="tab1" title="首  页" class="tab-tab"/>
          </mu-tabs>
        </div>-->
      </div>
      <div class="content-box">
        <div class="content-nav l">
          <mu-list class="content-menu" :value="value" @change="handleChange">
            <!--<mu-list-item title="收入管理" toggleNested class="ddti">
              <mu-icon slot="left" value="credit_card"/>
              <mu-list-item slot="nested" title="收入记录" value="income-record" href="#/workroom/workincomerecord" class="ddl">
                <mu-icon slot="left" value="tab"/>
              </mu-list-item>
            </mu-list-item>-->
            <mu-list-item title="报单管理" toggleNested class="ddti">
              <mu-icon slot="left" value="view_list"/>
              <mu-list-item slot="nested" title="报单记录" value="customs-record" href="#/workroom/workcustomsrecord" class="ddl">
                <mu-icon slot="left" value="reorder"/>
              </mu-list-item>
              <!--<mu-list-item slot="nested" title="我要报单" value="customs-post" href="#/workroom/workcustomspost" class="ddl">
                <mu-icon slot="left" value="view_day"/>
              </mu-list-item>-->
            </mu-list-item>
            <mu-list-item title="会员管理" toggleNested class="ddti">
              <mu-icon slot="left" value="account_box"/>
              <mu-list-item slot="nested" title="会员列表" value="member-list" href="#/workroom/workmemberlist" class="ddl">
                <mu-icon slot="left" value="account_circle"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="增加会员" value="member-add" href="#/workroom/workmemberadd" class="ddl">
                <mu-icon slot="left" value="done"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="会员审核" value="member-pass" href="#/workroom/workmemberpass" class="ddl">
                <mu-icon slot="left" value="spellcheck"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="操作历史" value="member-hty" href="#/workroom/workmemberhty" class="ddl">
                <mu-icon slot="left" value="report_problem"/>
              </mu-list-item>
            </mu-list-item>
            <mu-list-item title="工作室信息管理" toggleNested class="ddti">
              <mu-icon slot="left" value="assignmentind"/>
              <mu-list-item slot="nested" title="工作室信息修改" value="information-get" href="#/workroom/workinformationget" class="ddl">
                <mu-icon slot="left" value="visibility"/>
              </mu-list-item>
              <mu-list-item slot="nested" title="修改密码" value="psd-modify" href="#/workroom/workpsdmodify" class="ddl">
                <mu-icon slot="left" value="lock_open"/>
              </mu-list-item>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="content-detail r">
          <router-view :rootsrc="rootsrc"></router-view>
        </div>
      </div>

    </div>
</template>
<script>
  export default{
    name:'workroom',
    data(){
      return{
        rootsrc:'http://120.76.137.157:8887/wrok/',
        value:'',
        isopen:false,
        size:33,
        accountname:'haha'
      }
    },
    methods:{
      goout:function(router){
        sessionStorage.clear();
        router.push('/worklogin');
      },
      handleChange:function(val){
        this.value = val;
      }
    },
    beforeCreate:function(){
     /* if(!sessionStorage.getItem('token')){
        alert("请登录");
        this.$router.push('/worklogin');
      }*/
    },
    mounted:function(){
      this.accountname = sessionStorage.getItem('name');
      if(this.$route.path =='/workroom/workincomerecord'){
           this.value = 'income-record';
      }
      if(this.$route.path =='/workroom/workcustomsrecord'){
        this.value = 'customs-record';
      }
      if(this.$route.path =='/workroom/workcustomspost'){
        this.value = 'customs-post';
      }
      if(this.$route.path =='/workroom/workmemberlist'){
        this.value = 'member-list';
      }
      if(this.$route.path =='/workroom/workmemberadd'){
        this.value = 'member-add';
      }
      if(this.$route.path =='/workroom/workmemberpass'){
        this.value = 'member-pass';
      }
      if(this.$route.path =='/workroom/workmemberhty'){
        this.value = 'member-hty';
      }
      if(this.$route.path =='/workroom/workinformationget'){
        this.value = 'information-get';
      }
      if(this.$route.path =='/workroom/workpsdmodify'){
        this.value = 'psd-modify';
      }
    }
  }
</script>
<style scoped>
  .imgicon{
    margin-top:.22rem;
    color:white
  }
  .out-to{
    position:relative;
    z-index:700;
  }
  .goout{
    color:#fff;
  }
  #workroom{
    width:100%;
    height:100%;
    background:#fcfcfc;
  }
  .work-header{
    width:100%;
    height:5rem;
    background:#333;
    position:relative;
    padding:1.5rem .5rem;
  }
  .logo,.text{
    height:2rem;
    line-height:2rem;
  }
  .logo{
    width:2rem;
    padding-left:.6rem;
  }
  .text{
    font-size:1.3rem;
    margin-left:.5rem;
    color:white;
  }
  .text:hover{
    opacity:.8;
  }
  .nav{
    position:absolute;
    bottom:0;
    width:100%;
    height:2rem;
    z-index:2;
  }
  .nav-tab{
    width:6rem;
    background:#999999;
    height:100%;
    border-radius:.5rem .5rem 0 0;
    letter-spacing: .5rem;
    overflow:hidden;
  }
  .tab-tab{
    font-size:.85rem;
  }
  .content-box{
    width:100%;
    overflow:hidden;
  }
  .content-nav{
    position:absolute;
    z-index:3;
    background:#ededed;
    border:1px solid #ccc;

  }
  .dds{
   width:224px;
  }
  .content-detail{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    padding-left:224px;
    padding-top:5rem;
    z-index:1;
  }
</style>
