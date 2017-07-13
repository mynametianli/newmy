<template>
  <div id="accountall">
    <div class="header">账号列表</div>
    <div class="account-search">
      <div class="l btmar">
        <mu-text-field label="关键字" hintText="账号名称，真实姓名" labelFloat v-model="search" labelClass="account-sarch-label"/>
      </div>
      <mu-raised-button label="查询" class="account-button l loadmr" :backgroundColor="bgcolor"/>
      <mu-raised-button label="刷新" class="account-button l loadmr" :backgroundColor="bgcolor" @click="reloadthis"/>
    </div>
    <div class="account-tb">
      <mu-table :showCheckbox="isshow" class="account-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="account-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td>{{tbm.username}}</mu-td>
            <mu-td>{{tbm.nick_name}}</mu-td>
            <mu-td>{{tbm.mobile}}</mu-td>
            <mu-td>{{tbm.is_active ? '正常' : '已锁定'}}</mu-td>
            <mu-td><mu-flat-button label="查看详情" color="blue" @click="showdt(index)"/></mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="account-paging" v-if="total > 10">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="account-paging-box">
      </mu-pagination>
    </div>
    <div class="detail" v-if="showdetail">
      <div class="header">编辑账号</div>
      <div class="dtbox">
        <div class="detail-demo" v-for="(box,index) in boxmsg">
          <div class="l dt-text">{{box}}：</div>
          <div class="l" :class="index == 0 ? '' : 'dt-input'">
            <span v-if="index == 0">{{actmsg[index] ? '正常' : '已锁定'}}</span>
            <input type="text" class="l" v-if="index != 0" v-model="actmsg[index]" readonly>
          </div>
        </div>
        <!--<div class="detail-demo1">
          <div class="l dt-text">备注：</div>
          <div class="l dt-edit"><textarea name="" class="l"></textarea></div>
        </div>-->
       <!-- <div class="detail-demo">
          <div class="l dt-text">账号状态：</div>
          <div class="l">锁定</div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">用户名：</div>
          <div class="l dt-input">
            <input type="text" class="l">
          </div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">密码：</div>
          <div class="l dt-input">
            <input type="text" class="l">
          </div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">确认密码：</div>
          <div class="l">四川省高新区VR9工作室</div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">真实姓名：</div>
          <div class="l">四川省高新区VR9工作室</div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">手机号：</div>
          <div class="l dt-input">
            <input type="text">
          </div>
        </div>
        <div class="detail-demo">
          <div class="l dt-text">备注:</div>
          <div class="l">无备注</div>
        </div>-->
        <div class="detail-demo mrbt">
          <div class="l dt-text"></div>
          <div class="l textl">
            <mu-raised-button label="返回" class="closedetail mrlbt" @click.stop="closedetail"/>
            <mu-raised-button :label="labeltext" class="closedetail" @click.stop="lockeme"/>
          </div>
        </div>

      </div>
    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>
<script>
  export default{
    name:'workaccountall',
    data(){
      return{
        show:false,
        msg:'',
        suss:false,
        bgcolor:'red',
        isshow:false,
        total:500,
        current:1,
        size:10,
        search:'',
        showdetail:false,
        labeltext:'锁定',
        actmsg:[],
        myid:'',
        myindex:1,
        tbtitle:['账号名称','真实姓名','联系方式','使用状态','操作'],
        boxmsg:['账号状态','用户名','密码','确认密码','真实姓名','手机号码'],
        tbmsg:[
        ]
      }
    },
    methods:{
      close:function(){
        this.show = false;
        this.msg = '';
        if(this.suss){
          this.showdetail = false;
        }
      },
      getdetail:function(page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_admin/?page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.user_list;
          this.total = res.body.page_info.count;
        }
      }, res => {

        })
      },
      reloadthis:function(){
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
      },
      lockeme:function(){
        if(this.actmsg[0]){
          let data = {
            admin_id:this.myid,
            set_type:'un_active',
          }
          this.$http({
            method:'post',
            url:'http://120.76.137.157:8887/work/change_active/',
            body:data,
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          }).then( res => {
            this.show = true;
            this.msg = res.body.msg;
            if(res.body.status == '201'){
              this.getdetail(this.myindex);
              this.suss = true;
          }
        }, res => {
            this.show = true;
            this.msg = '网络链接失败';
          })

        }else{
          let data = {
            admin_id:this.myid,
            set_type:'active',
          }
          this.$http({
            method:'post',
            url:'http://120.76.137.157:8887/work/change_active/',
            body:data,
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          }).then( res => {
            if(res.body.status == '201'){
             this.getdetail(this.myindex);
             this.suss = true;
            }
            this.show = true;
            this.msg = res.body.msg;
          }, res => {
            this.show = true;
            this.msg = '网络链接失败';
          })
        }
      },
      searchstatus:function(){
        console.log(this.startdate,this.enddate,this.status);
      },
      handleClick:function(newIndex){
        this.getdetail(newIndex);
        this.myindex = newIndex;
      },
      closedetail:function(){
        this.showdetail = false;
      },
      showdt:function(index){
        this.suss = false;
        this.showdetail = true;
        this.myid = this.tbmsg[index].id;
        this.actmsg[0] = this.tbmsg[index].is_active;
        this.actmsg[1] = this.tbmsg[index].username;
        this.actmsg[2] = this.tbmsg[index].password;
        this.actmsg[3] = this.tbmsg[index].password;
        this.actmsg[4] = this.tbmsg[index].nick_name;
        this.actmsg[5] = this.tbmsg[index].mobile;
        if(this.actmsg[0]){
          this.labeltext = '锁定'
        }else{
          this.labeltext = '解锁'
        }
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/work/get_admin/?page=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
      if(res.body.status == '200'){
        this.tbmsg = res.body.user_list;
        this.total = res.body.page_info.count;
      }
    }, res => {

      })
    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  #accountall{
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
  .account-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .account-search div{
    width:256px;
    display:inline-block;
    padding-left:.2rem;
  }
  .account-tb{
    width:100%;
    max-height:550px;
    padding:0 44px;
    overflow:hidden;
  }
  .account-th{
    font-size:16px;
  }
  .account-td{
    font-size:14px;
  }
  .account-tbe{
    border:1px solid #ccc;
  }
  .account-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .account-paging-box{
    justify-content:flex-end;
  }
  .mr22{
    margin-bottom:22px;
  }
  .mr22 span{
    margin-left:22px;
  }
  .srtext{
    color:red;
  }
  .pd50{
    padding-left:100px;
  }
  .detail{
    position:absolute;
    width:100%;
    height:100%;
    overflow-y:scroll;
    background:#f0f0f0;
    left:0;
    top:0;
    z-index:10;
    padding-bottom:22px;
  }
  .detail .header{
    position:fixed;
  }
  .detail-demo{
    width:100%;
    height:36px;
    line-height:36px;
    font-size:16px;
    margin:10px;
  }
  .detail-demo1{
    width:100%;
    line-height:36px;
    font-size:16px;
    margin:10px;
    overflow:hidden;
  }
  .dtbox{
    width:100%;
    overflow:hidden;
    padding-left:2rem;
    padding-top:2.2rem;
  }
  .dt-text{
    width:6.01rem;
    text-align:right;
    margin-right:36px;
    height:100%;
  }
  .textl{
    text-align:left;
    margin-top:22px;
  }
  .closedetail{
    width:10rem;
    border-radius:8px;
    margin-bottom:2px;
  }
  .dt-input{
    width:15rem;
    height:36px;
    border:1px solid #ccc;
  }
  .dt-input:hover{
    border-color:deepskyblue;
  }
  .dt-input input{
    width:100%;
    height:100%;
    outline:none;
    padding-left:5px;
    border:none;
  }
  .dt-edit{
    width:30rem;
    height:100px;
    border:1px solid #ccc;
  }
  .dt-edit textarea{
    width:100%;
    height:100%;
    border:none;
    line-height:1.5;
    resize:none;
  }
  .mrlbt{
    margin-right:2rem;
  }
</style>
<style>
  .search-title{
    font-size:20px;
  }
  .search-focus{
    color:red;
  }
  .account-button{
    margin-left:3rem !important;
  }
  .mu-th,.mu-td{
    text-align:center !important;
  }
  .cu-title{
    background:#dfdfdf;
    height:30px;
    margin-bottom:22px !important;
  }
  .cu-w{
    justify-content:center !important;
    padding-bottom:33px !important;
  }
  .mrl20{
    margin-left:60px !important;
  }
  .account-sarch-label{
    font-size:1.2rem !important;
  }
</style>
