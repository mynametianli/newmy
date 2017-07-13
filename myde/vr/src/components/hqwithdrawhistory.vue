<template>
  <div id="hqwithdrawhistory">
    <div class="header">工作室提现历史</div>
    <div class="withdrawhistory-search">
      <div class="">
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="申请开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="l btmar"/>
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="申请结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="l btmar"/>
        <mu-raised-button label="查询" class="withdrawhistory-button l loadmr" :backgroundColor="bgcolor"/>
        <mu-raised-button label="导出为报表" class="withdrawhistory-button l loadmr" :backgroundColor="bgcolor"/>
        <mu-raised-button label="刷新" class="withdrawhistory-button l loadmr" :backgroundColor="bgcolor" @click = 'reloadthis'/>
      </div>
    </div>
    <div class="withdrawhistory-tb">
      <mu-table :showCheckbox="isshow" class="withdrawhistory-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="withdrawhistory-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td class="withdrawhandle-td">{{tbm.user.work_name}}</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 1">省分支</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 2">市分支</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 3">区/县分支</mu-td>
            <mu-td class="withdrawhandle-td">已提现</mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.date.split(' ')[0]}}</mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.set_date.split(' ')[0]}}</mu-td>
            <mu-td class="withdrawhandle-td"></mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.profit}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="withdrawhistory-paging" v-if="total > 10">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="withdrawhistory-paging-box">
      </mu-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    name:'hqwithdrawhistory',
    data(){
      return{
        startdate:'',
        enddate:'',
        bgcolor:'red',
        isshow:false,
        total:0,
        current:1,
        size:10,
        tbtitle:['工作室名称','工作类型','状态','申请时间','审核时间','已收币','提现金额'],
        tbmsg:[]
      }
    },
    methods:{
      reloadthis:function(){
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
      },
      searchstatus:function(){
        console.log(this.startdate,this.enddate,this.status);
      },
      handleClick:function(newIndex){
        this.getdetail(newIndex);
      },
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_withdraw/?type=1&page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.records_list;
          this.total = res.body.page_info.count;
        }
      }, res => {

        })
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'GET',
        url:'http://120.76.137.157:8887/work_admin/get_withdraw/?page=1&type=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
        if(res.body.status == '200'){
        this.tbmsg = res.body.records_list;
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
  #hqwithdrawhistory{
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
  .withdrawhistory-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .withdrawhistory-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .withdrawhistory-status .mu-select-field{
    top:11px;
  }
  .withdrawhistory-tb{
    width:100%;
    max-height:550px;
    padding:0 22px 0 44px;
    padding:0 22px 0 44px;
    overflow:hidden;
  }
  .withdrawhistory-th{
    font-size:16px;
  }
  .withdrawhistory-td{
    font-size:14px;
  }
  .withdrawhistory-tbe{
    border:1px solid #ccc;
  }
  .withdrawhistory-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .withdrawhistory-paging-box{
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
  .withdrawhistory-button{
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
