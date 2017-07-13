<template>
  <div id="get_all">
      <div id = "noonefood" v-show="showno">暂无购买信息</div>
      <div id="get_content">
            <div class="get_food" v-for="(oneorder,index) in allorder">
                <div class="get_top">
                  <span>{{oneorder.food_info.mechine_name}}</span>
                  <span>位置：</span>
                  <span>{{oneorder.food_info.mechine_locate.replace(/四川省成都市/g,"")}}</span>
                  <span @click="goomycode($router,index)">扫二维码取餐</span>
                </div>
                <div class="get_middle" v-for="(onefood,index) in oneorder.food_info.foods">
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
                <div class="get_bottom">
                  <div><span>交易时间:</span><span>{{oneorder.create_time}}</span></div>
                  <div><span>合计：</span><span>{{oneorder.cost_total}}</span></div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
  export default{
    name:"getfood",
    data(){
      return{
        msg:"zzzz",
        allorder:[],
        showno:false,
        priceunit:"个"
      }
    },
    methods:{
      goomycode:function(router,index){
        //储存订单信息，跳转二维码页面
        sessionStorage.setItem("mycode",JSON.stringify(this.allorder[index]));
        router.push("mycode");
      }
    },
    beforeCreate:function(){
      //初始化取餐页面
      var _this = this;
      $.ajax({
        type:"get",
        url:"/user/order",
        data:{
         state:"1"
         },
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
              if(_this.allorder.length >= 1){
                _this.showno = false;
              }
            }else{
              _this.allorder = [];
              _this.showno = true;
            }
          }else{
            _this.allorder = [];
            _this.showno = true;
          }
        },
        error:function(){
          _this.showno = true;
        }
      })
    }
  }
</script>
<style scoped>
  #get_all{
    width:100%;
    height:100%;
  }
  #get_content{
    width:100%;
    height:100%;
    padding-bottom:2.5rem;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  .get_food{
    width:100%;
    mine-height:11.35rem;
    background:white;
    margin-bottom:.5rem;
  }
  .get_top{
    width:100%;
    height:2.2rem;
    padding:.5rem .75rem;
    line-height:1.2rem;
    border-bottom: 1px solid #ccc;
  }
  .get_top span{
    float:left;
  }
  .get_top span:nth-child(1){
    margin-right:0.1rem;
    width:3rem;
    font-size:0.75rem;
    text-align: left;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .get_top span:nth-child(2),.get_top span:nth-child(3){
    color:#ccc;
    font-size:0.65rem;
  }
  .get_top span:last-of-type{
    float:right;
    color:#e54346;
    font-size:0.75rem;
   }
  .get_middle{
    overflow:hidden;
  }
  .get_middle dt{
    float:left;
    width:7rem;
    height:6rem;
    margin-left:.75rem;
    margin-top:.5rem;
  }
  .get_middle dt:before{
    content:"";
    display:none;
  }
  .get_middle dt img{
    width:100%;
    height:100%
  }
  .get_middle dd{
    width:11rem;
    height:7rem;
    padding:.5rem .75rem;
    float:right
  }
  .get_middle dd div{
    overflow:hidden;
  }
  .get_middle dd span:nth-child(1){
    font-size:.75rem;
    float:left;
    line-height:1.5rem
  }
  .get_middle dd span:nth-child(2){
    font-size:.85rem;
    float:right;
    color:#ccc;
    line-height:1.5rem
  }
  .get_middle dd span:nth-child(3){
    font-size:.85rem;
    float:right;
    color:#ccc;
    line-height:1.5rem
  }
  .get_bottom{
    width:100%;
    height:2.2rem;
    padding:.5rem .75rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    line-height:1.1rem;
    font-size:.65rem;
  }
  .get_bottom div:nth-child(1){
    float:left;
    color:#999999;
  }
  .get_bottom div:nth-child(2){
    float:right
  }
  #noonefood{
    width:100%;
    height:100%;
    position:fixed;
    z-index:1;
    font-size:2rem;
    text-align:center;
    padding-top:12rem;
  }
</style>
