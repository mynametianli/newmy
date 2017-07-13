<template>
  <div id="memberlistp">
    <div class="header">工作室会员审核</div>
    <div class="member-search">
      <div class="l btmar">
        <mu-text-field label="关键字" hintText="申请人姓名，交易宝账号" labelFloat v-model="search" labelClass="member-sarch-label"/>
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
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td>{{tbm.wallet}}</mu-td>
            <mu-td>{{tbm.real_name}}</mu-td>
            <mu-td>{{tbm.date}}</mu-td>
            <mu-td>{{tbm.address}}</mu-td>
            <mu-td>
              <mu-flat-button label="通过" color="blue" @click="passthis(tbm)"/>
              <mu-flat-button label="驳回" color="blue" @click="backthis(tbm)"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
    <mu-dialog :open="showps" title="温馨提示">
      {{msgps}}
      <mu-flat-button label="取消" slot="actions" primary @click="closeps"/>
      <mu-flat-button label="确定" slot="actions" primary @click="psclose"/>
    </mu-dialog>
    <mu-dialog :open="showbk" title="温馨提示">
      {{msgbk}}
      <mu-flat-button label="取消" slot="actions" primary @click="closebk"/>
      <mu-flat-button label="确定" slot="actions" primary @click="bkclose"/>
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
    name:'workmemberpass',
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
        tbtitle:['交易宝账号','申请人姓名','申请时间','地址','操作'],
        tbmsg:[],
        msgps:'是否同意该会员加入工作室申请',
        showps:false,
        psid:'',
        msgbk:'是否驳回该会员加入工作室申请',
        showbk:false,
        bkid:'',
        activecode:'',
        crtpg:'1'
      }
    },
    methods:{
      searchword:function(){

        this.total = 0;
        this.current = 1;
        this.activebt = 1;
        this.wordsearch(this.search,1);
      },
      wordsearch:function(word,page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/invite/?status=0&page='+page,
          params:{
            word:word
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.tbmsg = res.body.apply_list;
            this.total = res.body.page_info.count;
          }
        },function(res){
          this.msg = '网络链接失败请稍后再试'
          this.show = true;
        })
      },
      closeps:function(){
        this.showps = false;
      },
      psclose:function(){
        this.showps = false;
        this.backpass('put',this.psid);

      },
      passthis:function(tbm){
        this.psid = tbm.id;
        this.showps = true;
      },
      closebk:function(){
        this.showbk = false;
      },
      bkclose:function(){
        this.showbk = false;
        this.backpass('DELETE',this.bkid);

      },
      backthis:function(tbm){
        this.bkid = tbm.id;
        this.showbk = true;
      },
      handleClick:function(newIndex){
        this.myindex = newIndex;
        if(this.activecode == 1){
          this.wordsearch(this.search,newIndex);
        }else{
          this.getdetail(newIndex);
        }
        this.crtpg = newIndex;
      },
      close:function(){
        if(this.suss){
          this.loadthis();
        }
        this.show = false;
        this.msg = '';

      },
      loadthis:function(){
        this.crtpg = '1';
        this.suss = false;
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
        this.myindex = 1;
        this.activecode = '';
        this.search = '';
      },
      backpass:function(type,id){
        this.$http({
          method:type,
          url:'http://120.76.137.157:8887/work/invite/',
          body:{
            apply_id:id
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          this.msg = res.body.msg;
          if((type == 'put' && res.body.status == '201') || (type == 'DELETE' && res.body.status == '204')){
            this.suss = true;
          }
          this.show = true;
        },function(res){
          this.msg = '网络链接失败请稍后再试';
          this.show = true;
        })
      },
      getdetail:function(page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/invite/?status=0&page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then(function(res){
          if(res.body.status == '200'){
            this.tbmsg = res.body.apply_list;
            this.total = res.body.page_info.count;
          }
        },function(res){
        })
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/work/invite/?page=1&status=0',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then(function(res){
        if(res.body.status == '200'){
          this.tbmsg = res.body.apply_list;
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
  #memberlistp{
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
  .member-tbe{
    border:1px solid #ccc;
    max-height:550px;
    overflow-y:auto;
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
  .dfhistory-tbe,.dfhandle-tbe,.custorms-tbe,.workaccount-tbe,.member-tbe{
    border:1px solid #ccc;
    /*max-height:550px;*/
    overflow-y:hidden;
    background:white;
  }
  .workaccount-paging,.member-paging,.custorms-paging,.dfhandle-paging,.dfhistory-paging,.workaccount-paging{
    padding-bottom:30px;
  }
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
</style>
