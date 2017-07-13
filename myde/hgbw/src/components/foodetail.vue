<template>
   <div id="detail_content">
       <div class="detail_top">
         <img :src="root+onefood.foodimg" alt="">
       </div>
     <div class="detail_txt">
       <div class="detail_titile">{{onefood.foodname}}</div>
       <div class="detail_detail">{{onefood.description}}</div>
     </div>
     <div class="detail_clk">
       <div class="detail_clk_left">
         <img src="/lwx/images/iphone.png" alt="">
         <a href="tel:17263726171">17263726171</a>
       </div>
       <div class="detail_clk_right">
         <div class="dcr_l" @click="decreasebuy()">-</div>
         <div class="dcr_c">
           <input type="text" v-model="buynum" readonly>
         </div>
         <div class="dcr_r" @click="addbuy()">+</div>
       </div>
     </div>
     <div class="bottom_clk">
          <div class="bck_l">{{"￥"+parseFloat(onefood.pricewechat)*parseFloat(buynum)+"元"}}</div>
          <div class="bck_r">
               <div class="enter_car" @click="pushcar()">加入购物车</div>
               <div class="sure_buy" @click="buynow($router)">立即购买</div>
          </div>
     </div>
   </div>
</template>
<script>
  export default{
    name:'foodetail',
    data:function(){
      return{
         onefood:"",
         root:"",
         buynum:"1"
      }
    },
    methods:{
       addbuy:function(){
         //数量增加
           if(this.buynum >= this.onefood.maxnum){
             this.buynum = this.onefood.maxnum;
           }else{
             this.buynum = parseInt(this.buynum)+1;
           }
          this.onefood.buynum = this.buynum;
       },
       decreasebuy:function(){
         //数量减少
         if(this.buynum <=1){
           this.buynum = 1;
         }else{
           this.buynum = parseInt(this.buynum) - 1;
         }
         this.onefood.buynum = this.buynum;
       },
       buynow:function(router){
         //立即购买，跳转到购买页面
         var onefoods = [];
         onefoods.push(this.onefood)
         sessionStorage.setItem("buyfood",JSON.stringify(onefoods));
         router.push("buygoods");
       },
       pushcar:function(){
         //加入购物车
         if(this.buynum > 0){
            var iss = true;
            var buy = this.buynum;
           var good = this.onefood;
            var shopgoods = JSON.parse(sessionStorage.getItem("cargoods"));
            if(shopgoods){
                for(var i in shopgoods){
                  if(shopgoods[i].foodid == good.foodid){
                    shopgoods[i].buynum = parseInt(shopgoods[i].buynum) + parseInt(good.buynum);
                    iss = false;
                  }
                }
                if(iss){
                  shopgoods.push(good);
                }
                sessionStorage.setItem("cargoods",JSON.stringify(shopgoods));
            }else{
              var goods = [];
              goods.push(good);
              sessionStorage.setItem("cargoods",JSON.stringify(goods));
            }
         }
         if(sessionStorage.getItem("buynums")){
            buy =  parseInt(buy)+parseInt(sessionStorage.getItem("buynums"));
           sessionStorage.setItem("buynums",buy);
         }else{
           sessionStorage.setItem("buynums",buy);
         }
         this.$emit("pushcar",buy);
       }
    },
    mounted:function(){
      //获取餐品信息
      this.onefood = JSON.parse(sessionStorage.getItem("onefood"));

    }
  }
</script>
<style scoped>
  #detail_content{
    width:100%;
    height:100%;
    position:fixed;
    background:#eee;
    z-index:200;
  }
  .detail_top{
    width:100%;
    height:10rem;
  }
  .detail_top img{
    width:100%;
    height:100%;
  }
  .detail_txt{
    margin-top:.5rem;
    width:100%;
    padding:.5rem .75rem .5rem .5rem;
    background:white;
  }
  .detail_titile,.detail_detail{
    text-align:left;
  }
  .detail_titile{
    height:1.1rem;
    line-height:1.1rem;
    font-size:.85rem;
    color:#272636;
    font-weight:500;
    margin-bottom:.5rem;
  }
  .detail_detail{
    font-size:.75rem;
    line-height:1rem;
    text-indent: 2em;
  }
  .detail_clk{
    width:100%;
    height:2.7rem;
    overflow:hidden;
    background:white;
    padding:0 .5rem 1rem .5rem;
  }
  .detail_clk_left{
    float:left;
    height:1.7rem;
  }
  .detail_clk_left img{
    float:left;
    width:1.7rem;
    height:1.7rem;
  }
  .detail_clk_left a{
    float:right;
    height:1.7rem;
    line-height:1.7rem;
    font-size:.85rem;
    margin-left:.2rem;
    color:#272636;
    text-decoration: none;
  }
  .detail_clk_right{
    float:right;
    height:1.7rem;
    width:7.5rem;
  }
  .detail_clk_right div{
    width:2.4rem;
    float:left;
    height:1.7rem;
    line-height:1.7rem;
  }
  .dcr_l{
    border:1px solid #c9c9c9;
    border-radius:.25rem 0 0 .25rem;
  }
  .dcr_c input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    height:100%;
  }
  .dcr_c{
    border-top:1px solid #c9c9c9;
    border-bottom:1px solid #c9c9c9;
    overflow:hidden;
    text-align:center;
  }
  .dcr_r{
    border:1px solid #c9c9c9;
    border-radius:0 .25rem .25rem 0;
  }
  .bottom_clk{
    width:100%;
    height:2.5rem;
    padding-left:1.8rem;
    line-height:2.5rem;
    position:fixed;
    bottom:0;
    z-index:300;
    background:white;
    font-size:.85rem;
  }
  .bck_l{
    float:left;
    color:#e54346;

  }
  .bck_r{
    float:right;
    height:2.5rem;
  }
  .enter_car{
    float:left;
    width:5.5rem;
    height:2.5rem;
    text-align:center;
  }
  .sure_buy{
    float:right;
    width:5.5rem;
    height:2.5rem;
    text-align:center;
    background:#e54346;
    color:white;
  }
</style>
