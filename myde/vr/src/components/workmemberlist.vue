<template>
  <div id="memberlist">
    <div class="header">工作室会员列表</div>
    <div class="member-search">
        <div class="l btmar">
          <mu-text-field label="关键字" hintText="会员姓名，交易宝账号" labelFloat v-model="search" labelClass="member-sarch-label"/>
        </div>
        <mu-raised-button label="查询" class="member-button l loadmr" :backgroundColor="bgcolor" @click="searchword"/>
        <mu-raised-button label="刷新" class="member-button l loadmr" :backgroundColor="bgcolor" @click="loadthis"/>
    </div>
    <div class="member-tb">
      <mu-table :showCheckbox="isshow" class="member-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="member-th" :class="{haha:index == 0 || index == 1}" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index" :class="{redmark:!tbm.is_active}">
            <mu-td>{{tbm.mobile}}</mu-td>
            <mu-td>{{tbm.real_name}}</mu-td>
            <mu-td>{{tbm.date}}</mu-td>
            <mu-td>{{tbm.address}}</mu-td>
            <mu-td>
             <!-- <mu-flat-button v-if="tbm.is_active" label="冻结" color="blue" @click="freezethis(tbm)"/>
              <mu-flat-button v-if="!tbm.is_active" label="解冻" color="red" @click="freezeno(tbm)"/>-->
              <mu-flat-button label="踢出工作室" :color="tbm.is_active ? 'blue' : 'red'" @click="openremove(tbm)"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
    <mu-dialog :open="freeshow" :title="freetitle">
      <div class="resonall">
        <div class="resonl l">
          备注：
        </div>
        <div class="resonr l">
          <textarea class="resondetail" v-model="remark"></textarea>
        </div>
      </div>
      <mu-flat-button label="取消" slot="actions" primary @click="freeclose"/>
      <mu-flat-button label="确定" slot="actions" primary @click="freeenter" :disabled="fdis"/>
    </mu-dialog>
    <mu-dialog :open="removeshow" title="温馨提示">
      {{removemsg}}
      <mu-flat-button label="取消" slot="actions" primary @click="removeclose"/>
      <mu-flat-button label="确定" slot="actions" primary @click="removeenter"/>
    </mu-dialog>
    <div class="member-paging" v-if="total > 10">
      <div class="showlists">总共{{total}}条记录，当前为第{{crtpg}}页，显示第{{(crtpg - 1) * 10+ 1}}条到第{{crtpg * 10 > total ? total : crtpg * 10}}条记录</div>
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="member-paging-box">
      </mu-pagination>
    </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'workmemberlist',
    data(){
      return{
        show:false,
        msg:'',
        bgcolor:'#337ab7',
        isshow:false,
        total:0,
        current:1,
        size:10,
        search:'',
        showdetail:false,
        suss:false,
        myindex:1,
        tbtitle:['交易宝账号','会员姓名','加入时间','地址','操作'],
        tbmsg:[],
        freemsg:'',
        remark:'',
        freeshow:false,
        freeid:'',
        removeshow:false,
        removeid:'',
        freetitle:'',
        fdis:false,
        removemsg:'',
        crtpg:'1'
      }
    },
    methods:{
      openremove:function(tbm){
          this.removemsg = '确定将此会员踢出工作室吗？';
          this.removeid = tbm.id;
          this.removeshow = true;
      },
      freeenter:function(){
        this.fdis = true;
        this.$http({
          method:'PUT',
          url:'http://120.76.137.157:8887/work/set_member/',
          body:{
            wallet_mobile:this.freeid,
            remark:this.remark
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '201'){
              this.suss = true;
          }
          this.freeclose();
          this.remark = '';
          this.msg = res.body.msg;
          this.show = true;
          this.fdis = false;
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
          this.fdis = false;
        })
      },
      removeenter:function(){
          this.removemember(this.removeid);
      },
      freeclose:function(){
        this.freeid = '';
        this.freetitle = '';
        this.remark = '';
        this.freeshow = false;
      },
      removeclose:function(){
        this.removeshow = false;
        this.removeid = '';
        this.removemsg = '';
      },
      byword:function(word,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work/get_member/',
          params:{
            word:word,
            page:page
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.tbmsg = res.body.member_list;
            this.total = res.body.page_info.count;
          }
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })
      },
      searchword:function(){
        this.total = 0;
        this.current = 1;
        this.byword(this.search,1);
      },
      freezethis:function(tbm){
        this.freeid = tbm.mobile;
        this.freetitle = '冻结账号';
        this.freeshow = true;
      },
      freezeno:function(tbm){
        this.freeshow = true;
        this.freeid = tbm.mobile;
        this.freetitle = '解冻账号？';
      },
      removemember:function(id){
        this.$http({
          method:'DELETE',
          url:'http://120.76.137.157:8887/work/del_member/',
          body:{
            member_id:id
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          this.removeclose();
          this.show = true;
          this.msg = res.body.msg;
          if(res.body.status == '204'){
            this.suss = true;
          }
        },function(res){
          this.show = true;
          this.msg = '网络链接失败';
        })
      },
      handleClick:function(newIndex){
        this.getdetail(newIndex);
        this.myindex = newIndex;
        this.crtpg = newIndex;
      },
      closedetail:function(){
        this.showdetail = false;
      },
      showdt:function(index){
        this.showdetail = true;
      },
      close:function(){
        if(this.suss){
          this.getdetail(this.myindex);
        }
        this.show = false;
        this.msg = '';

      },
      loadthis:function(){
        this.crtpg = '1';
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
        this.myindex = 1;
      },
      getdetail:function(page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_member/?page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.tbmsg = res.body.member_list;
            this.total = res.body.page_info.count;
          }
        },function(res){
        })
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/work/get_member/?page=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then(function(res){
        if(res.body.status == '200'){
          this.tbmsg = res.body.member_list;
          this.total = res.body.page_info.count;
        }
      },function(res){
      })
    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  .haha{
    width:15%;
  }
  .resonall{
    width:100%;
    overflow:hidden;
  }
  .resonl{
    width:13%;
    height:50px;
    text-align:right;
    padding-top:.5rem;
  }
  .resonr{
    width:80%;
    height:100px;
    border:1px solid #ccc;
  }
  .resondetail{
    width:100%;
    height:100%;
    padding:.5rem;
    boeder:none;
    resize:none;
  }
  #memberlist{
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
  .member-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .member-search div{
    width:256px;
    display:inline-block;
    padding-left:.2rem;
  }
  .member-tb{
    width:100%;
    padding:0 44px;
    overflow:hidden;
  }
  .member-th{
    font-size:16px;
  }
  .member-td{
    font-size:14px;
  }
  .member-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .member-paging-box{
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
  }
  .line{
    width:100%;
    height:1px;
    background:#999999;
    box-shadow:0 0 2px rgba(0,0,0,.5);
    margin:3px 0;
  }
  .dtbox{
    width:100%;
    overflow:hidden;
    padding-left:2rem;
    padding-top:2.2rem;
  }
  .dt-text{
    width:122px;
    text-align:right;
    margin-right:36px;
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
  .closedetail{
    width:200px;
    border-radius:8px;
  }
</style>
<style>
  .search-title{
    font-size:20px;
  }
  .search-focus{
    color:red;
  }
  .member-button{
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
  .member-sarch-label{
    font-size:1.2rem !important;
  }
  .redmark{
    color:red !important;
  }
</style>
