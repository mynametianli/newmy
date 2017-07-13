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
          <div class="login_text">工作室激活</div>
          <mu-text-field hintText="请输入您的交易宝号" labelFloat label="请输入交易宝账号" :errorText="accounterror" icon="account_circle" v-model="act" class="login_input" inputClass="my" iconClass="login_icon" @blur="actb" @input="actb"/><br/>
          <mu-text-field class="login_input" hintText="设定密码" labelFloat label="请设置工作室登录密码" :errorText="psderror" v-model="psd" type="password" icon="https" iconClass="login_icon" @blur="psdb" @input="psdb"/><br/>
          <mu-text-field class="login_input" hintText="再次输入密码" labelFloat label="请再次输入密码" :errorText="tpsderror" v-model="tpsd" type="password" icon="https" iconClass="login_icon" @blur="tpsdb" @input="tpsdb"/><br/>
          <mu-text-field class="activate_input" hintText="请输入您的激活码" labelFloat label="请输入收到的六位激活码" :errorText="codeerror" v-model="mycode" type="text" icon="input" iconClass="login_icon" @blur="codeb" @input="codeb"/>
          <br/>
          <mu-raised-button label="激活" class="login_btn" :primary="isprimary" @click="change($router)"/>
        </mu-paper>
      </div>
    </div>
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close($router)"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    name:'login',
    data(){
      return {
        accounterror:'',
        psderror:'',
        act:'',
        psd:'',
        tpsd:'',
        label:'1234',
        isprimary:true,
        size:33,
        show:false,
        msg:'',
        mycode:'',
        codeerror:'',
        tpsderror:'',
        maxl:'6'
      }
    },
    methods:{
      gobackindex:function(){
        this.$router.push('worklogin');
      },
      actb:function(){
        if(!this.act){
          this.accounterror = '账号不能为空';
        }else{
          this.accounterror = '';
        }
      },
      psdb:function(){
        if(!this.psd){
          this.psderror = '密码不能为空';
        }else{
          this.psderror = '';
        }
      },
      tpsdb:function(){
        if(!this.tpsd){
          this.tpsderror = '确认密码不能为空';
        }else{
          this.tpsderror = '';
        }
      },
      codeb:function(){
        if(!this.mycode){
          this.codeerror = '验证码不能为空';
        }else{
          this.codeerror = '';
        }
      },
      close:function(router){
        this.show = false;
        this.msg = '';
        if(this.suss){
          router.push('/worklogin');
        }
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
        if(this.psd != this.tpsd){
          this.psderror = '两次密码输入不一致';
          this.tpsderror = '两次密码输入不一致';
          return;
        }
        if(!this.mycode){
          this.codeerror = '验证码不能为空';
          return;
        }
        let data = {
          wallet_mobile:this.act,
          password:this.psd,
          code:this.mycode
        }
          this.$http.post('http://120.76.137.157:8887/work/active/',data).then(res => {
            if(res.body.status == '200'){
              this.suss = true;
            }
            this.msg = res.body.msg
            this.show = true;
        },res=>{
            this.show = true;
            this.msg = '网络链接失败';
          })
      }
    },
    mounted:function(){
      //console.log(this.$route.path)
    }
  }
</script>
<style scoped>
  #myname{
    width:100%;
    height:100%;
  }

  .setbox{
    height:75px;
    padding-top:15px;
  }
  .login_btn{
    margin-top:10px;
  }
</style>


