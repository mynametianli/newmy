<template>
  <el-row id="reset">
      <h1>请将您的浏览器升级到IE10及以上，以获取更好的体验</h1>
  </el-row>
</template>
<script>
  export default{
    name:'reset',
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  #reset{
    width:100%;
    height:100%;
  }
  h1{
    width:800px;
    height:50px;
    line-height:50px;
    position:fixed;
    top:50%;
    left:50%;
    margin-top:-25px;
    margin-left:-400px;
    text-align:center;
  }
</style>
