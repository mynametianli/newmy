<template>
     <div id="cardyes">
        <div class="cards_top">
             <div class="cards_top_text">
                 <div>申请成功，您申请的全球付禾谷百味联名卡<br/>卡号是：<span class="colorr">{{cardnumber}}</span><br/>查询码：<span class="colorr">{{getnumber}}</span></div>
             </div>
             <div class="cards_top_img">
               <img :src="imgadr" alt="">
             </div>
             <div class="cards_top_b">GCB<span class="colorr">0.5</span></span></div>
             <div class="cards_top_b colorb">了解创富倍增计划，免费快餐吃一年</div>
        </div>
       <div class="cards_bottom">
              <p>1.全球付银行卡可在5000万家商户线上线下使用。</p>
              <p>2.全球付银行卡支持币种：人民币、港元、欧元、欧元。并支持以上币种自由兑换。</p>
              <p>3.全球付银行卡无需信用和财务审核、无需年费，可在全球付微店及全球付ATM机上申请。</p>
       </div>
       <div class="cards_nav colorb">
         <div @click="gofoo($router)">直接点餐</div>
         <div @click="gopaycards($router)">获得实体卡</div>
       </div>
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
    name:"cardsuccess",
    data:function(){
      return{
          cardnumber:"",
          imgadr:"/lwx/images/kp.png",
          errorshow:false,
          errortext:"请凭查询码自助制卡并取卡",
          getnumber:""
      }
    },
    methods:{
      errorhide:function(){
        //错误提示框隐藏
         this.errorshow = false;
      },
      gofoo:function(router){
        //跳转点餐页面
         router.push("/foo");
      },
      gopaycards:function(router){
        //弹出提示框
        this.errorshow = true;
      }
    },
    mounted:function(){
      //初始化卡申请成功界面
      var _this = this;
      $.ajax({
        type:"get",
        url:"http://47.89.43.156:8080/kfc/card_apply",
        data:{
          code:sessionStorage.getItem("mycardget").substring(11)
        },
        success:function(res){
          if(res.resultCode == "100"){
            var str = res.data.account;
            str = str.split("");
            str[4] = " "+str[4];
            str[8] = " "+str[8];
            str[12] = " "+str[12];
            str = str.join("");
            _this.cardnumber = str;
            _this.getnumber = sessionStorage.getItem("mycardget").substring(11);
          }
        }
      })
    }
  }
</script>
<style scoped>
   #cardyes{
     width:100%;
     height:100%;
     position:fixed;
     z-index:2000;
     background:#eee;
     overflow-y:auto;
     -webkit-overflow-scrolling: touch;
   }
   .cards_top{
     width:100%;
     height:18.8rem;
     padding:.5rem;
     background:#fff;
   }
  .cards_top_text{
    width:100%;
    height:3.24rem;
    padding:.5rem;
    font-size:.75rem;
    line-height:1.4;
  }
   .cards_top_img{
     width:100%;
     height:11.28rem;
     padding:.5rem;
   }
   .cards_top_img img{
     width:100%;
     height:100%;
   }
  .colorr{
    color:#e54346;
  }
  .colorb{
    color:#0894ec;
  }
  .cards_top_b{
    width:100%;
    height:1.12rem;
    line-height:1.12rem;
    font-size:.75rem;
    margin-top:.3rem;
  }
  .cards_bottom{
    width:100%;
    height:9.6rem;
    padding:.5rem;
    background:#fff;
    margin-top:.5rem;
  }
  .cards_bottom p{
    line-height:1.2rem;
    text-indent: 2em;
    text-align:left;
    font-size:.65rem;
    margin-top:.65rem;
  }
  .cards_nav{
    width:100%;
    height:2.5rem;
    line-height:2.5rem;
    font-size:.85rem;
    background:#fff;
    position:fixed;
    bottom:0;
    z-index:2001;
  }
  .cards_nav div{
    width:50%;
    height:100%;
    overflow:hidden;
    float:left;
  }
   .errormodal{
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
   #errorshade{
     width:100%;
     height:100%;
     background:rgba(0,0,0,.4);
     top:0;
     left:0;
     position:fixed;
     z-index:1011;
   }
   .errormodal_top{
     width:100%;
     height:4.74rem;
     overflow:hidden;
     white-space:nowrap;
     text-overflow:ellipsis;
     color:#3d4145;
     line-height:4.74rem;
   }
   .errormodal_bottom{
     width:100%;
     background:#cccccc;
     color:#272636;
     height:2.24rem;
     text-align:center;
     line-height:2.24rem;
   }
</style>
