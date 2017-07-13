
<template>
  <div id="foo_all">
    <div id="header">
      <div class="header_l">
        <img src="/lwx/images/location.png" alt="">
        <router-link to="/city" tag="div">{{mycity +"    "+ machinename}}</router-link>
       </div>
      <!--<div class="header_r">
        <input type="text" class="search" placeholder="请输入食物名">
      </div>-->
    </div>
    <div id="foo_header">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imgs,index) in imgall"><img :src="root+imgs.pic" alt=""></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
    </div>
    <div id="foo_nav">

        <dl v-for="(nav,index) in navs" @touchstart.stop="changefood($route,$event,index)">
            <dt><img :src="'/lwx/images/img'+index+'.png'" alt=""></dt>
            <dd :class="{dd_active:isclkn[index]}">{{nav}}</dd>
        </dl>
    </div>
    <div id="foo_content">
      <transition name="foofade" mode="out-in">
          <div class="detail_food" v-for="(food,index) in foods" @click.stop="gofoodetail($router,$event,index)">
                <div class="l">
                    <dl>
                        <dt><img :src="root+food.pic" alt=""></dt>
                        <dd>
                          <p>图片仅供参考</p>
                          <p>售货机编号：</p>
                          <p>{{mymachine}}</p>
                        </dd>
                    </dl>
                </div>
                <div class="r">
                    <dl>
                      <dt>
                          <p>{{food.name}}</p>
                          <p>单价：<span>{{"￥" + food.price_cny + "元"}}</span></p>
                          <p>VR9：<span>{{food.price_vr9+"个"}}</span></p>
                          <p class="p_last">地址：<span>{{address}}</span></p>
                      </dt>
                      <dd>
                        <button class="add_car" @click.stop="add_car($router,$event,index)"  @touchstart.stop="beclick(index)" @touchend.stop="outclick(index)" :class="{click_car:isclk[index]}">加入购物车</button>
                        <button class="add_shop" @click.stop="tobuygoods($router,$event,index)">立即购买</button>
                        <!--<button class="add_shop">立即购买</button>-->
                      </dd>
                    </dl>
                </div>
          </div>
      </transition>
    </div>
  </div>
</template>

<script>
  /*import Myxx from './Myxx'*/
  export default{
    name:"foo",
    props:["root"],
    components:{
    },
    data(){
      return{
            navs:["新品","热卖","套餐","饮品"],
            foods:[],
            isclkn:["true","","",""],
            isaoao:"A",
            mycity:"",
            address:"",
            mymachine:"",
            cargoods:[],
            imgall:[],
            isclk:[],
            machinename:''
      }
    },
    methods:{
      beclick:function(index){
        //按下加入购物车的时候按钮背景改变
        this.isclk.splice(index,1,true);
      },
      outclick:function(index){
        //加入购物车的时候按钮背景还原
        this.isclk.splice(index,1,false);
      },
      changefood:function($route,event,index){
        //点击新品，热卖，套餐，饮品，商品信息列表改变
          var _this = this;
          if(index == "0"){
            this.isaoao = "A";
            this.getfoods("id");
          }
          if(index == "1"){
            this.isaoao = "B";
            this.getfoods("sell");
          }
          if(index == "2"){
            this.isaoao = "C";
            this.getcats("A");
          }
          if(index == "3"){
            this.isaoao = "D";
            this.getcats("B");
          }
           this.isclkn=["","","",""];
           this.isclkn.splice(index,1,"true");
           this.isclk = [];
           for(var i in this.foods){
              this.isclk.push(false)
           }

      },
      add_car:function(router,event,index){
            //将商品加入购物车
           var iss = true;
           if(sessionStorage.getItem("cargoods")){
               var cargood = {
                 foodname:this.foods[index].name,
                 description:this.foods[index].description,
                 maxnum:this.foods[index].num,
                 foodid:this.foods[index].id,
                 pricewechat:this.foods[index]["price_cny"],
                 pricevr:this.foods[index]["price_vr9"],
                 foodimg:this.foods[index].pic,
                 buynum:"1",
               };
              var cargoods = JSON.parse(sessionStorage.getItem("cargoods"));
              for(var i in cargoods){
                if(cargoods[i].foodid == cargood.foodid){
                  cargoods[i].buynum = parseInt(cargoods[i].buynum) + 1;
                  iss = false;
                }
              }
             if(iss){
                cargoods.push(cargood);
             }
             sessionStorage.setItem("cargoods",JSON.stringify(cargoods));
           }
           if(!sessionStorage.getItem("cargoods")){
              var cargood = [{
                foodname:this.foods[index].name,
                description:this.foods[index].description,
                maxnum:this.foods[index].num,
                foodid:this.foods[index].id,
                pricewechat:this.foods[index]["price_cny"],
                pricevr:this.foods[index]["price_vr9"],
                foodimg:this.foods[index].pic,
                buynum:"1"
              }];
             sessionStorage.setItem("cargoods",JSON.stringify(cargood));
           }
           if(sessionStorage.getItem("buynums")){
              var num = parseFloat(sessionStorage.getItem("buynums"))
             sessionStorage.setItem("buynums",num+1);
           }else{
             sessionStorage.setItem("buynums",1);
           }
          var buy = parseInt(sessionStorage.getItem("buynums"))
          //触发购车车商品总数发生改变
          this.$emit("add_car",buy);
      },
      tobuygoods:function(router,event,index){
        //购买单份餐品
         var buyfood = [{
           foodname:this.foods[index].name,
           description:this.foods[index].description,
           maxnum:this.foods[index].num,
           foodid:this.foods[index].id,
           pricewechat:this.foods[index]["price_cny"],
           pricevr:this.foods[index]["price_vr9"],
           foodimg:this.foods[index].pic,
           buynum:"1"
         }]
        sessionStorage.setItem("buyfood",JSON.stringify(buyfood));
        router.push("buygoods");
      },
      gofoodetail:function(router,event,index){
        //查看商品详情，存入当前商品信息
        var onefood = {
            foodname:this.foods[index].name,
            description:this.foods[index].description,
            maxnum:this.foods[index].num,
            foodid:this.foods[index].id,
            pricewechat:this.foods[index]["price_cny"],
            pricevr:this.foods[index]["price_vr9"],
            foodimg:this.foods[index].pic,
            buynum:"1"
        }
        sessionStorage.setItem("onefood",JSON.stringify(onefood));
        router.push("foodetail");
      },
      getfoods:function(id){
        //获取新品热卖
        var machine = localStorage.getItem("mymachine");
        var _this = this;
        $.ajax({
          type:"get",
          url:"/foodByMechine",
          data:{
            mechine_number:machine,
            order:id
          },
          success:function(res){
            res = JSON.parse(res);
            _this.foods = res.data;
          }
        })
      },
      getcats:function(id){
        //获取套餐，饮品
        var machine = localStorage.getItem("mymachine");
        var _this = this;
        $.ajax({
          type:"get",
          url:"/foodByMechine",
          data:{
            mechine_number:machine,
            kind:id
          },
          success:function(res){
            res = JSON.parse(res)
            _this.foods = res.data;
          }
        })
      }
    },
    beforeCreate:function(){
      //获取当前机器的banner图
      var machine = localStorage.getItem("mymachine");
      var _this = this;
      $.ajax({
        type:"get",
        url:"/mechine/banner",
        data:{
          mechine_number:machine
        },
        success:function(res){
          res = JSON.parse(res);
          if(res.status == "success"){
            _this.imgall = res.banner;
          }
        }
      });

    },
    mounted:function(){
      //轮播图设置
      var machine = localStorage.getItem("mymachine");
      var _this = this;
      setTimeout(function(){
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: 2000,
          pagination : '.swiper-pagination',
          loop:true,
          /*paginationClickable: true,*/
          autoplayDisableOnInteraction: false

        })
      },800);
      this.machinename = localStorage.getItem("machinename");
      this.mycity = localStorage.getItem("mycity");
      this.address = localStorage.getItem("address");
      this.mymachine = localStorage.getItem("mymachine");
      //获取当前机器的新品类餐品
      $.ajax({
        type:"get",
        url:"/foodByMechine",
         data:{
         mechine_number:machine,
         order:"id"
         },
        success:function(res){
          res = JSON.parse(res)
          _this.foods = res.data;
          _this.isclk = [];
          for(var i in res.data){
            _this.isclk.push(false);
          };
        }
      });
    }
  }
</script>
<style scoped>
  .fadefoo-enter-active,.fade-leave-active {
    transition: opacity .5s;
  }
  .fadefoo-enter-active{
    opacity:1;
  }
  .fadefoo-enter{
    opacity: 0;
  }
  .fadefoo-leave{
    opacity:0;
  }
  .fadefoo-leave-active{
    opacity:0;
  }
  .swiper-container{
    width:100%;
    height:100%;
  }
  .swiper-container img{
    width:100%;
    height:100%;
  }
  #header{
    width:100%;
    height:2.5rem;
    background:white;
/*    position:fixed;
    z-index:999999999;
    top:0;*/
  }
  #foo_all{
    width:100%;
    height:100%;
    overflow-y:auto;
    /*padding-top:2.5rem;*/
    padding-bottom:2.5rem;
    -webkit-overflow-scrolling: touch;
  }
  #foo_header,#foo_nav,#foo_content{
    width:100%;
  }
  #foo_content{
    display:none;
    transition:all 2s;
  }
  #foo_header{
    height:10rem;
  }
  #foo_nav{
    height:5.58rem;
    background:white;
  }
  #foo_nav dl{
    width:25%;
    height:100%;
    float:left;
    text-align:center;
    padding:1rem 0;
    text-align:center;
    font-size:.75rem;
  }
  #foo_nav dl dd{
    padding-top:.3rem;
  }
  #foo_nav dl .dd_active{
    color:red;
  }
  #foo_nav img{
    width:2.1rem;
    height:2.1rem;
    display:inline-block;
  }
  #foo_content .detail_food{
    font-size:.7rem;
    margin-top:.85rem;
    width:100%;
    height:11.1rem;
    background:#fff;
    padding-top:.5rem;
  }
  #foo_content .detail_food img{
    width:7rem;
    height:6rem;
    margin-bottom:.3rem;
  }
  .detail_food:before{
    content:"";
    diaplay:none;
  }
  #foo_content .detail_food .l,#foo_content .detail_food .r{
    float:left;
    height:100%
  }
  #foo_content .detail_food .l{
    width:7rem;
    margin-left:1.2rem;
    font-size:0.65rem
  }
  #foo_content .detail_food .r{
    width:9.8rem;
    margin-left:.5rem;
  }
  #foo_content .detail_food dd{
    height:2.88rem;
    margin-top:.9rem;
  }
  #foo_content .detail_food .l dd{
    text-align:left;
    padding-left:.9rem;
    line-height:1rem
  }
  #foo_content .detail_food .l dd p:nth-child(1){
    color:#ccc;

  }
  #foo_content .detail_food .r dt{
    text-align:left;
    padding-left:.8rem;
    height:6rem;
    margin-bottom:.3rem;
  }
  #foo_content .detail_food .r p{
    line-height:1.4rem;
    min-height:1.4rem;
  }
  #foo_content .detail_food .r dt p:nth-child(1){
    font-size:.85rem;
    color:#272636;
  }
  .p_last{
    line-height:1rem !important;
  }
  .add_car,.add_shop{
    width:4.8rem;
    height:1.35rem;
    border-radius:.25rem;
    outline:none
  }
  .add_car{
    border:1px solid #6e727b;
    cursor:pointer;
    background:#fff;
  }
  .click_car{
    border-color:#eb4f38 !important;
    background:#eb4f38 !important;
    color:white !important;
  }
  .add_shop{
    background:#eb4f38;
    border:none;
    color:white;
  }
  .header_l{
    width:100%;
    height:100%;
    padding:.75rem;
    float:left;
  }
  .header_l img{
    width:.8rem;
    height:1rem;
  }
  .header_l img, .header_l div{
    float:left;
  }
  .header_l div{
    height:1rem;
    line-height:1.1rem;
    font-size:.75rem;
    margin-left:.4rem;
    color:#272636;
  }
  .header_r{
    min-width:8rem;
    margin-right:.5rem;
    float:right;
    border:1px solid #b4b4b4;
    height:1.6rem;
    margin-top:.45rem;
    border-radius:.25rem;
    overflow:hidden;
  }
  .search{
    width:100%;
    height:100%;
    border:none;
    outline:none;

  }
</style>
