<template>
  <div id="car_all">
        <div id="car_detail">
              <div class="car_goods">
                 <div class="car_top" @click="toppick()">
                   <div class="car_all">
                     <span class="car_icon" :class="ispick ? 'pick':''"></span>
                     <span class="car_address">{{address}}</span>
                   </div>
                 </div>
                <ul class="car_down">
                <li v-for="(shop, index) in shopgoods"  @click="getchoose($event,index)">
                  <div class="car_alld">
                    <!--<input class="cmp_price" type="checkbox" @change="ceshi1($event,index)">-->
                    <div class="car_down_left">
                      <span :class="choosetrue[index] ? 'pick':''"></span>
                    </div>
                    <div class="car_down_middle">
                      <img :src="root+shop.foodimg" alt="">
                    </div>
                    <div class="car_down_right" :class="index > 0 ? 'car_down_border':''">
                      <div class="cdr_text">
                        <span>{{shop.foodname}}</span>
                        <span class="price">{{'￥'+ shop.pricewechat+ '元'}}</span>
                      </div>
                      <div class="cdr_clk">
                        <div class="cdr_clk_left">
                          <div class="ccl_left" @click.stop="decrease($event,index)">-</div>
                          <div class="ccl_middle">
                            <input type="text" class="goods_num" v-model="nums[index]" readonly/>
                          </div>
                          <div class="ccl_right" @click.stop="addshop($event,index)">+</div>
                        </div>
                        <div class="cdr_clk_right">
                          <span @click.stop="dlt($event,shop,index)"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              </div>
        </div>
        <div class="modal">
          <div class="modal_top">确定删除该套餐吗</div>
          <div class="modal_bottom">
            <div @click="cancel()">取消</div>
            <div @click="ensure()">确定</div>
          </div>
        </div>
        <div id="shop_car_foot">
            <div class="scf_l">{{'￥'+allprice +'元'}}</div>
            <div class="scf_r" @click="buyfood($router)">{{text}}</div>
        </div>
        <div id="shade"></div>
  </div>
</template>
<script>
  export default{
    name:"shopcar",
    /*props:["shopgoods"],*/
    data:function(){
      return{
          text:"立即购买",
          removeindex:"",
          address:"",
          root:"",
          shopgoods:[],
          choosetrue:[],
          nums:[],
          maxnums:[],
          price:[],
          ispick:false,
          allprice:0,
          buyfoods:[],
          nobuyfoods:[],
      }
    },
    computed:{
    },
    watch:{
    },
    methods:{
      buyfood:function(router){
        //购买商品，跳转到支付选择页面
        if(this.allprice > 0){
          for(var i in this.choosetrue){
            if(this.choosetrue[i]){
              this.buyfoods.push(this.shopgoods[i]);
            }else{
              this.nobuyfoods.push(this.shopgoods[i]);
            }
          }
          sessionStorage.setItem("buyfood",JSON.stringify(this.buyfoods));
          sessionStorage.setItem("nobuyfoods",JSON.stringify(this.nobuyfoods));
          router.push("buygoods");
        }
      },
      toppick:function(){
        //商品的全选和反选
        this.ispick = !this.ispick;
        if(this.ispick){
          for(var i in this.choosetrue){
            this.choosetrue.splice(i,1,true)
          }
        }else{
          for(var i in this.choosetrue){
            this.choosetrue.splice(i,1,false)
          }
        }
      },
      getchoose:function(event,index){
        //商品选中状态
         this.choosetrue.splice(index,1,!this.choosetrue[index]);
      },
      addshop:function(event,index){
        //增加商品
        var buy = parseInt(sessionStorage.getItem("buynums"));
        if(this.nums[index] < this.maxnums[index]){
             var num = parseInt(this.nums[index])+1
             this.nums.splice(index,1, num);
             buy += 1;
        }
        this.shopgoods[index].buynum = this.nums[index];
        sessionStorage.setItem("buynums",buy);
        this.$emit("addshop",buy);
        sessionStorage.setItem("cargoods",JSON.stringify(this.shopgoods));
      },
      decrease:function(event,index){
        //减少商品
          var buy = parseInt(sessionStorage.getItem("buynums"));
          if(this.nums[index] > 1){
            this.nums.splice(index,1,this.nums[index]-1);
            buy -= 1;
          }
          this.shopgoods[index].buynum = this.nums[index];
          sessionStorage.setItem("buynums",buy);
          this.$emit("decrease",buy);
          sessionStorage.setItem("cargoods",JSON.stringify(this.shopgoods));
      },
      dlt:function(event,shop,index){
        //商品删除弹框出现
          $(".modal").addClass("show_modal");
          $("#shade").addClass("show_modal");
          this.removeindex = index;
      },
      cancel:function(){
        //取消删除商品
        $(".modal").removeClass("show_modal");
        $("#shade").removeClass("show_modal");
        this.removeindex = "";
      },
      ensure:function(){
        //确认删除商品
        this.choosetrue.splice(this.removeindex,1);
        this.nums.splice(this.removeindex,1);
        this.maxnums.splice(this.removeindex,1);
        this.price.splice(this.removeindex,1);
        this.shopgoods.splice(this.removeindex,1);
        var  allnums = 0;
        $(".modal").removeClass("show_modal");
        $("#shade").removeClass("show_modal");
        if(this.shopgoods == ""){
          $(".car_goods").remove();
          sessionStorage.removeItem("buynums");
          sessionStorage.removeItem("cargoods");
        }else{
          for(var i in this.nums){
            allnums = allnums + parseInt(this.nums[i]);
          }
          sessionStorage.setItem("buynums",allnums);
          sessionStorage.setItem("cargoods",JSON.stringify(this.shopgoods));
        }
        this.$emit("ensure",allnums);
      },
      getallprice:function(){
        //计算当前选中商品总价
        var _this = this;
        var all = 0;
        if(_this.choosetrue.length > 0){
         for(var i in _this.choosetrue){
           if(_this.choosetrue[i]){
             all +=  _this.nums[i] * _this.price[i];
           }
         }
        }
        _this.allprice = all;
      }
    },
    updated:function(){
      //商品的增删减，价格随之变化
      this.getallprice();
    },
    mounted:function(){
      //初始化购物车
      sessionStorage.removeItem("nobuyfoods");
      var _this = this;
      this.address = localStorage.getItem("address");
      this.shopgoods = JSON.parse(sessionStorage.getItem("cargoods"));
      var choose = JSON.parse(sessionStorage.getItem("cargoods"));
      if(choose){
        for(var i in choose){
          _this.choosetrue.push(false);
          _this.nums.push(choose[i].buynum);
          _this.maxnums.push(choose[i].maxnum);
          _this.price.push(choose[i].pricewechat)
        }
      }
      if(!this.shopgoods){
        $(".car_goods").remove();
      }
    },
    beforeCreate:function(){

    }
  }
</script>
<style scoped>
  .show_modal{
    display:block !important;
  }
  .car_all,.car_alld{
    display:block;
    width:100%;
    height:100%;
  }
  input{
    display:none;
  }
  #car_all{
    width:100%;
    height:100%;
  }
  #car_detail{
    width:100%;
    height:100%;
    padding-bottom:4.98rem;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  .car_goods{
    width:100%;
    overflow:hidden;
    border-bottom:1px solid #e3e3e3;
  }
  .car_top{
    width:100%;
    height:3.2rem;
    padding:.5rem;
    background:#fff;
    text-align:left;
    border-bottom:1px solid #e3e3e3;
  }
  .car_top span{
    display:inline-block;
    margin-top:.55rem;
  }
  .car_address{
    font-size:.85rem;
    transform:translateY(-.14rem);
  }
  .car_icon{
      width:1.1rem;
      height:1.1rem;
      border-radius:1.1rem;
      border:1px solid #c7c7cc;
      overflow:hidden;
  }
  .pick{
    background:url("/lwx/images/pick.png");
    background-size:cover;
    border-style:hidden !important;
  }
  .car_down{
    width:100%;
    overflow:hidden;
    padding:0 .5rem;
  }
  .car_down li{
    width:100%;
    height:5.36rem;
  }
  .car_down_left,.car_down_middle{
    float:left;
  }
  .car_down_border{
    border-top:1px solid #e3e3e3;
  }
  .car_down_left{
    width:1.1rem;
    height:5.36rem;
    line-height:5.36rem;
  }
  .car_down_left span{
    display:inline-block;
    width:1.1rem;
    height:1.1rem;
    border-radius:1.1rem;
    border:1px solid #c7c7cc;
    overflow:hidden;
  }
  .car_down_middle{
    padding:.5rem;
    height:100%;
    width:6rem;
  }
  .car_down_middle img{
    width:5rem;
    height:4rem;
  }
  .car_down_right{
    float:right;
    height:100%;
    width:10.66rem;
    padding:.5rem .75rem .45rem 0rem;
  }
  .cdr_text{
    width:100%;
    height:1.24rem;
    font-size:.75rem;
    line-height:1.24rem;
  }
  .cdr_text span:nth-child(1){
    float:left;
    color:#272636;
  }
  .cdr_text span:nth-child(2){
    float:right;
    color:#e54346;
    font-size:.85rem;
  }
  .cdr_clk{
    width:100%;
    height:1.92rem;
    margin-top:.5rem;
    padding-bottom:.22rem;
  }
  .cdr_clk_left,.cdr_clk_right{
    height:100%;
  }
  .cdr_clk_left{
    float:left;
    width:7.5rem;
    height:1.7rem;
    overflow:auto;
  }
  .cdr_clk_left div{
    float:left;
    width:2.4rem;
    height:1.7rem;
    line-height:1.7rem;
  }
  .ccl_right{
    border:1px solid #c9c9c9;
    border-radius:0 .25rem .25rem 0;
  }
  .ccl_left{
    border:1px solid #c9c9c9;
    border-radius:.25rem 0 0 .25rem;
  }
  .ccl_middle{
    border-top:1px solid #c9c9c9;
    border-bottom:1px solid #c9c9c9;
  }
  .ccl_middle input{
    display:block;
    text-align:center;
    width:100%;
    height:100%;
    border:none;
    inline:none;
    outline:none;
  }
  .cdr_clk_right{
    float:right;
    width:1.2rem;
    height:1.7rem;
    padding-top:.25rem;
  }
  .cdr_clk_right span{
    display:inline-block;
    width:1.2rem;
    height:1.2rem;
    background:url("/lwx/images/delete.png");
    background-size:cover;
  }
  #shop_car_foot{
    position:fixed;
    width:100%;
    height:2.48rem;
    background:#fff;
    bottom:2.5rem;
    padding-left:1.8rem;
  }
  .scf_l{
    float:left;
    height:2.48rem;
    line-height:2.48rem;
    color:#e54346;
    font-size:.85rem;
  }
  .scf_r{
    float:right;
    width:5.52rem;
    height:2.48rem;
    line-height:2.48rem;
    background:#e54346;
    font-size:.85rem;
    color:#fff;
  }
  .modal{
    display:none;
    width:13.5rem;
    height:6.94rem;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:auto;
    background:white;
    z-index:2000;
    border-radius:.35rem .35rem .35rem .35rem;
    overflow:hidden;
    font-size:.85rem;
  }
  #shade{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    top:0;
    left:0;
    position:fixed;
    z-index:1000;
    display:none;
  }
  .modal_top{
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
