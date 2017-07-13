<template>
  <div id="car_content">
    <div class = "title">{{title}}</div>
    <div class="car_msg">
          <div class="car_demo">
              <span class="car_text">{{carmsgs[0].name}}</span>
              <span class="car_enter">
                <input type="text" :placeholder="carmsgs[0].pld" v-model="msgs[0]">
              </span>
          </div>
          <div class="car_demo">
            <span class="car_text">{{carmsgs[1].name}}</span>
                  <span class="car_enter">
                    <input type="password" :placeholder="carmsgs[1].pld" v-model="msgs[1]">
                  </span>
          </div>
          <div class="car_demo">
            <span class="car_text">{{carmsgs[2].name}}</span>
                  <span class="car_enter">
                    <input type="password" :placeholder="carmsgs[2].pld" v-model="msgs[2]">
                  </span>
          </div>
          <div class="car_demo">
            <span class="car_text">{{carmsgs[3].name}}</span>
                  <span class="car_enter">
                    <input type="text" :placeholder="carmsgs[3].pld" v-model="msgs[3]">
                  </span>
          </div>
          <div class="car_demo">
                  <span class="car_enter">
                    <span class="inaddition">{{carmsgs[4].pld}}</span>
                  </span>
          </div>
          <div class="car_demo">
            <span class="car_text">{{carmsgs[5].name}}</span>
                      <span class="car_enter">
                        <input type="text" :placeholder="carmsgs[5].pld" v-model="msgs[5]">
                        <button class="code" @click="getcode">{{codetext}}</button>
                      </span>
          </div>
          <div class="car_demo">
            <span class="car_text">{{carmsgs[6].name}}</span>
                  <span class="car_enter">
                    <input type="text" :placeholder="carmsgs[6].pld" v-model="msgs[6]">
                  </span>
          </div>
          <div class="car_demod">
            <div class="car_read" @click="carpng()">
             <span class="car_png" :class="{pick:isY}"></span>
             <span class="car_down">{{readtext}}</span>
            </div>
          </div>
          <button class="car_over" @click="refermsg($router)">{{btntext}}</button>
    </div>
    <div class="modal" v-show="isshadow">
      <div class="modal_top">{{errortext}}</div>
      <div class="modal_bottom" @click="shadowh">
        确定
      </div>
    </div>
    <div id="shade" v-show="isshadow"></div>
  </div>
</template>
<script>
  export default{
    name:"owncar",
    data:function(){
      return {
        istrue:true,
        carmsgs:[
          {"name":"姓名","pld":"姓名  (拼音/英文)"},
          {"name":"密码","pld":"请输入六位以上密码"},
          {"name":"确认密码","pld":"请再次输入密码"},
          {"name":"邮箱","pld":"请输入邮箱"},
          {"name":"提醒","pld":"持卡人姓名使用您的中文拼音或者英文，如：ZHANG SAN。密码请采用六位纯数字组合。"},
          {"name":"手机号","pld":"一号一卡"},
          {"name":"验证码","pld":"请输入验证码"},
        ],
        inputsty:["text","password","password","text","text","text","text"],
        msgs:["","","","","nomsg","",""],
        isY:false,
        codetext:"获取验证码",
        btntext:"提交",
        title:"全球付禾谷百味联名卡申请",
        readtext:"请您阅读并同意《服务条款》",
        isshadow:false,
        errortext:""
      }
    },
    methods:{
      shadowh:function(){
        //错误提示框隐藏
        this.isshadow = false;
      },
      carpng:function(){
        //是否同意服务条款
        this.isY = !this.isY
      },
      refermsg:function(router){
        //提交申请
        var _this = this;
        var name = this.msgs[0];
        var pwd = this.msgs[1];
        var pwdt = this.msgs[2];
        var email = this.msgs[3];
        var phone = this.msgs[5];
        var code = this.msgs[6];
        if(pwd !== pwdt){
          this.errortext = "两次输入密码不一致";
          this.isshadow = true;
          return;
        }
        if(pwd.length < 6){
          this.errortext = "密码不符合规范";
          this.isshadow = true;
          return;
        }
        if(!/^[a-zA-Z]{4,}$/.test(name)){
          this.errortext = "用户名不符合规范";
          this.isshadow = true;
          return;
        }
        if(!/\@/.test(email)){
          this.errortext = "请输入正确的邮箱地址";
          this.isshadow = true;
          return;
        }
        if(!name || !pwd || !pwdt || !email|| !phone || !code){
          this.errortext = "请将信息填写完整";
          this.isshadow = true;
          return;
        }
        var data = {
          name:name,
          pwd:pwd,
          email:email,
          phone:phone,
          code:code
        }
        if(this.isY){
          $.ajax({
            type:'post',
            url:"http://47.89.43.156:8080/kfc/card_apply",
            data:data,
            success:function(res){
                 if(res.status == "success"){
                    var str = _this.msgs[5] + res.code;
                    sessionStorage.setItem("mycardget",str);
                    router.push("paycards");
                 }else{
                   _this.errortext = "联名卡申请失败";
                   _this.isshadow = true;
                 }
            }
          })
        }else{
          _this.errortext = "请确认同意服务条款";
          _this.isshadow = true;
        }
      },
      getcode:function(){
          //获取验证码
          var _this = this;
          var num = 60;
          if(!/^1[3|4|5|7|8]\d{9}$/.test(_this.msgs[5])){
            return;
          }else{
            $.ajax({
              type:"get",
              url:"http://47.89.43.156:8080/kfc/card_apply_phonecheck",
              data:{
                phone:_this.msgs[5]
              },
              success:function(res){
                  if(res.status == "fail"){
                    _this.errortext = "手机号已被使用";
                    _this.isshadow = true;
                  }else{
                    $.ajax({
                      type:"get",
                      url:"http://47.89.43.156:8080/kfc/phone",
                      data:{
                        phone:_this.msgs[5]
                      },
                      success:function(res){
                        if(res.code == "100"){
                          if(_this.istrue){
                            _this.istrue = false;
                            var timmer = setInterval(function(){
                              _this.codetext =  num +"秒后重新发送";
                              num--;
                              if(num < 10){
                                num = "0" + num;
                              }
                              if(num == 0){
                                clearInterval(timmer);
                                _this.istrue = true;
                                _this.codetext = "获取验证码"
                              }
                            },1000)
                          }
                          _this.errortext = "验证码发送成功";
                          _this.isshadow = true;
                        }else{
                          _this.errortext = "验证码发送失败";
                          _this.isshadow = true;
                        }
                      }
                    })
                  }
              },
              error:function(){
                _this.errortext = "手机号验证失败";
                _this.isshadow = true;
              }
            })



          }

      }
    }
  }

</script>
<style scoped>
  #car_content{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:white;
    z-index:1000000;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  }
  .title{
    width:100%;
    height:2.48rem;
    line-height:2.48rem;
    color:#3d4145;
    font-size: .85rem;
    text-align: center;
    border-bottom:1px solid #e7e7e7;
  }
  .car_msg{
    width:100%;
    overflow:hidden;
    padding:1rem .5rem;
    font-size:.85rem;
    text-align: left;
    padding:1rem;
  }
  .car_msg .car_demo{
    width:100%;
    height:2.94rem;
    padding:.7rem .75rem .6rem 0rem;
    line-height:1.64rem;
    border-bottom:1px solid #e7e7e7;
  }
  .car_text,.car_enter{
    float:left;
    position:relative;
  }
  .car_text{
    width:4.01rem;
    height:100%;
    color:#272636;

  }
  .car_enter{
    height:100%;
    padding-left:.25rem;
  }
  .car_enter input{
    border:none;
    outline:none;
    font-size: .8rem;
  }
  .car_enter .inaddition{
    width:100%;
    height:100%;
    font-size:0.65rem;
    display:block;
    line-height:1.3;
  }
  .car_read{
    width:100%;
    height:100%;
    display:block;
  }
  .car_demod{
    width:100%;
    height:3.5rem;
    padding:.7rem .75rem .6rem 0rem;
    border-bottom:1px solid #e7e7e7;
  }
  .car_demod .car_read .car_down{
    margin-top:.56rem;
    float:left;
     font-size:0.65rem;
    line-height:1.2rem;
    margin-left:.3rem;

  }
  .pick{
    background:url("/lwx/images/pick.png");
    background-size:cover;
    border-style:hidden !important;
  }
  .car_png{
    margin-top:.56rem;
    float:left;
    width:1.1rem;
    height:1.1rem;
    border-radius:1.1rem;
    border:1px solid #c7c7cc;
    overflow:hidden;
  }
  .car_over{
    width:100%;
    height:2.4rem;
    background:#eb4f38;
    outline:none;
    border:none;
    color:white;
    border-radius:.25rem;
    line-height:2.4rem;
    margin-top:.6rem;
    font-size:.85rem;
  }
  .code{
    min-width:4.5rem;
    height:1.35rem;
    line-height:1.35rem;
    position:absolute;
    right:-2.2rem;
    top:0;
    border:none;
    background:#999999;
    outline:none;
    color:#ffffff;
    border-radius:.25rem;
  }
  #shade{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    top:0;
    left:0;
    position:fixed;
    z-index:1000;
  }
  .modal{
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
</style>
