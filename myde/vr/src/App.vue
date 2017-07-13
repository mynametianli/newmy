<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{

    }
  },
  methods:{
  },
 /* beforeUpdate:function(){
    if(this.bottomNav == 'music'){
      this.$router.push("helleo")
    }else{
      this.$router.push("/")
    }
  }*/
  mounted:function(){
    console.log()
  }
}
</script>

<style>
  @media screen and (min-width:0px)and (max-width:2000px){
    html{font-size:20px !important;}
  }
  .mu-list{
    padding:0 !important;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
  *{
    box-sizing:border-box;
  }
  body{
    -moz-user-select:  none;
  }
  html,body{
    width:100%;
    height:100%;
    background:#fcfcfc;
  }
  .l{
    float:left;
  }
  .r{
    float:right;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{-moz-appearance:textfield;}
  td{
    font-size:14px !important;
  }
  .btmar{
    margin-top:10px;
  }
  .loadmr{
    margin-top:23px !important;
  }
  .header{
    background:#f5f5f5 !important;
    border-bottom:1px solid #ccc;
    color:#06c;
  }
  .mu-td{
   white-space:inherit !important;
  }
  .redmark{
    color:red;
    position:relative;
    top:2px;
  }
  .accounttitle{
    color:#fff;
    margin-top:8px;
  }
  .dfhistory-paging,.dfhandle-paging,.workaccount-paging1,.workaccount-paging,.custorms-paging,.member-paging{
    position:relative;
  }
  .showlists{
    position:absolute;
    top:7px;
    left:44px;
  }
  .workaccount-paging1{
    margin-top:10px;
  }
  .workaccount-paging1 .showlists{
    left:0px;
  }
  .mu-table{
    overflow:hidden;
  }
</style>
