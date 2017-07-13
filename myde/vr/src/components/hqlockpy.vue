<template>
  <div id="hqlockpy">
    <div class="header">注册打款锁定</div>
    <div class="lockpy-title">当前规则</div>
    <div class="box-demo">
      <div class="l box-textl">规则名称：</div>
      <div class="l box-textf">注册打款锁定</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">规则描述：</div>
      <div class="l box-textf">工作室账号在注册并通过审核之后，需要在某个时间段内打款一定金额，账号才能继续使用，否则账号将被自动锁定。</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">&ensp;&ensp;时间段：</div>
      <div class="l box-textf">{{day+'天'}}</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">打款金额：</div>
      <div class="l box-textf">{{money+'元'}}</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">规则状态：</div>
      <div class="l box-textf">{{lockpystatus}}</div>
    </div>
    <div class="box-demo">
      <div class="l box-textl">生效时间：</div>
      <div class="l box-textf">{{lockpytime}}</div>
    </div>
    <div class="lockpy-line"></div>
    <div class="lockpy-title">规则操作</div>
    <div class="box-demo lockpymt">
      <div class="l box-textl">&ensp;&ensp;时间段：</div>
      <div class="l box-textf">
        <div class="l box-width">
          <input type="text" class="l">
        </div>
      </div>
      <div class="l box-textf">
        天
      </div>
    </div>
    <div class="box-demo lockpymt">
      <div class="l box-textl">打款金额：</div>
      <div class="l box-textf">
        <div class="l box-width">
          <input type="text" class="l">
        </div>
      </div>
      <div class="l box-textf">
        元
      </div>
    </div>
    <div class="box-demo lockpymt">
      <div class="l box-textl">规则状态：</div>
      <div class="l box-textf">
        <mu-radio label="启用规则" name="group" nativeValue="1" v-model="value" class="lockpy-radio"/>
        <mu-radio label="禁用规则" name="group" nativeValue="2" v-model="value"/>
      </div>
    </div>
    <div class="box-demo lockpymt">
      <div class="l box-textl">生效时间：</div>
      <div class="l box-textf">
        <mu-radio label="立即生效" name="time" nativeValue="1" v-model="time" class="lockpy-radio"/>
        <mu-radio label="生效时间：" name="time" nativeValue="2" v-model="time"/>
        <mu-date-picker mode="landscape" hintText="请选择生效日期" class="lockpy-date" :underlineShow="isshow" v-model="settime"/>
      </div>
    </div>
    <div class="box-demo lockpymtt">
      <div class="l box-textl textcolor">生效时间：</div>
      <div class="l box-textf">
        <mu-raised-button label="更新" class="lockpy-bt"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqlockpy',
    data(){
      return{
        lockpytime:'2012-02-23',
        lockpystatus:'已启用',
        value:'1',
        time:'1',
        isshow:false,
        money:'1000',
        day:'3',
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
  #hqlockpy{
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
  .lockpy-title{
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
  .box-width{
    width:120px;
    height:100%;
    border:1px solid #ccc;
  }
  .box-width input{
    width:100%;
    height:100%;
    border:none;
    outline:none;
    padding-left:2px;
    text-align:center;
  }
  .lockpy-line{
    width:85%;
    margin:14px 0 14px 2rem;
    height:1px;
    background:#ccc;
  }
  .lockpy-radio{
    margin-right:2rem;
  }
  .lockpymt{
    margin-top:10px;
  }
  .lockpy-date{
    top:-8px;
  }
  .lockpymtt{
    margin-top:30px;
  }
  .textcolor{
    color:transparent;
  }
  .lockpy-bt{
    width:140px;
    border-radius:8px;
    font-size:16px;
  }
</style>
<style>
  .lockpy-date .mu-text-field-input{
    border:1px solid #ccc !important;
    width:125px;
  }
  .lockpy-date{
    width:125px !important;
  }
</style>
