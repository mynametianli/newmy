<template>
  <div id="myname">
    <mu-flexbox class="flex-demo" align="center">
      <mu-flexbox-item class="demo-icon">
        <mu-icon value="language" :size="size"></mu-icon>
      </mu-flexbox-item>
      <mu-flexbox-item class="" grow="11">
        <mu-col class="col-demo" slot="default">VR9工作室后台管理系统</mu-col>
      </mu-flexbox-item>
    </mu-flexbox>
    <div class="login_box">
      <div class="myloginbox">
        <mu-paper class="demo-paper" :zDepth="4">
          <div class="backindex">
            <button class="bki" @click="gobackindex">返回</button>
          </div>
          <div class="login_text">登录</div>
          <mu-text-field hintText="请输入您的账号" labelFloat label="账号" :errorText="accounterror" icon="account_circle" v-model="act" class="login_input" inputClass="my" iconClass="login_icon" @blur="actb" @input="actb"/><br/>
          <mu-text-field class="login_input" hintText="请输入您的密码" labelFloat label="密码" :errorText="psderror" v-model="psd" type="password" icon="https" iconClass="login_icon" @blur="psdb" @input="psdb"/><br/>
          <!-- <mu-text-field hintText="请输入验证码" class="code"/>
           <mu-raised-button :label="label" class="mr2 code_detail" disabled backgroundColor="white" color="red"/>
           <mu-raised-button label="看不清" class="mr2" :primary="isprimary"/><br/>-->
          <div class="setbox">
            <mu-checkbox label="记住密码(公共场合慎用)" class="demo-checkbox l" v-model="remberthis"/>
            <mu-flat-button label="忘记密码?" class="demo-flat l" :primary="isprimary" backgroundColor="white" rippleColor="red" @click="goreset($router)"/><br/>
          </div>
          <mu-raised-button label="登录" class="login_btn" backgroundColor="#337ab7" @click="change($router)"/>
         <!-- <mu-flexbox justify="space-between" align="center" orient="horizontal" class="mrt2">
            <mu-flexbox-item  class="aligns">
              <mu-raised-button label="立即激活" class="demo-bt" backgroundColor="#337ab7" @click="goactivate($router)"/>
            </mu-flexbox-item>
            <mu-flexbox-item class="alignr">
              <mu-raised-button label="立即申请" class="demo-bt" backgroundColor="#337ab7" @click="goregister($router)"/>
            </mu-flexbox-item>
          </mu-flexbox>-->
        </mu-paper>
      </div>
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
  export default{
    name:'worklogin',
    data(){
      return {
        accounterror:'',
        psderror:'',
        act:'',
        psd:'',
        label:'1234',
        isall:true,
        isprimary:true,
        size:33,
        show:false,
        msg:'',
        remberthis:false
      }
    },
    methods:{
      gobackindex:function(){
        this.$router.push('/');
      },
      goreset:function(router){
        router.push('/resetpsd')
      },
      actb:function(){
        if(!this.act){
          this.accounterror = '账号不能为空';
        }else{
          this.accounterror = '';
        }
        let mypsd = localStorage.getItem('rember');
        if(mypsd && (this.act == mypsd.split('&')[0])){
          this.psd = mypsd.split('&')[1]
        }
      },
      psdb:function(){
        if(!this.psd){
          this.psderror = '密码不能为空';
        }else{
          this.psderror = '';
        }
      },
      close:function(){
        this.show = false;
        this.msg = '';
      },
      change:function(router){
        if(!this.act){
          this.accounterror = '账号不能为空';
          return;
        }
        if(!this.psd){
          this.psderror = '密码不能为空';
          return;
        }
          let data = {
            wallet_mobile:this.act,
            password:this.psd
          }
          this.$http.post('http://120.76.137.157:8887/work/user_login/',data).then(res => {
            if(res.body.status == '200'){
            sessionStorage.setItem('token',res.body.token);
            sessionStorage.setItem('type','work');
            sessionStorage.setItem('name',res.body.work_name);
            if(this.remberthis){
              localStorage.setItem('rember',this.act+'&'+this.psd)
            }else{
              localStorage.removeItem('rember');
            }
            router.push('workroom/workcustomsrecord');
          }else{
            this.show = true;
            this.msg = res.body.msg
          }
        },res=>{
            this.show = true;
            this.msg = '网络链接失败';
          })

      },
      goregister:function(router){
        router.push('register')
      },
      goactivate:function(router){
        router.push('activate')
      }
    },
    mounted:function(){
      //console.log(this.$route.path)
      if(localStorage.getItem('rember')){
        this.remberthis = true;
      }
    }
  }
</script>
<style scoped>
  .aligns{
    text-align:left;
  }
  #myname{
    width:100%;
    height:100%;
  }

  .setbox{
    height:75px;
    padding-top:15px;
  }
</style>
<style>
  .bki{
    height:30px;
    line-height:30px;
    font-size:20px;
    color:#337ab7;
    outline:none;
    border:none;
    cursor:pointer;
    text-align:left;
    padding-left:14px;
    background:url('/static/img/back.png') no-repeat left center;
  }
  .myloginbox{
    width:100%;
    height:100%;
    position:relative;
  }
  .demo-paper{
    overflow:hidden;
    height:26rem;
    width:30rem;
    text-align:left;
    padding:1.5rem 4rem 3rem 4rem;
    /*float:right;
    margin-right:8rem;*/
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
  }
  .flex-demo{
    height:5rem;
    background:#333;
    color:#fff;
    font-size:1.5rem;
    padding-left:1rem;
    position:fixed;
    top:0;
    left:0;
  }
  .col-demo:hover{
    opacity:.7;
  }
  .demo-icon{
    text-align:right;
    display:flex;
    align:center;
    justify-content:flex-end;
  }
  .login_box{
    padding-top:5rem;
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .mu-text-field{
    width:100% !important;
  }
  .login_input .mu-text-field-content{
    padding-top:32px !important;
    padding-bottom:8px !important;
  }
  .login_text{
    height:2rem;
    font-size:1.5rem;
    text-align:center;
    margin-bottom:1rem;
  }
  .code{
    width:30% !important;
    left:0 !important;
    margin-left:56px !important;
    margin-top:.7rem;
  }

  .login_icon{
    transform:scale(1.5);
  }
  .code_detail{
    font-size:.8rem;
    word-spacing: .1rem;
    letter-spacing: .1rem;
  }
  .mr2{
    margin:.8rem !important;
  }
  .demo-checkbox{
    margin-left:56px;
    font-size:.8rem;
    margin-top:.7rem;
    margin-bottom:1.3rem;
  }
  .login_btn{
    width:100% !important;
    border-radius:.5rem !important;
    height:2.5rem !important;
    font-size:1.3rem;
    letter-spacing: .5rem;
  }
  .demo-flat{
    margin-left:2.8rem !important;
    margin-top:16px !important;
    transform:translateY(-0.35rem) !important;
  }
  .alignr{
    text-align:right;
  }
  .mrt2{
    margin-top:2rem;
  }
  .demo-bt{
    border-radius:.5rem !important;
  }
</style>

