<template>
  <div id="hqlockte">
    <div class="header">注册审核锁定</div>
    <div class="lockte-title">当前规则</div>
    <div class="box-demo">
      <div class="l box-textl">规则名称：</div>
      <div class="l box-textf">注册审核锁定</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">规则描述：</div>
      <div class="l box-textf">工作室在前端申请了工作室账号之后，将自动锁定，需要后台审核工作人员审核注册申请之后，手动解锁。</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">规则状态：</div>
      <div class="l box-textf">{{locktestatus}}</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">生效时间：</div>
      <div class="l box-textf">{{locktetime}}</div>
    </div>
    <div class="lockte-line"></div>
    <div class="lockte-title">规则操作</div>
    <div class="box-demo locktemt">
      <div class="l box-textl">规则状态：</div>
      <div class="l box-textf">
        <mu-radio label="启用规则" name="group" nativeValue="1" v-model="value" class="lockte-radio"/>
        <mu-radio label="禁用规则" name="group" nativeValue="2" v-model="value"/>
      </div>
    </div>
    <div class="box-demo locktemt">
      <div class="l box-textl">生效时间：</div>
      <div class="l box-textf">
        <mu-radio label="立即生效" name="time" nativeValue="1" v-model="time" class="lockte-radio"/>
        <mu-radio label="生效时间：" name="time" nativeValue="2" v-model="time"/>
        <mu-date-picker mode="landscape" hintText="请选择生效日期" class="lockte-date" :underlineShow="isshow" v-model="settime"/>
      </div>
    </div>
    <div class="box-demo locktemtt">
      <div class="l box-textl textcolor">生效时间：</div>
      <div class="l box-textf">
        <mu-raised-button label="更新" class="lockte-bt"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqlockte',
    data(){
      return{
        locktetime:'2012-02-23',
        locktestatus:'已启用',
        value:'1',
        time:'1',
        isshow:false,
        settime:''
      }
    },
    methods:{

    },
    beforeCreate:function(){

    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  #hqlockte{
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
  .lockte-title{
    width:100%;
    height:36px;
    line-height:36px;
    font-size:16px;
    font-weight:bold;
    text-align:left;
    padding-left:2rem;
  }
  .box-demo{
    width:100%;
    height:28px;
    line-height:28px;
    font-size:14px;
    padding-left:2rem;
  }
  .box-textl,.box-textf{
    height:100%;
    text-align:left;
  }
  .box-textf{
    padding-left:1rem;
  }
  .lockte-line{
    width:85%;
    margin:14px 0 14px 2rem;
    height:1px;
    background:#ccc;
  }
  .lockte-radio{
    margin-right:2rem;
  }
  .locktemt{
    margin-top:10px;
  }
  .lockte-date{
    top:-8px;
  }
  .locktemtt{
    margin-top:30px;
  }
  .textcolor{
    color:transparent;
  }
  .lockte-bt{
    width:140px;
    border-radius:8px;
    font-size:16px;
  }
</style>
<style>
  .lockte-date .mu-text-field-input{
    border:1px solid #ccc !important;
    width:125px;
  }
  .lockte-date{
    width:125px !important;
  }
</style>
