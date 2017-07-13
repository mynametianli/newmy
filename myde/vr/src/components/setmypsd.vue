<template>
  <div id="modify">
    <div class="header">系统拨币密码修改</div>
    <div class="box">
      <div class="psd-demo">
        <div class="l psd-text">原密码：</div>
        <div class="l psdbox">
          <input type="password" v-model="psd" maxlength="6">
        </div>
      </div>
      <div class="psd-demo">
        <div class="l psd-text">新密码：</div>
        <div class="l psdbox">
          <input type="password" v-model="npsd" maxlength="6">
        </div>
      </div>
      <div class="psd-demo">
        <div class="l psd-text">确认密码：</div>
        <div class="l psdbox">
          <input type="password" v-model="tpsd" maxlength="6">
        </div>
      </div>
      <div class="psd-demo bt">
        <div class="l psd-text"></div>
        <div class="l">
          <mu-raised-button label="保存" class="savebt" @click="savepsd"/>
        </div>
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
    name:'workpsdmodify',
    data(){
      return{
        psd:'',
        npsd:'',
        tpsd:'',
        show:false,
        msg:'',
        suss:false
      }
    },
    methods:{
      close:function(router){
        this.show = false;
        if(this.suss){
          this.psd = '';
          this.npsd = '';
          this.tpsd = '';
        }
      },
      savepsd:function(){
        if(!this.npsd){
          this.show = true;
          this.msg = '请输入新密码';
          return;
        }
        if(!this.psd){
          this.show = true;
          this.msg = '请输入原密码';
          return;
        }
        if(this.npsd != this.tpsd){
          this.show = true;
          this.msg = '两次密码输入不一致';
          return;
        }
        let data = {
          old_pay_pwd:this.psd,
          pay_pwd:this.npsd
        }
        this.$http({
          method:'POST',
          url:'http://120.76.137.157:8887/work_admin/set_pay_pwd/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(res => {

        if(res.body.status == '201'){
          this.msg = res.body.msg;
          this.suss = true;
        }else{
          this.msg = res.body.msg;
        }
        this.show = true;
      }, res => {
          this.msg = '网络链接失败';
          this.show = true;
        })
      }
    }
  }
</script>
<style scoped>
  #modify{
    width:100%;
    height:100%;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
    margin-bottom:20px;
  }
  .psd-demo{
    width:100%;
    height:36px;
    line-height:36px;
    font-size:16px;
    margin:6px 0;
  }
  .psd-text{
    width:122px;
    text-align:right;
    margin-right:36px;
    height:100%;
  }
  .psd-demo input{
    width:100%;
    height:100%;
    float:left;
    outline:none;
    border:none;
    padding-left:5px;
  }
  .psdbox{
    width:256px;
    height:100%;
    border:1px solid #ccc;
  }
  .bt{
    margin-top:24px;
  }
  .savebt{
    width:120px;
    border-radius:8px;
  }
</style>
