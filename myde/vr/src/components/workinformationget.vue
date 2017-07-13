<template>
  <div id="informationget">
    <div class="header">工作室信息修改</div>
    <div class="dtbox">
      <div class="detail-demo">
        <div class="l dt-text">申请人姓名：</div>
        <div class="l">{{name}}</div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">地址：</div>
        <div class="l">{{detailaddress}}</div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">工作室名称：</div>
        <div class="l">{{work_name}}</div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">管理员交易宝账号：</div>
        <div class="l">
           {{wallet_mobile}}
        </div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">联系手机号：</div>
        <div class="l myedit">
          <input class="edit l" :class="{bgccc:isread}" type="text" v-model="mobile" readonly>
        </div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">联系微信：</div>
        <div class="l myedit">
          <input class="l edit" :class="{bgccc:isread}"  type="text" v-model="wechat" readonly>
        </div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">联系QQ：</div>
        <div class="l myedit">
          <input class="l edit" :class="{bgccc:isread}"  type="text" v-model="qq" readonly>
        </div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">联系邮箱：</div>
        <div class="l myedit">
          <input class="l edit" :class="{bgccc:isread}"  type="text" v-model="email" readonly>
        </div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text redw">注：</div>
        <div class="l redw">
          如需更换工作室管理员登录账号请联系总部
        </div>
      </div>
      <div class="line"></div>
      <div>
        <mu-raised-button label="编辑"  @click="editthis" :backgroundColor="bgcolor" class="imtenter l"/>
        <mu-raised-button label="确认修改"  @click="enterthis" backgroundColor="green" class="imtenter1 l"/>
      </div>
      <!--<div class="detail-demo">
        <div class="l dt-text">身份证号码：</div>
        <div class="l">{{id_card}}</div>
      </div>
      <div class="detail-demo">
        <div class="l dt-text">备注：</div>
        <div class="l">无备注</div>
      </div>-->
    </div>
   <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>
<script>
  export default{
    name:'workinformationget',
    data(){
      return{
        bgcolor:'#337ab7',
        name:'',
        detailaddress:'',
        work_name:'',
        wallet_mobile:'',
        mobile:'',
        wechat:'',
        qq:'',
        email:'',
        user_id:'',
        show:false,
        msg:'',
        isread:true
      }
    },
    methods:{
      editthis:function(){
        let arr = document.getElementsByClassName('edit');
        for(var i = 0; i < 4; i++){
          arr[i].readOnly = false;
        }
        this.isread = false;
        arr[0].focus();
      },
      close:function(){
        this.show = false;
        this.msg = '';
      },
      enterthis:function(){
        if(this.isread){
          this.msg = '请先点击编辑进行修改';
          this.show = true;
          return;
        }
        if(!/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.mobile)){
          this.show = true;
          this.msg = '请输入正确的手机号';
          return;
        }
        let data = {
          mobile:this.mobile
        };
        if(this.wechat){
          data.wechat = this.wechat;
        }
        if(this.qq){
          data.qq = this.qq;
        }
        if(this.email){
          data.email = this.email;
        }
        this.$http({
          method:'put',
          url:'http://120.76.137.157:8887/work/change_work/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          this.msg = res.body.msg;
          this.show = true;
          if(res.body.status == '201'){
            this.isread = true;
            let arr = document.getElementsByClassName('edit');
            for(var i = 0; i < 4; i++){
              arr[i].readOnly = true;
            }
            this.getdetail();
          }
        },function(res){
          this.msg = '网络链接失败';
          this.show = true;
        })
      },
      getdetail:function(){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/user_info/',
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.name = res.body.user_info.name;
            this.detailaddress = res.body.user_info.detail_address;
            this.work_name = res.body.user_info.work_name;
            this.wallet_mobile = res.body.user_info.wallet_mobile;
            this.mobile = res.body.user_info.mobile;
            this.wechat = res.body.user_info.wechat;
            this.qq = res.body.user_info.qq;
            this.email = res.body.user_info.email;
            this.user_id = res.body.user_info.id;
          }
        },function(res){

        })
      }
    },
    beforeCreate:function(){
      let that = this;
     this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/work/user_info/',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then(function(res){
        if(res.body.status == '200'){
          this.name = res.body.user_info.name;
          this.detailaddress = res.body.user_info.detail_address;
          this.work_name = res.body.user_info.work_name;
          this.wallet_mobile = res.body.user_info.wallet_mobile;
          this.mobile = res.body.user_info.mobile;
          this.wechat = res.body.user_info.wechat;
          this.qq = res.body.user_info.qq;
          this.email = res.body.user_info.email;
          this.user_id = res.body.user_info.id;
        }
      },function(res){

      })

    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  .redw{
    color:red;
  }
  .bgccc{
    background:#ccc;
  }
  .myedit{
    border:1px solid #ccc;
  }
  .edit{
    width:100%;
    height:100%;
    border:none;
  }
  .imtenter{
    margin-top:40px;
    margin-left:222px;
  }
  .imtenter1{
    margin-top:40px;
    margin-left:50px;
  }
  #informationget{
    width:100%;
    height:100%;
    overflow-y:auto;
    padding-bottom:22px;
    position:relative;
    z-index:1;
  }
  .detail-demo input{
    width:250px;
    height:100%;
    outline:none;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
    position:fixed;
  }
  .line{
    height:1px;
    width:100%;
    background:#999999;
    box-shadow:0 0 1px rgba(0, 0, 0, .5);
    clear: both;
    margin-bottom:1rem;
    margin-top:40px;
  }
  .detail-demo {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    margin:6px;
  }
  .detail-demo div{
    height:100%;
    line-height:36px;
  }
  .dtbox{
    width:100%;
    padding-top:3.2rem;
    overflow:hidden;
    padding-left:2rem;
    padding-bottom:2rem;
  }
  .dt-text{
    width:200px;
    text-align:right;
    margin-right:18px;
    height:100%;
  }
  .detail-imgdemo{
    width:100%;
    height:200px;
  }
  .imgbox{
    width:300px;
    background:red;
    height:100%;
  }
  .textl{
    text-align:left;
    margin-top:22px;
  }
</style>
