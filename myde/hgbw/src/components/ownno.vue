<template>
  <div id="own_no">
      <div>此功能暂未开通，敬请期待!</div>
  </div>
</template>
<script>
  export default{
    name:"ownno",
  }
</script>
<style scoped>
  #own_no{
    width:100%;
    height:100%;
    position:fixed;
    background:#fff;
    z-index:1000;
    top:0;
    left:0;
    font-size:1rem;
  }
  #own_no div{
    min-width:1rem;
    min-height:3rem;
    linehieth:3rem;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
  }
</style>
