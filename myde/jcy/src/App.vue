<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @media screen {

  }
  html,body{
    padding:0;
    margin:0;
    width:100%;
    height:100%;
    font-size:16px;
    overflow:hidden;
  }
  body{
    height:100%;
    font-size:14px;
  }
  #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
    height:100%;
    width:100%;
   }
  .wth100{
    width:100%;
  }
  .bsz{
    box-sizing:border-box;
  }
  .el-submenu .el-menu{
    background:none;
  }
  .el-menu-item, .el-submenu__title{
    font-size:1rem;
    text-align:left;

  }
  .el-table th{
    text-align:center !important;
  }
  .ctdialog .el-dialog{
    top:50% !important;
    transform:translate(-50%,-50%) !important;
  }
  .block{
    width:100%;
    text-align:right;
    margin-top:10px;
  }
  .el-table__body-wrapper{
    overflow-y:hidden !important;
  }
  .el-card{
    margin-top:12px;
    height:180px;
  }
  /*.cell span{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }*/
</style>
