<template>
  <div id="hqsharesetup">
    <div class="header">分润设置</div>
    <div class="box-demo sharesetupmt" v-for="(box,index) in boxlists">
      <div class="l box-textl">{{box+'：'}}</div>
      <div class="l box-textf">
        <div class="l box-width">
          <input type="text" class="l">
        </div>
      </div>
      <div class="l box-textf">
        %
      </div>
    </div>
    <div class="box-demo sharesetupmtt">
      <div class="l box-textl textcolor">生效时间：</div>
      <div class="l box-textf">
        <mu-raised-button label="更新" class="sharesetup-bt"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqsharesetup',
    data(){
      return{
        boxlists:['总部分润比','省分支分润比','市分支分润比']
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
  #hqsharesetup{
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
  .box-textl{
    min-width:102px;
    text-align:right;
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
  .sharesetupmt{
    margin-top:10px;
  }
  .textcolor{
    color:transparent;
  }
  .sharesetup-bt{
    width:140px;
    border-radius:8px;
    font-size:16px;
  }
  .sharesetupmtt{
    margin-top:30px;
  }
</style>
