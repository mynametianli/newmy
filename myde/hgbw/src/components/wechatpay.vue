<template>
   <div id="wxpay">
     <div class="pay_top">
       <div class="pay_name">{{payname}}</div>
       <div class="pay_number">{{money+"元"}}</div>
     </div>
     <div class="get_msg">
       <div class="msg_l">收款方</div>
       <div class="msg_r">{{company}}</div>
     </div>
     <div class="pay_money_bottom">
       <button class="pay_money_ensure" @click.stop="wxpay($router)">立即支付</button>
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
    name:"wechatpay",
    data:function(){
      return{
        payname:"禾谷百味套餐购买",
        money:"",
        company:"禾谷百味",
        errorshow:false,
        errortext:""
      }
    },
    methods:{
      errorhide:function(){
        //错误提示框消失
        this.errorshow = false;
      },
      wxpay:function(router) {
        //调起微信支付，支付成功后跳转到取餐页面，错误会弹出错误提示框
        var _this = this;
        var data = {
          cost_total: _this.money,
          cost_real: _this.money,
          pay_type: "20",
          mechine_number: localStorage.getItem("mymachine"),
          mechine_name: localStorage.getItem("machinename"),
          mechine_locate: localStorage.getItem("address"),
          foods: sessionStorage.getItem("cashgoods"),
          wechat:"1"
        };
        $.ajax({
          type: "post",
          url: '/user/buyfood',
          data: data,
          success: function (res1) {
            var msg = JSON.parse(res1);
            if(msg.status == "success"){
            //分割线
            var myorder = msg["order_no"];
            var price = msg["price"];
            var url = "http://vshop.360yunkf.com";
            var myurl = window.location.href;
            var yurl ='/user/wxpayjsapi/?url=' + myurl;
            $.ajax({
              type:"get",
              url:yurl,
              success:function(response){
                response = JSON.parse(response);
                wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: response.appId, // 必填，公众号的唯一标识
                  timestamp: response.timestamp, // 必填，生成签名的时间戳
                  nonceStr: response.noncestr, // 必填，生成签名的随机串
                  signature: response.key,// 必填，签名，见附录1
                  jsApiList: ["chooseWXPay", 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                var datapay = '/user/unifiedOrder/?orderNo='
                  + myorder + "&body=套餐购买&detail=禾谷百味支付&attach=禾谷百味票券&payprice=" + price;
                $.ajax({
                  type: "get",
                  url: datapay,
                  success: function (resp) {
                    resp = JSON.parse(resp);
                    wx.checkJsApi({
                      jsApiList: ['chooseWXPay'],
                      success: function (respay) {
                        if (respay.checkResult.chooseWXPay) {
                          wx.chooseWXPay({
                            appId: resp.appId,
                            timestamp: resp.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: resp.nonceStr, // 支付签名随机串，不长于 32 位
                            package: resp.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: resp.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: resp.sgin, // 支付签名
                            success: function (res) {
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
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
            }else{
              _this.errorshow = true;
              _this.errortext = msg.message;
            }
            //分割线
          },
          error:function(){
            _this.errorshow = true;
            _this.errortext = "订单生成失败";
          }
        });
      }
    },
    mounted:function(){
      //初始化微信支付页面
      this.money = sessionStorage.getItem("costtotalwx");
    }

  }
</script>
<style scoped>
  #wxpay{
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
