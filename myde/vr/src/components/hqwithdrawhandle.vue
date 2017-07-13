<template>
  <div id="hqwithdrawhandle">
    <div class="header">工作室提现审核</div>
    <div class="withdrawhandle-search">
      <div class="">
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="申请开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="l btmar"/>
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="申请结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="l btmar"/>
        <mu-raised-button label="查询" class="withdrawhandle-button l loadmr" :backgroundColor="bgcolor"/>
        <mu-raised-button label="刷新" class="withdrawhandle-button l loadmr" :backgroundColor="bgcolor" @click="reloadthis"/>
      </div>
    </div>
    <div class="withdrawhandle-tb">
      <mu-table :showCheckbox="isshow" class="withdrawhandle-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="withdrawhandle-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <!--<mu-td class="withdrawhandle-td" v-for="(tb,index) in tbm" :key="index">{{tb}}</mu-td>-->
            <mu-td class="withdrawhandle-td">{{tbm.user.work_name}}</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 1">省分支</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 2">市分支</mu-td>
            <mu-td class="withdrawhandle-td" v-if="tbm.user.work_type == 3">区/县分支</mu-td>
            <mu-td class="withdrawhandle-td">未提现</mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.date.split(' ')[0]}}</mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.vr9_count}}</mu-td>
            <mu-td class="withdrawhandle-td">{{tbm.profit}}</mu-td>
            <!--<mu-td v-if="tbm.status == 0">
              <mu-flat-button label="立即拨币" @click="open(tbm)" color="blue"/>
            </mu-td>-->
            <mu-td>
              <mu-flat-button label="提现审核" @click="open(tbm)" color="blue"/>
            </mu-td>
            <!--            <mu-td v-if="tbm.status == 0">
                          <mu-flat-button label="申请提现" @click="open(tbm)" color="blue"/>
                        </mu-td>
                        <mu-td v-if="tbm.status == 1">
                          <mu-flat-button label="查看详情" @click="open(tbm)" color="blue"/>
                        </mu-td>
                        <mu-td v-if="tbm.status == 2">
                          <mu-flat-button label="查看详情" @click="open(tbm)" color="blue"/>
                        </mu-td>-->
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="withdrawhandle-paging" v-if="total > 10">
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="withdrawhandle-paging-box">
      </mu-pagination>
    </div>
    <mu-dialog :open="dialog" title="提现审核" titleClass="dg-title" actionsContainerClass	="dg-w">
      <div class="mr22">
        工作室名称：<span class="srtext">{{workname}}</span>
      </div>
      <div class="mr22 mr33">
        提现金额：<span class="srtext">{{wdmoney+'元'}}</span>
      </div>
      <div>
        <div class="mr22">输入交易宝支付密码：</div>
        <div class="pd50">
          <div class="psdenter l" v-for="(i,index) in 6">
            <input class="l mypsd" type="password" maxlength="1" v-model="psdclk[index]" @keyup="getfocus(index,$event)">
          </div>
        </div>
      </div>
      <mu-raised-button slot="actions" @click="canceldg()" primary label="取消" />
      <mu-raised-button slot="actions" primary @click="close()" label="确定审核"  class="mrl20"/>
    </mu-dialog>
    <!--      <mu-dialog :open="dialog" title="申请提现">
            这是一个简单的弹出框
            <mu-flat-button slot="actions" @click="close(0)" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="close(0)" label="确定"/>
          </mu-dialog>-->
  </div>
</template>
<script>
  export default{
    name:'hqwithdrawhandle',
    data(){
      return{
        status:'0',
        startdate:'',
        enddate:'',
        bgcolor:'red',
        isshow:false,
        dialog:false,
        total:0,
        current:1,
        size:10,
        workname:'',
        wdmoney:'',
        labeltext:'',
        myid:'',
        myindex:1,
        psdclk:['','','','','',''],
        tbtitle:['工作室名称','工作类型','状态','申请时间','已收币（个）','提现金额（元）','操作'],
        tbmsg:[]
      }
    },
    methods:{
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_withdraw/?type=2&page='+page,
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
      reloadthis:function(){
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
        this.myindex = 1;
      },
      getfocus:function(index,event){
        var input =  document.getElementsByClassName("mypsd");
        console.log(event.keyCode)
        if(index < 5 && event.keyCode != '8'){
          input[index+1].focus();
        }
        if(index > 0 && event.keyCode == '8'){
          input[index-1].focus();
        }

        console.log(this.psdclk);
        /*if((event.keyCode >= 48 && event.keyCode <= 57) ||(event.keyCode >=96 && event.keyCode <=105)){


         }else{

         }*/
      },
      searchstatus:function(){
        console.log(this.startdate,this.enddate,this.status);
      },
      close:function(){
        this.$http({
          method:'POST',
          url:'http://120.76.137.157:8887/work_admin/set_withdraw/',
          body:{
            record_id:this.myid
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '201'){
          this.getdetail(this.myindex);
          this.canceldg();
        }else{
          alert(res.body.msg);
        }
      }, res => {
          alert(res.body.msg);
        })
      },
      canceldg:function(){
        this.workname = '';
        this.wdmoney = '';
        this.psdclk = ['','','','','',''];
        this.dialog = false;
        this.myid = '';

      },
      open:function(tbm){
        this.dialog = true;
        this.workname = tbm.user.work_name;
        this.wdmoney = tbm.profit;
        this.myid = tbm.id;
          setTimeout(function(){
            document.getElementsByClassName("mypsd")[0].focus();
          },1000);
      },
      handleClick:function(newIndex){
        this.getdetail(newIndex);
        this.myindex = newIndex;
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'GET',
        url:'http://120.76.137.157:8887/work_admin/get_withdraw/?page=1&type=2',
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
  #hqwithdrawhandle{
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
  .withdrawhandle-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .withdrawhandle-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .withdrawhandle-status .mu-select-field{
    top:11px;
  }
  .withdrawhandle-tb{
    width:100%;
    max-height:550px;
    padding:0 44px;
    overflow:hidden;
  }
  .withdrawhandle-th{
    font-size:16px;
  }
  .withdrawhandle-td{
    font-size:14px;
  }
  .withdrawhandle-tbe{
    border:1px solid #ccc;
  }
  .withdrawhandle-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .withdrawhandle-paging-box{
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
  .withdrawhandle-button{
    margin-left:3rem !important;
  }
  .mu-th,.mu-td{
    text-align:center !important;
  }
  .dg-title{
    background:#dfdfdf;
    height:30px;
    margin-bottom:22px !important;
  }
  .dg-w{
    justify-content:center !important;
    padding-bottom:33px !important;
  }
  .mrl20{
    margin-left:60px !important;
  }
</style>
