<template>
  <div id="workmemberadd1">
    <div class="header">工作室会员添加</div>
    <div class="addbox">
      <div class="addtitle1">
        <div class="l text">
          <mu-text-field label="请输入会员交易宝账号" labelFloat class="mylabel" v-model="account"/>
        </div>
        <div class="l addbt">
          <mu-raised-button label="搜索"  @click="getaccount" :backgroundColor="bgcolor"/>
        </div>
       <div class="l addbt">
          <mu-raised-button label="导入文件"   :backgroundColor="bgcolor">
            <input type="file" class="myfile" @change="haha($event)" id="thismyfile">
         </mu-raised-button>
        </div>
      </div>
      <div class="l addbt1">
        注：请上传以txt为后缀名的文件。（文件格式为一行填入一个交易宝账号，以回车符分隔）
      </div>
      <div class="memberlist">
        <div class="smallbox" v-if="msgshow">
          <div class="demomsg">
            <span class="leftmsg">姓名：</span><span>{{accountmsg.realname}}</span>
          </div>
          <div class="demomsg">
            <span class="leftmsg">是否实名：</span>{{accountmsg.real_status == '1' ? '已实名' : '未实名'}}<span></span>
          </div>
          <div class="demomsg">
            <span class="leftmsg">状态：</span><span>{{accountmsg.is_active ? '正常' : '已冻结'}}</span>
          </div>
          <div class="demomsg">
            <span class="leftmsg">提示：</span><span>{{statusmsg ? '该交易宝账号可加入工作室会员' : '该交易宝账号无法加入工作室会员'}}</span>
          </div>
          <div class="demomsg" v-if="btshow">
            <mu-raised-button label="邀请加入"  @click="addccount" :backgroundColor="bgcolor" class="myleft l"/>
            <mu-raised-button label="取消"  @click="removethis" :backgroundColor="bgcolor" class="myleft2 l"/>
          </div>
        </div>
        <div class='fileall' v-if="showmyfile">
          <mu-table :showCheckbox="isshow" class="mynameff">
            <mu-thead>
              <mu-tr>
                  <th v-for="title in filetitle" :key="index">{{title}}</th>
              </mu-tr>
            </mu-thead>
            <mu-tbody>
              <mu-tr v-for="(fl,index) in filemsg" :key="index">
                <mu-td v-if="fl.msg.real_status == 1 && fl.msg.is_active && !fl.is_member">
                  <mu-checkbox name="choose" :nativeValue="index" v-model="chooselist"/><!--nativeValue="checkbox1" v-model="list"-->
                </mu-td>
                <mu-td v-if="fl.msg.real_status != 1 || !fl.msg.is_active || fl.is_member">
                  <mu-checkbox disabled/>
                </mu-td>
                <mu-td>{{fl.wallet_mobile}}</mu-td>
                <mu-td>{{fl.msg.realname}}</mu-td>
                <mu-td v-if="fl.msg.real_status == 1 && fl.msg.is_active && !fl.is_member">正常</mu-td>
                <mu-td v-if="fl.msg.real_status == 1 && fl.msg.real_status == !fl.msg.is_active">封停</mu-td>
                <mu-td v-if="fl.msg.real_status != 1">未实名</mu-td>
                <mu-td v-if="fl.msg.real_status == 1 && fl.is_member">其他工作室会员</mu-td>
                <mu-td v-if="fl.msg.real_status == 1 && fl.msg.is_active && !fl.is_member">
                  <mu-flat-button label="邀请加入" color="#337ab7" @click="setgo(fl.wallet_mobile,index)" class="aaa"/>
                </mu-td>
                <mu-td v-if="fl.msg.real_status != 1 || !fl.msg.is_active || fl.is_member">
                  邀请加入
                </mu-td>
              </mu-tr>
            </mu-tbody>
          </mu-table>
        </div>
        <div class="thiscr" v-show='thiscircle'>
          <mu-circular-progress :size="60" :strokeWidth="5" color="#337ab7"/>
          <div>文件加载中，请稍候</div>
        </div>
      </div>
      <div v-if="showmyfile" class="showmm">
        <span class="l">当前选中{{chooselist.length}}人</span>
        <mu-raised-button label="批量邀请加入" backgroundColor="#337ab7" class="imtenter1 r" @click="chooseyes"/>

      </div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    name:'workmemberadd',
    data(){
      return{
        account:'',
        bgcolor:'#337ab7',
        show:false,
        msg:'',
        primary:'primary',
        accountmsg:'',
        statusmsg:false,
        btshow:false,
        msgshow:false,
        filetitle:['选中框','账号','姓名','状态','操作'],
        filemsg:[],
        chooselist:[],
        isshow:false,
        showmyfile:false,
        thiscircle:false,
      }
    },
    methods:{
      clearfile:function(){
        var my = document.getElementById('thismyfile');
        my.value = '';
        /*my.outerHTML = my.outerHTML;
        if (my.outerHTML) {
          console.log('haha');
        } else { // FF(包括3.5)
          my.value = "";
        }*/
      },
      removethis:function(){
        this.showmyfile = false;
        this.filemsg = [];
        this.chooselist = [];
      },
      chooseyes:function(){
        if(this.chooselist.length < 1){
          this.msg = '请选择要邀请加入的会员';
          this.show = true;
          return;
        }
        let arr = [];
        for(let i in this.chooselist){
          arr.push(this.filemsg[this.chooselist[i]].wallet_mobile)
        }
        console.log(arr);
        this.$http({
          method:'post',
          url:'http://120.76.137.157:8887/work/add_member/',
          body:{
            wallet_mobile:arr
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          this.msg = res.body.msg;
          if(res.body.status == '201'){
            this.showmyfile = false;
            this.filemsg = [];
            if(!this.msg){
              this.msg = '批量邀请成功';
            }
          }
          this.show = true;
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })
      },
      goenter:function(m,ix){
        this.$http({
          method:'post',
          url:'http://120.76.137.157:8887/work/add_member/',
          body:{
            wallet_mobile:m
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '201'){
            this.filemsg.splice(ix,1);
            if(this.chooselist.length > 1){
              for(let i in this.chooselist){
               if(this.chooselist[i] == ix){
                 this.chooselist.splice(i,1)
               }
              }
            }
            this.chooselist = [];
            this.msg = res.body.msg;
            this.show = true;
            /*if(this.chooselist.length > 1){
              for(var  i = 0; i < this.chooselist.length ; i++){
                if(this.chooselit[i] == ix){
                  console.log(i);
                  console.log(this.chooselist);
                  //this.chooselist.splice(i,1)
                }
              }
            }*/
          }
          this.msg = res.body.msg;
          this.show = true;
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })
      },
      setgo:function(act,index){
        this.goenter(act,index)
      },
      haha:function(e){
        this.msgshow = false;
        var data = new FormData();
        var m = e.currentTarget.files[0];
        var x = m.name.split('.');
        if(x[x.length-1] != 'txt'){
          this.msg = '文件格式不对';
          this.show = true;
          return;
        }
        this.filemsg = [];
        this.chooselist = [];
        this.showmyfile = false;
        data.append('txt_file',m);
        this.thiscircle = true;
        var _this = this;
          _this.$http({
            method:'POST',
            url:'http://120.76.137.157:8887/work/add_member_file/',
            body:data,
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          }).then(function(res){
            _this.clearfile();
            if(res.body.status == '200'){
              _this.account = '';
              _this.filemsg = res.body.wallet_info;
              _this.showmyfile = true;
            }else{
              _this.msg = res.body.msg;
              _this.show = true;
            }
            _this.thiscircle = false;
          },function(res){
            _this.clearfile();
            _this.msg = '网络链接失败请稍后再试';
            _this.show = true;
            _this.thiscircle = false;
          })

      },
      removethis:function(){
        this.msgshow = false;
        this.btshow = false;
        this.accountmsg = '';
        this.account = '';

      },
      getaccount:function(){
        if(!this.account){
          this.msg = '请输入交易宝账号';
          this.show = true;
          return;
        }
        this.showmyfile = false;
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_wallet/',
          params:{
            wallet_mobile:this.account
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.accountmsg = res.body.wallet;
            if(this.accountmsg.real_status == '1' && this.accountmsg.is_active){
              this.statusmsg = true;
              this.btshow = true;
            }else{
              this.statusmsg = false;
            }
            this.msgshow = true;
          }else{
            this.msgshow = false;
            this.btshow = false;
            this.accountmsg = '';
            this.msg = res.body.msg;
            this.show = true;
          }
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })

      },
      close:function(){
        this.show = false;
        this.msg = '';
      },
      addccount:function(){
        this.$http({
          method:'POST',
          url:'http://120.76.137.157:8887/work/add_member/',
          body:{
            wallet_mobile:this.account
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          this.show = true;
          this.msg = res.body.msg;
          if(res.body.status == '201'){
              this.msgshow = false;
              this.btshow = false;
              this.account = '';
              this.statusmsg = false;
              this.accountmsg = '';
          }
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })
      }
    }
  }
</script>
<style scoped>
  .showmm{
    width:80%;
  }
  .showmm .l{
    margin-right:20px;
    margin-top:11px;
    color:#337ab7;
  }
  .filecheck{
   margin-left:8px;
  }
  .fileall{
    width:100%;
    height:100%;
    overflow:auto;
  }
  .addbt1{
    margin-bottom:10px;
    margin-top:-15px;
    color:red;
  }
  .myleft2{
    margin-top:10px;
  }
  .myfile{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    cursor:pointer;
  }
  #workmemberadd1{
    width:100%;
    height:100%;
    position:relative;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
  }
  .addtitle1{
    height:100px;
  }
  .addbox{
    position:absolute;
    width:100%;
    overflow:hidden;
    padding-left:2rem;
  }
  .text{
    width:15rem;
    margin-right:5rem;
  }
  .mylabel{
    font-size:1rem !important;
  }
  .smallbox{
    width:100%;
    height:100%;
    padding:.5rem;
  }
  .addbt{
    margin-top:25px;
    margin-right:2rem;
  }
  .memberlist{
    width:80%;
    height:300px;
    overflow-y:hidden;
    background:white;
    border:1px solid #ccc;
  }
  .demo-chip{
    margin:.5rem;
  }
  .thiscr{
    position:relative;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
  }
  .demomsg{
    margin:10px auto;
    width:100%;
    height:30px;
    text-align:left;
  }
  .smallbox span{
    display:block;
    float:left;
  }
  .leftmsg{
    width:44%;
    text-align:right;
  }
  .myleft{
    margin-left:35%;
    margin-top:10px;
    margin-right:5%;
  }
</style>
