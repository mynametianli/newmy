<template>
  <div id="get_attention">
    <div class="att_top">{{atttop}}</div>
    <div class="att_time">{{atttime}}</div>
    <div class="att_img">
      <img src="/lwx/images/cpxx.png" alt="">
    </div>
    <p v-for="getat in getatt">{{getat}}</p>
  </div>
</template>
<script>
  export default{
    name:"getattention",
    data:function(){
      return{
         atttop:"禾谷百味",
        atttime:"2016-6-15",
        getatt:["为了保证订餐和取餐的合理性，以及您和其他用户的切身利益，特制定本须知。",
                "1.为了保障您和其他用户的利益，系统不允许跨售货机取餐。系统默认为您下单餐品所在的售货机和取餐时的售货机是同一台售货机，",
                "2.如您选择餐品并下单后，请在5分钟内成功完成支付；否则，系统将自动取消该订单。",
                "3.系统每日的收餐时间13:00，退单有效时间为12:40。",
                "4.为了保障您在成功支付订单后能及时品尝到餐品，系统将为您一直保留餐品到收餐时间结束。",
                "5.由于快餐商品的保质期较短的特殊性，请您在每日的收餐时间前及时取餐。",
                "6.订单支付成功后，如您要取消定单，请在每日的退单有效时间前取消订单。如超过此时间后，订单将不可以取消。",
                "7.在收餐时间后如您没有及时取餐，系统将视为您放弃本次的取餐，同时订单将自动失效。过期的餐品，系统将回收并销毁。"
                ]
      }
    }
  }
</script>
<style scoped>
  #get_attention{
    width:100%;
    height:100%;
    position:fixed;
    background:#fff;
    top:0;
    left:0;
    z-index:1000;
    padding:1rem;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
  }
  .att_top,.att_time{
    width:100%;
    height:1.1rem;
    line-height:1.5;
    text-align:left;
  }
  .att_top{
    font-size:.75rem;
  }
  .att_time{
    color:#cccccc;
    font-size:.65rem;
    line-height:1.1rem;
    margin-bottom:1rem;
  }
  .att_img{
    width:100%;
    height:8.5rem;
  }
  .att_img img{
    width:100%;
    height:100%
  }
  #get_attention p{
    width:100%;
    text-align:left;
    color:#3d4145;
    font-size:.65rem;
    line-height:1.2rem;
    min-height:1.2rem;
    margin-top:.65rem;
  }
  .one{

  }
</style>
