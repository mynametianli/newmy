<template>
  <div id="own_content">
      <div class="own_top">
         <div class="own_img">
           <img :src="userpic" alt="">
         </div>
         <div class="own_text">
           <div class="ott">
             <span>{{username}}</span>
             <img src="/lwx/images/vvip.png" alt="">
           </div>
           <div class="otb">
             会员号:{{uservr}}
           </div>
         </div>
      </div>
    <div class="own_down">
         <ul>
           <router-link tag="li" :to="list.src" class="own_clk" v-for="list in lists">
             <img class="ock_l" :src="list.url" alt="">
             <span class="ock_l">{{list.text}}</span>
             <span class="ock_r"></span>
           </router-link>
         </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    name:"ownmsg",
    data:function(){
      return{
        lists:[
          {"url":"/lwx/images/wo07.png","text":"卡申请","src":"/owncar"},
          {"url":"/lwx/images/wo02.png","text":"订餐/取餐须知","src":"/my/getattention"},
          {"url":"/lwx/images/wo03.png","text":"我的订单","src":"/order"},
          {"url":"/lwx/images/wo04.png","text":"我的卡券","src":"/my/ownno"},
          {"url":"/lwx/images/wo05.png","text":"我的积分","src":"/my/ownno"},
          {"url":"/lwx/images/wo06.png","text":"我的禾豆","src":"/my/ownno"}
        ],
        userpic:"",
        username:'',
        uservr:"",
      }
    },
    mounted:function(){
      //初始化用户头像，微信名，会员号
      this.username = sessionStorage.getItem("username");
      this.uservr = sessionStorage.getItem("uservr");
      this.userpic = sessionStorage.getItem("userhead");
    }
  }
</script>
<style scoped>
   #own_content{
     width:100%;
     height:100%;
     padding-bottom:2.5rem;
   }
  .own_top{
    width:100%;
    height:4.15rem;
    padding:.45rem 0rem .5rem .65rem;
    background:white;
    margin-bottom:.5rem;
  }
  .own_img,.own_text{
    float:left;
  }
  .own_img{
    width:3.2rem;
    height:3.2rem;
    margin-right:.75rem;
  }
  .own_img img{
    width:100%;
    height:100%;
  }
  .own_text{
    width:10rem;
    height:3.2rem;
    padding:.4rem 0rem;
  }
  .ott{
    font-size:.85rem;
    height:1.7rem;

  }
  .ott span{
    height:0.948rem;
    float:left;
    line-height:1.2rem;
  }
   .ott img{
    float:left;
    width:1.1rem;
    height:0.948rem;
  }
  .otb{
    line-height:0;
    text-align:left;
    font-size:.65rem;
    color:#3d4145;
  }
  .own_down{
    width:100%;
    overflow:hidden;
  }
   .own_down ul{
     width:100%;
   }
  .own_clk{
    width:100%;
    height:2.54rem;
    padding:.7rem .75rem .6rem .75rem;
    border-bottom:1px solid #e7e7e7;
  }
  .ock_l{
    float:left;
  }
  .ock_r{
    float:right;
    width:.7rem;
    height:.72rem;
    background:url("/lwx/images/go.png");
    background-size:cover;
    margin-top:.26rem;
  }
   .own_clk img{
     width:1.1rem;
     height:1.1rem;
     margin-top:0.07rem;
   }
  span[class=ock_l]{
    height:1.24rem;
    line-height:1.24rem;
    font-size:.85rem;
    margin-left:.4rem;
    color:#272636;
  }
</style>
