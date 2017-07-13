<template>
  <div id="buy_all">
    <div id="buy_detail">
      <div class="buy_goods">
        <div class="buy_top" @click.stop="picktop()">
          <div class="buy_all">
                     <span class="buy_icon" :class="{pick:ispick}">
                     </span>
            <span class="buy_address">{{address}}</span>
          </div>
        </div>
        <ul class="buy_down">
          <li v-for="(buyfood, index) in buyfoods" @click.stop="choosefood(index)">
            <div class="buy_alld">
              <div class="buy_down_left">
                <span :class="choosetrue[index] ? 'pick':''"></span>
              </div>
              <div class="buy_down_middle">
                <img :src="root+buyfood.foodimg" alt="">
              </div>
              <div class="buy_down_right" :class="index > 0 ? 'buy_down_border':''">
                <div class="cdr_text">
                  <span>{{buyfood.foodname}}</span>
                  <span class="price">{{'￥'+ buyfood.pricewechat + '元'}}</span>
                </div>
                <div class="cdr_clk">
                  <div class="cdr_clk_left">
                    <div class="ccl_left" @click.stop="decrease($event,index)">-</div>
                    <div class="ccl_middle">
                      <input type="text" v-model="nums[index]" class="goods_num" readonly>
                    </div>
                    <div class="ccl_right" @click.stop="add($event,index)">+</div>
                  </div>
                  <div class="cdr_clk_right">
                    <span @click.stop="dlt($event,index)"></span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="pay_methods">
          <div class="methods_top">{{paytext}}</div>
          <div class="methods_choose" @click.stop="paychoosevr()">
            <div class="choose_all">
              <span class="choose_text">全球付VR9支付</span>
              <span class="choose_money">{{newvr+"个"}}</span>
              <span class="choose_icon" :class="{pick:isChoosegcb}"></span>
            </div>
          </div>
          <div class="methods_choose" @click.stop="paychoosewht()">
            <div class="choose_all">
              <span class="choose_text">微信支付</span>
              <span class="choose_money">{{newprice+"元"}}</span>
              <span class="choose_icon" :class="{pick:isChoosewht}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="modalshow">
      <div class="modal_top">确定删除该套餐吗</div>
      <div class="modal_bottom">
        <div @click.stop="cancel()">取消</div>
        <div @click.stop="ensure($router)">确定</div>
      </div>
    </div>
    <div id="shop_buy_foot">
      <div class="scf_l">{{'合计：'+ endprice}}</div>
      <div class="scf_r" @click.stop="gomypay($router)">{{text}}</div>
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
    name:"buygoods",
    data:function(){
      return{
        ispick:false,
        text:"结算",
        newprice:"0",
        newvr:"0",
        removeindex:"",
        paytext:"付款方式",
        isChoosegcb:false,
        isChoosewht:false,
        buyfoods:"",
        address:"",
        root:"",
        endprice:"0元",
        choosetrue:[],
        nums:[],
        maxnums:[],
        pricewechat:[],
        pricevr:[],
        endprice:"0元",
        modalshow:false,
        errorshow:false,
        errortext:"",
        nobuygoods:[],
        cashgoods:[],
      }
    },
    computed:{
    },
    watch:{
    },
    methods:{
      gomypay:function(router){
        //选择支付方式进行支付，当选择vr9支付的时候，如果当前帐号没有绑定vr9账号，就跳转到vr9登录界面，否则就跳到vr9支付页面，选择微信支付直接跳转到vr9支付页面
        var _this = this;
          if(this.newvr > 0){
            if(this.isChoosegcb){
              if(this.choosetrue.length > 0){
                for(var i in this.choosetrue){
                  if(this.choosetrue[i]){
                    this.buyfoods[i].id = this.buyfoods[i].foodid;
                    this.buyfoods[i].num = this.buyfoods[i].buynum;
                    this.cashgoods.push(this.buyfoods[i]);
                  }else{
                    this.nobuygoods.push(this.buyfoods[i]);
                  }
                }
              }
              sessionStorage.setItem("cashgoods",JSON.stringify(this.cashgoods));
              sessionStorage.setItem("costtotal",this.newvr);
              sessionStorage.setItem("nobuygoods",JSON.stringify(this.nobuygoods));
              if(sessionStorage.getItem("uservr")){
                router.push("mypay");
              }else{
                router.push("vrlogin");
              }

            }
            if(this.isChoosewht){
             /* this.errorshow =true;
              this.errortext = "暂未开通微信支付通道";*/
              if(this.choosetrue.length > 0){
                for(var i in this.choosetrue){
                  if(this.choosetrue[i]){
                    this.buyfoods[i].id = this.buyfoods[i].foodid;
                    this.buyfoods[i].num = this.buyfoods[i].buynum;
                    this.cashgoods.push(this.buyfoods[i]);
                  }else{
                    this.nobuygoods.push(this.buyfoods[i]);
                  }
                }
              }
              sessionStorage.setItem("cashgoods",JSON.stringify(this.cashgoods));
              sessionStorage.setItem("costtotalwx",this.newprice);
              sessionStorage.setItem("nobuygoods",JSON.stringify(this.nobuygoods));
              router.push("wechatpay/");
            }
          }else{
            this.errorshow =true;
            this.errortext = "请先选择你需要购买的商品";
          }


      },
      errorhide:function(){
        this.errorshow =false;
        this.errortext = "";
      },
      picktop:function(){
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
      choosefood:function(index){
        //选择当前商品，呈现已选择状态
         this.choosetrue.splice(index,1,!this.choosetrue[index]);
      },
      add:function(event,index){
        //增加当前商品的数量
        if(this.nums[index] < this.maxnums[index]){
          var num = parseInt(this.nums[index])+1
          this.nums.splice(index,1, num);
        }
        this.buyfoods[index].buynum = this.nums[index];
      },
      decrease:function(event,index){
        //减少当前商品的数量
        if(this.nums[index] > 1){
          this.nums.splice(index,1,this.nums[index]-1)
        }
        this.buyfoods[index].buynum = this.nums[index];
      },
      dlt:function(event,index){
        //出现提示框,是否删除该商品
        this.modalshow = true;
        this.removeindex = index;
      },
      cancel:function(){
        //点击隐藏删除提示框
        this.modalshow = false;
        this.removeindex = "";
      },
      ensure:function(router){
        //确定删除该套餐；如果将购物车删除空了，将会跳转到餐品页面
        this.choosetrue.splice(this.removeindex,1);
        this.nums.splice(this.removeindex,1);
        this.maxnums.splice(this.removeindex,1);
        this.pricewechat.splice(this.removeindex,1);
        this.pricevr.splice(this.removeindex,1);
        this.buyfoods.splice(this.removeindex,1);
        sessionStorage.setItem("buyfood",JSON.stringify(this.buyfoods));
        this.modalshow = false;
        if(this.buyfoods == ""){
          router.push("foo");
        }
      },
      paychoosevr:function(){
         //选择vr9支付方式，呈现选中状态
         this.isChoosegcb = true;
         this.isChoosewht = false;
      },
      paychoosewht:function(){
        //选择微信支付方式，呈现选中状态
        this.isChoosegcb = false;
        this.isChoosewht = true;
      },
      allprice:function(){
        //计算选中的餐品总价
        var _this = this;
        var all = 0;
        var allvr = 0;
        if(_this.choosetrue.length > 0){
          for(var i in _this.choosetrue){
            if(_this.choosetrue[i]){
              all =  parseFloat((all + _this.nums[i] * _this.pricewechat[i]).toPrecision(12));
              allvr =  parseFloat((allvr + _this.nums[i] * _this.pricevr[i]).toPrecision(12));
            }
          }
        }
        _this.newprice = all;
        _this.newvr = allvr;
        if(_this.isChoosegcb){
          _this.endprice = _this.newvr + "个"
        }
        if(_this.isChoosewht){
          _this.endprice = _this.newprice+"元"
        }
        /*var num = 0;
        var vr=0;
        $(".cmp_price:checked").parent().find(".price").each(function (i, n) {
          num += (parseFloat($(n).text().substring(1, $(n).text().length - 1))*parseFloat($(n).parents(".buy_alld").find(".goods_num").val()));

        });
        $(".cmp_price:checked").each(function(i,n){
          vr+= parseFloat((parseFloat($(n).attr("vr"))*parseFloat($(n).parents(".buy_alld").find(".goods_num").val())).toPrecision(12));
        })
        this.newprice = num;
        this.newvr = vr;
        if($(".wechat").is(":checked")){
          this.endprice = this.newprice+"元"
        }
        if($(".gcb").is(":checked")){
          this.endprice = this.newvr + "GCB"
        }*/
      }
    },
    mounted:function(){
      //获取加入购物车的商品信息
      sessionStorage.removeItem("nobuygoods");
      this.address = localStorage.getItem("address");
      this.buyfoods = JSON.parse(sessionStorage.getItem("buyfood"));
      var goods = JSON.parse(sessionStorage.getItem("buyfood"));
      if(sessionStorage.getItem("nobuyfoods")){
          this.nobuygoods = JSON.parse(sessionStorage.getItem("nobuyfoods"));
      }
      if(goods){
          for(var i in goods){
            this.choosetrue.push(false);
            this.nums.push(goods[i].buynum);
            this.maxnums.push(goods[i].maxnum);
            this.pricewechat.push(goods[i].pricewechat);
            this.pricevr.push(goods[i].pricevr);
          }
      }
    },
    updated:function(){
      //商品数量改变，计算当前状态下所有商品的总价
       this.allprice();
    }
  }
</script>
<style scoped>
  .choose_all{
    display:block;
    width:100%;
    overflow:hidden;
  }
  .buy_all,.buy_alld{
    display:block;
    width:100%;
    height:100%;
  }
  input{
    display:none;
  }
  #buy_all{
    width:100%;
    height:100%;
  }
  #buy_detail{
    width:100%;
    height:100%;
    position:fixed;
    padding-bottom:2.48rem;
    overflow-y:auto;
    z-index:998;
    -webkit-overflow-scrolling: touch;
  }
  .buy_goods{
    width:100%;
    overflow:hidden;
    border-bottom:1px solid #e3e3e3;
  }
  .buy_top{
    width:100%;
    height:3.2rem;
    padding:.5rem;
    background:#fff;
    text-align:left;
    border-bottom:1px solid #e3e3e3;
  }
  .buy_top span{
    display:inline-block;
    margin-top:.55rem;
  }
  .buy_address{
    font-size:.85rem;
    transform:translateY(-.14rem);
  }
  .buy_icon{
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
  .buy_down{
    width:100%;
    overflow:hidden;
    padding:0 .5rem;
  }
  .buy_down li{
    width:100%;
    height:5.36rem;
  }
  .buy_down_left,.buy_down_middle{
    float:left;
  }
  .buy_down_border{
    border-top:1px solid #e3e3e3;
  }
  .buy_down_left{
    width:1.1rem;
    height:5.36rem;
    line-height:5.36rem;
  }
  .buy_down_left span{
    display:inline-block;
    width:1.1rem;
    height:1.1rem;
    border-radius:1.1rem;
    border:1px solid #c7c7cc;
    overflow:hidden;
  }
  .buy_down_middle{
    padding:.5rem;
    height:100%;
    width:6rem;
  }
  .buy_down_middle img{
    width:5rem;
    height:4rem;
  }
  .buy_down_right{
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
  #shop_buy_foot{
    position:fixed;
    width:100%;
    height:2.48rem;
    background:#fff;
    bottom:0rem;
    z-index:999;
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
  .pay_methods{
    width:100%;
    overflow:hidden;
    background:white;
    margin-top:.5rem;
  }
  .methods_top{
    width:100%;
    height:3.19rem;
    line-height:3.19rem;
    text-align:left;
    padding-left:1.15rem;
    font-size:.85rem;
    border-bottom:1px solid #e3e3e3
  }
  .methods_choose{
    width:100%;
    overflow:hidden;
    padding:.55rem .5rem 0rem 1.15rem;
    height:2.2rem;
    text-align:left;
    border-bottom:1px solid #e3e3e3;
  }
  .methods_choose span{
    height:1.1rem;
    font-size:.75rem;
    text-align:left;
    line-height:1.1rem;
  }
  .choose_text{
    float:left;
    min-width:5.35rem;
  }
  .choose_money{
    flaot:left;
    margin-left:6rem;
  }
  .choose_icon{
    float:right;
    width:1.1rem;
    border-radius:1.1rem;
    border:1px solid #c7c7cc;
    overflow:hidden;
  }
</style>
