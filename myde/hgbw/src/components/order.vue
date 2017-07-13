<template>
    <div id="order_cnt">
        <div id="order_clk" class="bgwht">
          {{clktext}}
        </div>
        <div class="order_food" v-for="(oneorder,index) in allorder">
          <div class="order_top" >
            <span class="one">{{oneorder.food_info.mechine_name}}</span>
            <span class="two">位置：</span>
            <span class="three">{{oneorder.food_info.mechine_locate.replace(/四川省成都市/g,"")}}</span>
            <!--<span class="four">{{oneorder.state == "1" ? "待取餐" : "已完成"}}</span>-->
            <span class="four" v-show="oneorder.state == '1' ">待取餐</span>
            <span class="four" v-show="oneorder.state == '2' ">已取餐</span>
            <span class="four" v-show="oneorder.state == '3' ">已退款</span>
          </div>
          <div class="order_middle" v-for="(onefood,index) in oneorder.food_info.foods">
            <dl>
              <dt>
                <img :src="onefood.foodimg" alt="">
              </dt>
              <dd>
                <div><span>{{onefood.foodname}}</span><span>{{oneorder.pay_type == "20"? onefood.pricewechat + "元" : onefood.pricevr + "个"}}</span></div>
                <span>{{"X" + onefood.num}}</span>
              </dd>
            </dl>
          </div>
          <div class="order_bottom">
            <div><span>交易时间:</span><span>{{oneorder.create_time}}</span></div>
            <div><span>合计：</span><span>{{oneorder.cost_total}}</span></div>
          </div>
          <div class="goget">
            <div class="buttdiv" v-show="oneorder.state == '1'">
                <div class="quxiao" @click="refund(oneorder.number)">取消订单</div>
                <div class="queding" @click="googetfoo($router)">取餐</div>
            </div>
          </div>
        </div>
        <div class="modal" v-show="modalshow">
          <div class="modal_top">确定要取消订单吗</div>
          <div class="modal_bottom">
            <div @click.stop="cancel()">取消</div>
            <div @click.stop="ensure($router)">确定</div>
          </div>
        </div>
        <div id="shade" v-show="modalshow"></div>
        <div class="errormodal" v-show="errorshow">
          <div class="errormodal_top">{{errortext}}</div>
          <div class="errormodal_bottom" @click.stop="errorhide">
            确定
          </div>
        </div>
        <div id="errorshade" v-show="errorshow"></div>
    </div>
</template>
<script>
   export default{
     name:"order",
     data:function(){
       return {
           clktext:"全部订单",
           allorder:[],
           priceunit:"个",
           errorshow:false,
           modalshow:false,
           mynumber:"",
           errortext:"",
           refundss:false
       }
     },
     methods:{
       errorhide:function(){
         //错误提示框消失，如果退款不成功，刷新页面
         if(!this.refundss){
           this.mynumber = "";
           this.errorshow = false;
         }else{
           window.location.reload();
         }
       },
       cancel:function(){
         //取消订单框消失
          this.mynumber = "";
          this.modalshow = false;
       },
       ensure:function(){
         //申请退款
         var _this = this;
         $.ajax({
           type:"post",
           url:"/user/refund",
           data:{
             number:_this.mynumber
           },
           success:function(res){
             res = JSON.parse(res);
             if(res.status == "success"){
                _this.mynumber = "";
               _this.refundss = true;
               _this.errortext = "退款成功";
               _this.errorshow = true;
             }else{
                _this.mynumber = "";
                _this.modalshow = false;
                _this.errorshow = true;
                _this.errortext = "申请退款失败"
             }
           }
         })
       },
       googetfoo:function(router){
         //跳转到取餐页面
            router.push("getfood");
       },
       refund:function(number){
            //弹出取消订单框
            this.mynumber = number;
            this.modalshow = true;
       }
     },
     beforeCreate:function(){
       //初始化订单页面
       var _this = this;
       $.ajax({
         type:"get",
         url:"/user/order",
       /*  data:{
           state:"1"
         },*/
         success:function(res){
           res = JSON.parse(res);
           if(res.status == "success"){
             if(res.orders){
               for(var i = 0; i < res.orders.length; i++){
                 if(res.orders[i]["pay_type"] == "20"){
                   res.orders[i]["cost_total"] = res.orders[i]["cost_total"]+"元";
                 }else{
                   res.orders[i]["cost_total"] = res.orders[i]["cost_total"]+"个";
                 }
               }
               _this.allorder = res.orders;
             }else{
               _this.allorder = [];
             }
           }else{
             _this.allorder = [];
           }
         }
       })
     }

   }
</script>
<style scoped>
  #order_cnt{
    width:100%;
    height:100%;
    position:fixed;
    z-index:200;
    background:#eee;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  #order_clk{
    width:100%;
    height:2.5rem;
    line-height:2.5rem;
    margin-bottom:.5rem;
    font-size:.85rem;
  }
  #order_clk div{
    float:left;
    width:33.333%;
    text-align:center;
    font-size:.7rem;
    border:1px solid #e6e6e6;
  }
  .bgwht{
    background:white;
  }
  .bgred{
    background:#e54346;
  }
  #order_content{
    width:100%;
    height:100%;
    overflow-y:auto;
  }
  .order_food{
    width:100%;
    min-height:11.35rem;
    background:white;
    margin-bottom:.5rem;
  }
  .order_top{
    width:100%;
    height:2.2rem;
    padding:.5rem .75rem;
    line-height:1.2rem;
    border-bottom: 1px solid #ccc;
  }
  .order_top span{
    float:left;
  }
  .order_top .one{
    min-width:3rem;
    font-size:0.75rem;
    text-align: left;
    margin-right:.3rem;
    /*overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;*/
  }
  .order_top .two,.order_top .three{
    color:#ccc;
    font-size:0.65rem;
  }
  .order_top .four{
    float:right;
    color:#e54346;
    font-size:0.75rem;
  }
  .order_middle{
    overflow:hidden;
  }
  .order_middle dt{
    float:left;
    width:7rem;
    height:6rem;
    margin-left:.75rem;
    margin-top:.5rem;
  }
  .order_middle dt:before{
    content:"";
    display:none;
  }
  .order_middle dt img{
    width:100%;
    height:100%
  }
  .order_middle dd{
    width:11rem;
    height:7rem;
    padding:.5rem .75rem;
    float:right
  }
  .order_middle dd div{
    overflow:hidden;
  }
  .order_middle dd span:nth-child(1){
    font-size:.75rem;
    float:left;
    line-height:1.5rem
  }
  .order_middle dd span:nth-child(2){
    font-size:.85rem;
    float:right;
    color:#ccc;
    line-height:1.5rem
  }
  .order_middle dd span:nth-child(3){
    font-size:.85rem;
    float:right;
    color:#ccc;
    line-height:1.5rem
  }
  .order_bottom{
    width:100%;
    height:2.2rem;
    padding:.5rem .75rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    line-height:1.1rem;
    font-size:.65rem;
  }
  .order_bottom div:nth-child(1){
    float:left;
    color:#999999;
  }
  .order_bottom div:nth-child(2){
    float:right
  }
  .goget{
    width:100%;
    height:2.2rem;
    padding:.4rem .75rem;
  }
  .buttdiv{
    float:right;
    height:1.4rem;
    width:8.32rem;
  }
  .quxiao,.queding{
    width:4.13rem;
    height:1.4rem;
    line-height:1.4rem;
    font-size:.7rem;
    border-radius:.25rem;
    overflow:hidden;
  }
  .quxiao{
    background:white;
    color:#6e727b;
    border:1px solid #6e727b;
    marg-right:.5rem;
    outline:none;
    float:left;
  }
  .queding{
    background:white;
    color:white;
    background:#eb4f38;
    float:right;
    border:none;
  }
  .modal,.errormodal{
    width:13.5rem;
    height:6.94rem;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:auto;
    background:white;
    z-index:1111;
    border-radius:.35rem .35rem .35rem .35rem;
    overflow:hidden;
    font-size:.85rem;
  }

  #shade,#errorshade{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    top:0;
    left:0;
    position:fixed;
    z-index:1011;
  }
  .modal_top,.errormodal_top{
    width:100%;
    height:4.74rem;
    color:#3d4145;
    line-height:4.74rem;
  }
  .modal_bottom{
    width:100%;
    background:#cccccc;
    color:#272636;
    height:2.24rem;
    text-align:center;
    line-height:2.24rem;
    position:relative;
  }
  .errormodal_bottom{
    width:100%;
    background:#cccccc;
    color:#272636;
    height:2.24rem;
    text-align:center;
    line-height:2.24rem;
  }
  .modal_bottom div{
    width:50%;
  }
  .modal_bottom div:nth-child(1){
    float:left;
  }
  .modal_bottom div:nth-child(2){
    float:right;
  }
  .modal_bottom:before{
    content:"";
    position:absolute;
    width:2px;
    height:1.12rem;
    display:block;
    background:#bbb;
    top:50%;
    margin-top:-.56rem;
    left:50%;
  }
</style>
