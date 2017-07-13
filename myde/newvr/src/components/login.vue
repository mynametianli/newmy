<template>
  <div id="myname">
      <mu-flexbox class="flex-demo" align="center">
        <mu-flexbox-item class="demo-icon">
          <mu-icon value="language" :size="size"></mu-icon>
        </mu-flexbox-item>
        <mu-flexbox-item class="" grow="11">
          <mu-col class="col-demo" slot="default">VR9后台管理系统</mu-col>
        </mu-flexbox-item>
      </mu-flexbox>
      <div class="login_box">
        <div class="choosebox">
          <div  class="work_btn"  @click="gowork($router)">工作室登录</div>
          <div  class="hq_btn" @click="gohq($router)">总部登录</div>
        </div>
      </div>
  </div>
</template>
<script>
  export default{
    name:'login',
    data(){
      return {
        size:33
      }
    },
    methods:{
      gowork:function(router){
        router.push('/worklogin')
      },
      gohq:function(router){
        router.push('/hqlogin')
      }
    },
    mounted:function(){
        //console.log(this.$route.path)
    }
  }
</script>
<style scoped>
  #myname{
    width:100%;
    height:100%;
  }

  .setbox{
    height:75px;
    padding-top:15px;
  }
</style>
<style>
  .choosebox{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    width:500px;
    height:300px;
    padding:70px 50px;
    border:1px double #ccc;
    box-shadow:0 0 6px 2px rgba(0,0,0,.2);
  }
  .work_btn,.hq_btn{
    width:100%;
    font-size:20px;
    line-height:60px;
    font-weight:bold;
    height:60px;
    border:2px solid #00bcf2;
    color:#00bcf2;
    border-radius:40px;
    cursor:pointer;
    transition:background 1s;
    text-align:center;
    letter-spacing: 20px;
    padding-left:20px;
  }
  .hq_btn{
    margin-top:40px;
  }
  .hq_btn:hover{
    background:#00bcf2;
    color:white;
  }
  .work_btn:hover{
    background:#00bcf2;
    color:white;
  }
  .myloginbox{
    width:100%;
    height:100%;
    position:relative;
  }
  .demo-paper{
    overflow:hidden;
    height:26rem;
    width:30rem;
    text-align:left;
    padding:1.5rem 4rem 3rem 4rem;
    /*float:right;
    margin-right:8rem;*/
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
  }
  .flex-demo{
    height:5rem;
    background:#333;
    color:#fff;
    font-size:1.5rem;
    padding-left:1rem;
    position:fixed;
    top:0;
    left:0;
  }
  .demo-icon{
    text-align:right;
    display:flex;
    align:center;
    justify-content:flex-end;
  }
  .login_box{
    padding-top:5rem;
    position:relative;
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .mu-text-field{
    width:100% !important;
  }
  .login_input .mu-text-field-content{
    padding-top:32px !important;
    padding-bottom:8px !important;
  }
  .login_text{
    height:2rem;
    font-size:1.5rem;
    text-align:center;
    margin-bottom:1rem;
  }
  .code{
    width:30% !important;
    left:0 !important;
    margin-left:56px !important;
    margin-top:.7rem;
  }

  .login_icon{
    transform:scale(1.5);
  }
  .code_detail{
      font-size:.8rem;
      word-spacing: .1rem;
      letter-spacing: .1rem;
  }
  .mr2{
    margin:.8rem !important;
  }
  .demo-checkbox{
    margin-left:56px;
    font-size:.8rem;
    margin-top:.7rem;
    margin-bottom:1.3rem;
  }
  .login_btn{
    width:90% !important;
    border-radius:.5rem !important;
    height:2.5rem !important;
    font-size:1.3rem;
    letter-spacing: .5rem;
    margin-left:2%;
  }
  .demo-flat{
    margin-left:2.8rem !important;
    margin-top:16px !important;
    transform:translateY(-0.35rem) !important;
  }
  .alignr{
      text-align:right;
  }
  .mrt2{
      margin-top:2rem;
  }
  .demo-bt{
    border-radius:.5rem !important;
  }
</style>

