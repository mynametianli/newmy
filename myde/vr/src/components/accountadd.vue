<template>
  <div id="accountadd">
    <div class="detail">
      <div class="header">新增账号</div>
      <div class="dtbox">
        <div class="detail-demo" v-for="(box,index) in boxmsg">
          <div class="l dt-text">{{box}}：</div>
          <div class="l dt-input">
            <input type="text" class="l" v-model="actmsg[index]" v-if="index != 1 && index != 2">
            <input type="password" class="l" v-model="actmsg[index]" v-if="index == 1 || index == 2">
          </div>
        </div>
        <!--<div class="detail-demo1">
          <div class="l dt-text">备注：</div>
          <div class="l dt-edit"><textarea name="" class="l" v-model="note"></textarea></div>
        </div>-->
        <div class="detail-demo mrbt">
          <div class="l dt-text"></div>
          <div class="l textl">
            <mu-raised-button label="新增" class="closedetail" @click.stop="adddetail"/>
          </div>
        </div>

      </div>
    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>
<script>
  export default{
    name:'accountadd',
    data(){
      return{
        show:false,
        note:'',
        msg:'',
        actmsg:[],
        boxmsg:['用户名','密码','确认密码','真实姓名','手机号码']
      }
    },
    methods:{
      close:function(){
        this.show = false;
        this.msg = '';
      },
      adddetail:function(){
        let data = {
          username:this.actmsg[0],
          password:this.actmsg[1],
          nick_name:this.actmsg[3],
          mobile:this.actmsg[4]
          //note:this.note
        }
        this.$http({
          method:'post',
          url:'http://120.76.137.157:8887/work/add_admin/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          this.show = true;
          this.msg = res.body.msg;
          if(res.body.status == '201'){
            this.actmsg = [];
          }
      }, res => {
          this.show = true;
          this.msg = '网络链接失败';
        })

      }

    },
    beforeCreate:function(){

    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  #accountadd{
    width:100%;
    height:100%;
    position:relative;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
  }
  .detail{
    position:absolute;
    width:100%;
    overflow:hidden;
    background:#f0f0f0;
    left:0;
    top:0;
    z-index:10;
    padding-bottom:22px;
  }
  .detail .header{
    position:relative;
  }
  .detail-demo{
    width:100%;
    height:36px;
    line-height:36px;
    font-size:16px;
    margin:10px;
  }
  .detail-demo1{
    width:100%;
    line-height:36px;
    font-size:16px;
    margin:10px;
    overflow:hidden;
  }
  .dtbox{
    width:100%;
    overflow:hidden;
    padding-left:2rem;
    padding-top:2.2rem;
  }
  .dt-text{
    width:6.01rem;
    text-align:right;
    margin-right:36px;
    height:100%;
  }
  .textl{
    text-align:left;
    margin-top:22px;
  }
  .closedetail{
    width:10rem;
    border-radius:8px;
    margin-bottom:2px;
  }
  .dt-input{
    width:15rem;
    height:36px;
    border:1px solid #ccc;
  }
  .dt-input:hover{
    border-color:deepskyblue;
  }
  .dt-input input{
    width:100%;
    height:100%;
    outline:none;
    padding-left:5px;
    border:none;
  }
  .dt-edit{
    width:30rem;
    height:100px;
    border:1px solid #ccc;
  }
  .dt-edit textarea{
    width:100%;
    height:100%;
    border:none;
    line-height:1.5;
    resize:none;
  }
</style>
