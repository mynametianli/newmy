<template>
  <div id="hq">
    <div class="hq-header">
      <div class="logo l">
        <mu-icon value="language" :size="size" class="imgicon"></mu-icon>
      </div>
      <div class="text l">
        VR9总部后台管理系统
      </div>
      <div class="r out-to">
        <span class="l accounttitle">{{accountname}}</span>
        <mu-flat-button label="退出" @click="goout($router)" color="#fff"/>
      </div>
      <!--<div class="nav">
        <mu-tabs :value="menuvalue" class="nav-tab" @change="menuchange">
          <mu-tab value="1" title="基础管理" class="tab-tab" href="#/hq/accountall"/>
          <mu-tab value="2" title="工作室管理" class="tab-tab" href="#/hq/finance"/>
          <mu-tab value="3" title="商城管理(待规划)" class="tab-tab" disabled/>
        </mu-tabs>
      </div>-->
    </div>
    <div class="content-box">
      <div class="content-nav l">
        <component :is="currentview">
        </component>
      </div>
      <div class="content-detail r">
        <router-view @getchildlocation="getlocation"></router-view>
      </div>
    </div>
    <div>
      <mu-dialog :open="setpsd" title="管理密码设置">
        <p>{{setmsg}}</p>
        <div class="accountps">
          <input type="password" placeholder="请输入6位密码" maxlength="6" v-model="payword">
        </div>
        <mu-flat-button label="确定" slot="actions" primary @click="closeset"/>
      </mu-dialog>
    </div>
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  import basic from './basic'
  import wbasic from './wbasic'
  export default{
    name:'hq',
    data(){
      return{
        value:'',
        twovalue:'',
        menuvalue:'1',
        currentview:'wbasic',
        size:33,
        accountname:'',
        setmsg:'此密码为拨币时使用的系统管理密码',
        setpsd:false,
        payword:'',
        show:false,
        msg:''
      }
    },
    components:{
      basic,wbasic
    },
    methods:{
      getlocation:function(val){
      },
      goout:function(router){
        sessionStorage.clear();
        router.push('/hqlogin');
      },
      handleChange:function(val){
        this.value = val;
      },
      handleChange2:function(val){
        this.value = val;
      },
      menuchange:function(val){
        this.menuvalue = val;
        if(val == 2){
          this.currentview = 'wbasic';
        }
        if(val == 1){
          this.currentview = 'basic';
        }
      },
      close:function(){
        this.show = false;
      },
      closeset:function(){
        if(!this.payword || this.payword.length < 6){
          this.msg = '密码不符合规范';
          this.show = true;
          return;
        }
        this.$http({
          method:'PUT',
          url:'http://120.76.137.157:8887/work_admin/set_pay_pwd/',
          body:{
            pay_pwd:this.payword
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '201'){
           this.setpsd = false;
        }
        this.msg = res.body.msg;
        this.show = true;
      }, res => {
          this.msg = '网络链接失败，请稍后再试';
          this.show = true;
        })
      }
    },
    beforeCreate:function(){
     /*if(!sessionStorage.getItem('token')){
        alert("请登录");
        this.$router.push('/hqlogin');
        //window.location.href = '/';
      }else{
       this.$http({
         method:'GET',
         url:'http://120.76.137.157:8887/work_admin/is_pwd/',
         params:{
         },
         headers:{
           'Authorization':sessionStorage.getItem('token')
         }
       }).then( res => {
          if(!res.body.is_pay_pwd){
              this.setpsd = true;
         }
       }, res => {

       })
     }*/

    },
    mounted:function(){
      this.accountname = sessionStorage.getItem('name');
      var url = this.$route.path;
      if(url == '/hq/accountall' || url == '/hq/accountadd'|| url ==  '/hq/pworuser'|| url == '/hq/pworsetup'|| url == '/hq/pwormap'|| url == '/hq/lockte'|| url == '/hq/lockpy'|| url == '/hq/sharesetup' || url == '/hq'){
        this.menuvalue = '1';
        this.currentview = 'basic';
      }else{
        this.menuvalue = '2';
        this.currentview = 'wbasic';
      }
    }
  }
</script>
<style scoped>
  .accountps input{
    text-align:center;
  }
  .imgicon{
    margin-top:.15rem;
    color:white
  }
  .out-to{
    position:relative;
    z-index:700;
  }
  #hq{
    width:100%;
    height:100%;
    background:#fcfcfc;
  }
  .hq-header{
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
    width:24rem;
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
    overflow:hidden;
    border:1px solid #ccc;
  }


  .content-menu{
    width:250px;
  }
  .content-detail{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    padding-left:250px;
    padding-top:5rem;
    z-index:1;
  }

</style>
<style>
  .ddl{
    width:250px;
  }
</style>
