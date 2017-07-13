<template>
  <div id="vr_login">
       <div class="vr_login_img">
         <img src="/lwx/images/logo.png" alt="">
       </div>
    <div class="vr_login_all">
        <div class="vr_login_phone">
          <div class="phone_text">{{vrphonetext}}</div>
          <div class="phone_dt">
            <input type="text" v-model="vrphone"/>
          </div>
        </div>
        <!--<div class="vr_login_pwd">
          <div class="pwd_text">{{vrpwdtext}}</div>
          <div class="pwd_dt">
            <input type="password" v-model="vrpwd" @keyup="con"/>
          </div>
        </div>-->
    </div>
    <div class="vr_ensure"><button @click="loginvr($router)">{{vrensuretext}}</button></div>
    <div class="errormodal" v-show="errorshow">
      <div class="errormodal_top">{{errortext}}</div>
      <div class="errormodal_bottom" @click.stop="errorhide">
        确定
      </div>
    </div>
    <div id="errorshade" v-show="errorshow"></div>
  </div>
</template>
<script>
  export default{
    name:'vrlogin',
    data:function(){
      return{
         vrphonetext:"手机号码",
         vrpwdtext:"登录密码",
         vrensuretext:"登录",
         vrphone:"",
         vrpwd:"",
         errortext:"",
         errorshow:false
      }
    },
    methods:{
      errorhide:function(){
        //错误提示框隐藏
        this.errorshow = false;
      },
      loginvr:function(router){
        //登录vr9账号，登录成功后绑定到该微信号
        var _this = this;
        $.ajax({
          type:"post",
          url:"/user/tradebookbind",
          data:{
            mobile:_this.vrphone
          },
          success:function(res){
             if(JSON.parse(res).status == "200"){
               router.push("mypay");
             }else{
               _this.errorshow = true;
               _this.errortext = JSON.parse(res).message;
             }

          }
        })
      }
    }
  }
</script>
<style scoped>
   #vr_login{
     width:100%;
     height:100%;
     position:fixed;
     z-index:1000;
     top:0;
     left:0;
     background:white;
   }
   .vr_login_img{
     width:100%;
     height:12rem;
     position:relative;
   }
   .vr_login_img img{
     position:absolute;
     width:5.5rem;
     height:5.5rem;
     top:0;
     left:0;
     bottom:0;
     right:0;
     margin:auto;
   }
   .vr_login_all{
     width:100%;
     height:5rem;
     padding:0rem .5rem;
   }
   .vr_login_phone,.vr_login_pwd{
     width:100%;
     height:2.5rem;
     line-height:2.5rem;
     border-bottom:1px solid #999999;
   }
  .phone_text,.pwd_text{
    width:20%;
    height:100%;
    font-size:.85rem;
    margin-right:10%;
    color:#3d4145;
  }
   .phone_text,.pwd_text,.phone_dt,.pwd_dt{
     float:left;
   }
  .phone_dt,.pwd_dt{
    width:70%;
    height:100%
  }
   .phone_dt input,.pwd_dt input{
      width:100%;
     height:100%;
     border:none;
     font-size:.85rem;
     outline:none;
   }
   .vr_ensure{
     width:100%;
     height:2.5rem;
     padding:0rem .5rem;
   }
  .vr_ensure button{
    width:100%;
    height:100%;
    border-radius:.35rem;
    overflow:hidden;
    background:#007aff;
    margin-top:2rem;
    border:none;
    outline:none;
    color:white;
    font-size:.85rem
  }
   .errormodal{
     width:13.5rem;
     height:6.94rem;
     position:fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin:auto;
     background:white;
     z-index:1111;
     border-radius:.35rem .35rem .35rem .35rem;
     overflow:hidden;
     font-size:.85rem;
   }
   #errorshade{
     width:100%;
     height:100%;
     background:rgba(0,0,0,.4);
     top:0;
     left:0;
     position:fixed;
     z-index:1011;
   }
   .errormodal_top{
     width:100%;
     height:4.74rem;
     color:#3d4145;
     line-height:4.74rem;
   }
   .errormodal_bottom{
     width:100%;
     background:#cccccc;
     color:#272636;
     height:2.24rem;
     text-align:center;
     line-height:2.24rem;
   }
</style>
