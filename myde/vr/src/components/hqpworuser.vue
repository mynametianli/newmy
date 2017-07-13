<template>
  <div id="hqpworuser">
    <div class="header">用户组</div>
    <div class="userbox">
      <div class="l">哈哈</div>
      <div class="r"></div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqpworuser',
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  #hqpworuser{
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
  .userbox{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    padding:2.2rem;
  }
</style>
