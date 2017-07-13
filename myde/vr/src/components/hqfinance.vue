<template>
  <div id="hqfinance">
    <div class="header">财务统计</div>
    <div class="finance-search">
      <div class="">
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="交易开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="l btmar"/>
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="交易结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="l btmar"/>
        <mu-raised-button label="查询" class="finance-button l loadmr" :backgroundColor="bgcolor" @click="searchdate"/>
        <mu-raised-button label="导出为报表" class="finance-button l loadmr" :backgroundColor="bgcolor" @click="getexcel"/>
        <mu-raised-button label="刷新" class="finance-button l loadmr" :backgroundColor="bgcolor" @click="reloadthis"/>
      </div>
    </div>
    <div class="finance-tb">
      <mu-table :showCheckbox="isshow" class="finance-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="finance-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td>{{tbm.work_name}}</mu-td>
            <mu-td>{{tbm.type == 0 ? '-' + tbm.profit : '+' + tbm.profit}}</mu-td>
            <mu-td>{{tbm.type == 0 ? '+' + tbm.vr9_count : '-' + tbm.vr9_count}}</mu-td>
            <mu-td>{{tbm.type == 0 ? '提现' : '报单'}}</mu-td>
            <mu-td>{{tbm.date.split(' ')[0]}}</mu-td>
            <mu-td>{{tbm.wallet_account}}</mu-td>
            <mu-td v-if = 'tbm.work_type ==  0'>省分支</mu-td>
            <mu-td v-if = 'tbm.work_type ==  1'>市分支</mu-td>
            <mu-td v-if = 'tbm.work_type ==  2'>区\县分支</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="finance-paging" v-if="total > 10">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="finance-paging-box">
      </mu-pagination>
    </div>
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqfinance',
    data(){
      return{
        startdate:'',
        enddate:'',
        bgcolor:'red',
        isshow:false,
        total:0,
        current:1,
        size:10,
        tbtitle:['工作室名','总部收支（元）','VR9币收支（个）','类型','交易时间','交易宝账号','分支类型'],
        tbmsg:[],
        show:false,
        msg:''
      }
    },
    methods:{
      close:function(){
        this.show = false;
        this.msg = '';
      },
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_financial/',
          params:{
            page:page
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.financial_list;
          this.total = res.body.page_info.count;
        }else{
          this.tbmsg = [];
        }
      }, res => {

        })
      },
      reloadthis:function(){
        this.startdate = '';
        this.enddate = '';
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
      },
      getexcel:function(){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_financial/',
          params:{
            get_type:'excel'
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {

      }, res => {

        })
      },
      searchdate:function(){
        if(!this.startdate){
          this.show = true;
          this.msg = "请选择开始日期";
          return;
        }
        if(!this.enddate){
          this.show = true;
          this.msg = '请选择结束日期';
          return;
        }
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_financial/',
          params:{
            get_type:'search',
            page:1,
            start_time:this.startdate,
            stop_time:this.enddate
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
              this.tbmsg = res.body.financial_list;
              this.total = res.body.page_info.count;
          }else{
              this.tbmsg = [];
          }
        }, res => {

        })
      },
      handleClick:function(newIndex){
        this.getdetail(newIndex);
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'GET',
        url:'http://120.76.137.157:8887/work_admin/get_financial/',
        params:{
          page:1
        },
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
        if(res.body.status == '200'){
        this.tbmsg = res.body.financial_list;
        this.total = res.body.page_info.count;
      }else{
        this.tbmsg = [];
      }
    }, res => {

      })
    },
    mounted:function(){

    }
  }
</script>
<style scoped>
  #hqfinance{
    width:100%;
    height:100%;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
    margin-bottom:12px;
  }
  .finance-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .finance-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .finance-status .mu-select-field{
    top:11px;
  }
  .finance-tb{
    width:100%;
    max-height:550px;
    padding:0 44px;
    overflow:hidden;
  }
  .finance-th{
    font-size:16px;
  }
  .finance-td{
    font-size:14px;
  }
  .finance-tbe{
    border:1px solid #ccc;
  }
  .finance-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .finance-paging-box{
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
  .psdenter{
    width:33px;
    height:33px;
    margin:0 10px;
    border:1px solid #ccc;
  }
  .psdenter input{
    border:none;
    outline:none;
    width:100%;
    height:100%;
    text-align:center;
    font-size:20px;
  }
  .pd50{
    padding-left:100px;
  }
</style>
<style>
  .search-title{
    font-size:20px;
  }
  .search-focus{
    color:red;
  }
  .finance-button{
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
</style>
