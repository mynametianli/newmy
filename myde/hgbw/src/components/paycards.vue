<template>
     <div id="paycard">
         <div class="top_img">
           <img src="/lwx/images/kp.png" alt="">
         </div>
       <div class="paycard_text">实体卡可以ATM上取现金；在POS机上刷卡消费</div>
       <div class="paycard_pay" @touchstart.stop="changepick()">
           <div class="pay_icon" :class="{pick:ispick}"></div>
           <div class="pay_text">请您阅读并同意<span class="colorb">《服务条款》</span></div>
       </div>
       <div class="pay_msg">如您需要实体卡，请您支付20元人民币制卡费。</div>
       <div class="pay_bottom">
           <button class="pay_ensure" @click.stop="gopaycard($router)">微信支付</button>
       </div>
     </div>
</template>
<script>
  export default{
    name:"paycards",
    data:function(){
      return{
         ispick:false
      }
    },
    methods:{
      changepick:function(){
        //s是否同意服务条款改变状态
        this.ispick = !this.ispick;
      },
      gopaycard:function(router){
        //跳转到微信支付页面，只能使用微信支付
        if(this.ispick){
           router.push("paymycard/");
        }
      }
    }

  }
</script>
<style scoped>
  #paycard{
    width:100%;
    height:100%;
    position:fixed;
    z-index:2000;
    background:#f5f5f5;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  .top_img{
    width:100%;
    height:13.32rem;
    padding:1rem;
  }
  .top_img img{
    width:100%;
    height:100%;
  }
  .paycard_text{
    width:100%;
    height:3.58rem;
    line-height:3.58rem;
    padding-left:.5rem;
    color:#3d4145;
    font-size:.65rem;
    text-align:left;
    background:#fff;
  }
  .paycard_pay{
    width:100%;
    height:3.5rem;
    padding:1.2rem .75rem 1.2rem .75rem;
    background:#fff;
    margin-top:.5rem;

  }
  .colorb{
    color:#0894ec;
  }
  .pay_icon{
    width:1.1rem;
    height:1.1rem;
    border-radius:1.1rem;
    border:1px solid #c7c7cc;
    overflow:hidden;
    float: left;
  }
  .pick{
    background:url("/lwx/images/pick.png");
    background-size:cover;
    border-style:hidden !important;
  }
  .pay_text{
    min-width:80%;
    text-align:left;
    height:1.1rem;
    line-height:1.1rem;
    float:left;
    margin-left:.2rem;
    font-size:.65rem;
  }
  .pay_msg{
    width:100%;
    height:2.2rem;
    line-height:2.2rem;
    font-size:.65rem;
    padding-left:.5rem;
    text-align:left;
    margin-top:.5rem;
  }
  .pay_bottom{
    width:100%;
    height:3.4rem;
    padding:.5rem;
    margin-top:2.5rem;
  }
  .pay_ensure{
    border:none;
    overflow:hidden;
    width:100%;
    height:2.4rem;
    line-height:2.4rem;
    background:#eb4f38;
    color:white;
    font-size:.85rem;
    border-radius:.25rem;
    outline:none;
  }
</style>
