<template>
  <div id="paymoney">
    <div class="pay_top">
      <div class="pay_name">{{payname}}</div>
      <div class="pay_number">{{money+"个"}}</div>
    </div>
    <div class="get_msg">
      <div class="msg_l">收款方</div>
      <div class="msg_r">{{company}}</div>
    </div>
    <div class="pay_money_bottom">
      <button class="pay_money_ensure" @click.stop="showpaymodal">立即支付</button>
    </div>
    <div class="pay_push" v-show="modalshow">
      <div class="push_detail">
        <div class="pd_top">
          <div class="pd_title">请输入支付密码</div>
          <div class="pd_money">{{money + "个"}}</div>
          <div class="pd_card">{{cardname+'(' + cardnumber +')'}}</div>
          <div class="pd_cash">
            <div class="pass_word" v-for="(password,index) in passwords">
              <input type="password" readonly v-model="passclk[index]">
            </div>
          </div>
        </div>
        <div class="pd_bottom">
           <div @touchstart.stop="nopay">取消</div>
           <div @touchstart.stop="yespay($router)">确定</div>
        </div>
      </div>
    </div>
    <div class="mykeybord" v-show="modalshow">
        <div class="mykeybordone" v-for="(mykeybord,index) in mykeybords" :class="{grapdiv:yesgrap[index],iconfont:yesdlt[index],ggsas:yesdlt[index]}" @click.stop="pushword($event,index)">{{mykeybord}}</div>
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
    name:"mypay",
    data:function(){
      return{
        company:"禾谷百味",
        money:"33",
        payname:"禾谷百味套餐购买",
        cardnumber:"",
        cardname:"禾谷百味联名卡",
        passwords:[1,1,1,1,1,1],
        passclk:["","","","","",""],
        mykeybords:["1","2","3","4","5","6","7","8","9","","0",""],
        yesgrap:[false,false,false,false,false,false,false,false,false,true,false,true],
        yesdlt:[false,false,false,false,false,false,false,false,false,false,false,true],
        passclkindex:0,
        okpush:true,
        modalshow:false,
        errortext:"",
        errorshow:false
      }
    },
    methods:{
      errorhide:function(){
        //错误提示框消失
           this.errorshow = false;
        },
        showpaymodal:function(){
          //密码输入框显示
          this.modalshow = true;
          this.passclkindex=0;
          this.passclk = ["","","","","",""];
          this.okpush = true;
        },
        nopay:function(){
              //密码输入框隐藏
             this.modalshow = false;
        },
        yespay:function(router){
          //确认支付，支付成功后跳转到取餐页面
          var _this = this;
          if(!this.passclk[5]){
            _this.modalshow = false;
            _this.errorshow = true;
            _this.errortext = "请输入完整密码";
            return;
          }
          var data= {
            cost_total:_this.money,
            cost_real:_this.money,
            pay_type:"10",
            mechine_number:localStorage.getItem("mymachine"),
            mechine_name:localStorage.getItem("machinename"),
            mechine_locate:localStorage.getItem("address"),
            pay_pwd:_this.passclk.join(""),
            foods:sessionStorage.getItem("cashgoods"),
          }
          $.ajax({
            type:"post",
            url:'/user/buyfood',
            data:data,
            success:function(res){
              if(JSON.parse(res).status == "200"){
                sessionStorage.removeItem("buyfood");
                var nums = 0;
                var goods = sessionStorage.getItem("nobuygoods");
                if(goods) {
                  sessionStorage.setItem("cargoods", goods);
                  var goods1 = JSON.parse(goods);
                  sessionStorage.removeItem("nobuygoods");
                  for (var i in goods1) {
                     nums = parseInt(nums) + parseInt(goods1[i].buynum);
                  }

                }else{
                    sessionStorage.removeItem("cargoods");
                  }
                sessionStorage.setItem("buynums",nums);
                router.push("getfood");
              }else{
                _this.modalshow = false;
                _this.errorshow = true;
                _this.errortext = JSON.parse(res).message;
              }
            },
            error:function(){
              _this.modalshow = false;
              _this.errorshow = true;
              _this.errortext = "请求失败";
            }
          })
        },
        pushword:function(e,index){
          //密码输入逻辑和删除逻辑
             if(this.passclkindex >= 0 && this.passclkindex <= 6){
               if(index != 9 && index != 11 && this.okpush){
                  this.passclk.splice(this.passclkindex,1,this.mykeybords[index]);
                  this.passclkindex += 1;
                  if(this.passclkindex > 5){
                    this.okpush = false;
                  }
               }
              if(index == 11){
                     this.passclkindex -= 1;
                     this.okpush = true;
                     this.passclk.splice(this.passclkindex,1,"");
                if(this.passclkindex < 0){
                  this.passclkindex = 0;
                }
              }
             }
        }
    },
    mounted:function(){
      //初始化支付页面
      $(".ggsas").addClass("icon-jt");
      this.money = sessionStorage.getItem("costtotal");
      this.cardnumber = sessionStorage.getItem("uservr");
    }
  }
</script>
<style scoped>
  *{
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  #paymoney{
    width:100%;
    height:100%;
    background:#f5f5f5;
    position:fixed;
    z-index:2000;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  .pay_top{
    width:100%;
    height:5rem;
    padding:.5rem;
  }
  .pay_name,.pay_number{
    width:100%;
    height:2rem;
    line-height:2rem;
    color:#3d4145;
  }
  .pay_name{
    font-size:.85rem;
  }
  .pay_number{
    font-size:1.2rem;
  }
  .get_msg{
    width:100%;
    height:2.5rem;
    line-height:2.5rem;
    padding-left:.75rem;
    background:#fff;
  }
  .msg_l{
    height:100%;
    color:#cccccc;
    float:left;
    font-size:.65rem;
  }
  .msg_r{
    float:right;
    font-size:.75rem;
    padding-right:.5rem;
  }
  .pay_money_bottom{
    width:100%;
    height:3.4rem;
    padding:.5rem;
    margin-top:2.5rem;
  }
  .pay_money_ensure{
    border:none;
    overflow:hidden;
    width:100%;
    height:2.4rem;
    line-height:2.4rem;
    background:#4cd964;
    color:white;
    font-size:.85rem;
    border-radius:.25rem;
    outline:none;
  }
  .pay_push{
    width:100%;
    height:100%;
    position:fixed;
    z-index:1000;
    background:rgba(0,0,0,.4);
    top:0;
    left:0;
    padding-top:3rem;
  }
  .push_detail{
    width:13.5rem;
    height:15rem;
    background:white;
    margin-left:50%;
    transform:translateX(-50%);
    border-radius:.35rem;
    overflow:hidden;
  }
  .pd_top{
    padding:.8rem 0rem;
    width:100%;
    height:12.7rem;
  }
  .pd_bottom{
    width:100%;
    height:2.4rem;
    line-height:2.4rem;
    background:#cccccc;
    color:#272636;
    position:relative;
  }
  .pd_bottom:before{
    display:block;
    width:1px;
    content:"";
    height:1.3rem;
    position:absolute;
    top:.5rem;
    left:50%;
    background:#aaa;
  }
  .pd_title{
    width:100%;
    height:2.04rem;
    line-height:2.04rem;
    color:#3d4145;
    font-size:.85rem;
    border-bottom:1px solid #b7e7b7;
  }
  .pd_money{
    height:4rem;
    line-height:4rem;
    font-size:1.2rem;
    color:#3d4145;
  }
  .pd_card{
    width:100%;
    height:2.05rem;
    line-height:2.05rem;
    font-size:0.55rem;
    border-top:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
    color:#666666;
  }
  .pd_cash{
    height:3rem;
    width:100%;
    padding:.5rem;
  }
  .pass_word{
    width:2.08rem;
    height:2rem;
    border:1px solid #bebebe;
    line-height:2rem;
    float:left;
  }
  .pass_word input{
    width:100%;
    height:100%;
    outline:none;
    border:none;
    text-align:center;
    font-size:1rem;
  }
  .mykeybord{
    width:100%;
    height:12rem;
    position:fixed;
    z-index:1001;
    bottom:0;
    left:0;
  }
  .mykeybordone{
    width:33.33%;
    height:3rem;
    line-height:3rem;
    font-size:1.2rem;
    color:#3d4145;
    float:left;
    border:1px solid #ccc;
    background:white;
  }
  .grapdiv{
    background:#dedede !important;
  }
  .pd_bottom div{
     width:50%;
     height:100%;
     float:left;
    font-size:.85rem;
  }
  .mydelate{

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
