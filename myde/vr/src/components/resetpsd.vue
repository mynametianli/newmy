<template>
  <div id="resetpsd">
    <mu-flexbox class="flex-demo" align="center">
      <mu-flexbox-item class="demo-icon">
        <mu-icon value="language" :size="size"></mu-icon>
      </mu-flexbox-item>
      <mu-flexbox-item class="" grow="11">
        <mu-col class="col-demo" desktop="20">VR9工作室后台管理系统</mu-col>
      </mu-flexbox-item>
    </mu-flexbox>
    <div class="rst_content">
      <h1>找回密码</h1>
      <h3>第一步：验证身份</h3>
      <div class="box brr shadow1 blueb">
        <input type="text" v-model="tel" placeholder="请输入注册时预留的手机号码">
      </div>
      <div class="box">
         <div class="box_l l brr shadow1 blueb">
           <input type="text" v-model="code" placeholder='请输入手机验证码'>
         </div>
         <div class="box_r r">
            <mu-raised-button :label="label" class="getbt rad1" :backgroundColor="bgcolor" @click="getcode"/>
         </div>
      </div>
      <h3>第二步：修改密码</h3>
      <div class="box brr shadow1 blueb">
        <input type="password" v-model="psd" placeholder="请输入新密码">
      </div>
      <div class="box brr shadow1 blueb">
        <input type="password" v-model="psds" placeholder="请再次输入密码">
      </div>
      <div class="wd100">
        <mu-raised-button label="修改密码" class="widbt rad1" backgroundColor="#337ab7" @click="postpsd" :disabeld="disb"/>
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
    name:'resetpsd',
    data(){
      return{
        size:33,
        tel:'',
        code:'',
        psd:'',
        psds:'',
        label:'获取验证码',
        disb:false,
        show:false,
        msg:'',
        suss:false,
        bgcolor:'#337ab7'
      }
    },
    methods:{
      close:function(router){
        this.show = false;
        this.msg = '';
        if(this.suss){
          router.push('/worklogin');
        }
      },
      postpsd:function(){
        if(!this.tel){
          this.msg = '请输入预留手机号';
          this.show = true;
          return;
        }
        if(!this.code){
          this.msg = '请输入验证码';
          this.show = true;
          return;
        }
        if(!this.psd){
          this.msg = '请输入重设密码';
          this.show = true;
          return;
        }
        if(this.psd != this.psds){
          this.msg = '两次输入密码不一致';
          this.show = true;
          return;
        }
        let data = {
            wallet_mobile:this.tel,
            code:this.code,
            password:this.psd
        }
        this.$http.put('http://120.76.137.157:8887/work/reset_pwd/',data).then(res => {
          if(res.body.status == '201'){
            this.suss = true;
        }
        this.msg = res.body.msg;
        this.show = true;
      }, response => {
          this.msg = '网络链接失败';
          this.show = true;

        });
      },
      getcode:function(){
        if(!this.tel){
          this.msg = '请输入预留手机号';
          this.show = true;
          return;
        }
        this.disb = true;
        this.bgcolor = '#ccc';
        this.label = '60秒' ;
        let _this = this;
        let i = 60;
        let timer = setInterval(function(){
          i--;
          if(i < 10){
            _this.label = '0'+ i +'秒'
          }else{
            _this.label =  i + '秒'
          }
          if(i == 0){
            clearInterval(timer);
            _this.label = '获取验证码';
            _this.disb = false;
            _this.bgcolor = '#337ab7'
          }
        },1000)
        if(this.disb){
          let data = {
            wallet_mobile:this.tel
          }
          this.$http.post('http://120.76.137.157:8887/work/reset_pwd/',data).then(res => {
            this.msg = res.body.msg;
            this.show = true;
        }, response => {
            this.msg = '网络链接失败';
            this.show = true;
          });
        }

      }
    }
  }
</script>
<style scoped>
  #resetpsd{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .wd100{
    width:100%;
    text-align:center;
  }
  .rst_content{
    position:absolute;
    left:0;
    top:5rem;
    bottom:0;
    right:0;
    width:40%;
    margin:auto;
    height:25rem;
    border:1px solid #ccc;
    box-shadow:0 0 20px 2px rgba(0,0,0,.8);
    text-align:left;
    padding:.5rem 3rem;
  }
  .rst_content h1{
    text-align:center;
  }
  .box{
    width:80%;
    height:2rem;
    margin-left:10%;
    overflow:hidden;
    margin-bottom:1rem;
  }

  input{
    width:100%;
    height:100%;
    float:left;
    border:none;
    outline:none;
    font-size:.75rem;
    padding-left:.5rem;
  }
  .box_l{
    width:60%;
    height:100%;
    overflow:hidden;
  }
  .brr{
    border-radius:.2rem;
    border:2px solid #ccc;
  }
  .box_r{
    height:100%;
    width:35%;
  }
  .widbt{
    width:80%;
    height:2rem;
    font-size:.9rem;
  }
  .blueb:hover{
    border-color:deepskyblue;
  }
  .getbt{
    width:100%;
    height:100%;
    font-size:.65rem;
    display:block;
  }
  .rad1{
    border-radius:.2rem;
  }
</style>
