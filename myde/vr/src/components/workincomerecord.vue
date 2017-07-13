<template>
    <div id="incomerecord">
      <div class="header">财务统计</div>
      <div class="income-search">
        <div class="">
          <mu-date-picker mode="landscape" hintText="报单开始日期" icon="today" label="报单开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="l btmar"/>
          <mu-date-picker mode="landscape" hintText="报单结束日期" icon="today" label="报单结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="l btmar"/>
          <div class="income-status l">
            <mu-select-field v-model="status" label="提现状态" labelClass="search-title"  labelFocusClass="search-focus" @change="searchstatus">
              <mu-menu-item v-for="text,index in list" :key="index" :value="String(index)" :title="text" />
            </mu-select-field>
          </div>
          <mu-raised-button label="查询" class="income-button l loadmr" :backgroundColor="bgcolor"/>
          <mu-raised-button label="刷新" class="income-button l loadmr" :backgroundColor="bgcolor" @click = 'reloadthis'/>
        </div>
      </div>
      <div class="income-tb">
        <mu-table :showCheckbox="isshow" class="income-tbe">
          <mu-thead>
            <mu-tr>
              <mu-th class="income-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
              <mu-td>{{tbm.profit}}</mu-td>
              <mu-td v-if="tbm.status == 0">未提现</mu-td>
              <mu-td v-if="tbm.status == 1">已提现</mu-td>
              <mu-td v-if="tbm.status == 2">提现中</mu-td>
              <mu-td>{{tbm.user.work_name}}</mu-td>
              <mu-td>{{JSON.parse(tbm.user.work_address.replace(/'/g,'"')).city}}</mu-td>
              <mu-td>{{JSON.parse(tbm.user.work_address.replace(/'/g,'"')).area}}</mu-td>
              <mu-td>{{tbm.date.split(' ')[0]}}</mu-td>
              <mu-td>{{tbm.declaration.rmb}}</mu-td>
              <mu-td v-if="tbm.status == 0">
                <mu-flat-button label="申请提现" @click="open(tbm)" color="blue"/>
              </mu-td>
              <mu-td v-if="tbm.status == 1">
                <mu-flat-button label="查看详情" @click="open(tbm)" color="blue"/>
              </mu-td>
              <mu-td v-if="tbm.status == 2">
                <mu-flat-button label="查看详情" @click="open(tbm)" color="blue"/>
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
      </div>
      <div class="income-paging" v-if="total > 10">
        <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="income-paging-box">
        </mu-pagination>
      </div>
      <mu-dialog :open="dialog" title="查看详情" titleClass="dg-title" actionsContainerClass	="dg-w">
        <div class="mr22">
            本单分润收入：{{getmoney}}元
        </div>
        <!--<div class="mr22">
            兑换VR9币：100个<span>*提现所需使用的VR9币</span>
        </div>-->
        <div class="mr22 mr33">
           提现状态：<span class="srtext">{{statustext}}</span>
        </div>
        <div v-if="isshowpsd">
           <div class="mr22">输入交易宝支付密码：</div>
           <div class="pd50">
              <div class="psdenter l" v-for="(i,index) in 6">
                <input class="l mypsd" type="password" maxlength="1" v-model="psdclk[index]" @keyup="getfocus(index,$event)">
              </div>
           </div>
        </div>
        <mu-raised-button slot="actions" @click="canceldg()" primary label="取消"/>
        <mu-raised-button slot="actions" primary @click="close()" label="确定"  class="mrl20" :disabled="isdis"/>
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
    name:'workincomerecord',
    data(){
      return{
        list:[
          '全部','未提现','提现中','已提现'
        ],
        status:'0',
        startdate:'',
        enddate:'',
        bgcolor:'red',
        isshow:false,
        dialog:false,
        dialog1:false,
        isdis:false,
        total:0,
        current:1,
        size:10,
        myindex:1,
        statustext:'',
        getmoney:'',
        isshowpsd:false,
        myid:'',
        psdclk:['','','','','',''],
        tbtitle:['分润收入(元)','提现状态','报单工作室','所属市','所属县/区','报单时间','报单金额(元)','操作'],
        tbmsg:[
        ]
      }
    },
    methods:{
      getdetail:function(page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/all/get_record/?page=' + page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.record_list;
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
        if(index < 5 && event.keyCode != '8'){
          input[index+1].focus();
        }
        if(index > 0 && event.keyCode == '8'){
          input[index-1].focus();
        }

        /*if((event.keyCode >= 48 && event.keyCode <= 57) ||(event.keyCode >=96 && event.keyCode <=105)){


        }else{

        }*/
      },
      searchstatus:function(){
      },
      close:function(){
         this.isdis = true;
         if(this.isshowpsd){
           let data = {
             pay_pwd:this.psdclk.join(''),
             record_id:this.myid
           }
           this.$http({
             method:'post',
             url:'http://120.76.137.157:8887/all/withdraw/',
             body:data,
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
            this.isdis = false;
         }, res => {
             alert('网络链接失败');
             this.isdis = false;
           })
         }else{
           this.canceldg()
         }
      },
      canceldg:function(){
        this.getmoney = '';
        this.isshowpsd = false;
        this.statustext = '';
        this.psdclk = ['','','','','',''];
        this.dialog = false;
        this.myid = '';
      },
      open:function(tbm){
        this.isdis = false;
        this.myid = tbm.id;
        this.dialog = true;
        this.getmoney = tbm.profit;
        if(tbm.status == '0'){
          this.statustext = '未提现';
          this.isshowpsd = true;
          setTimeout(function(){
            document.getElementsByClassName("mypsd")[0].focus();
          },1000);


        }
        if(tbm.status == '1'){
          this.statustext = '已提现';
          this.isshowpsd = false;
        }
        if(tbm.status == '2'){
          this.statustext = '提现中';
          this.isshowpsd = false;
        }



      },
      handleClick:function(newIndex){
        this.myindex = newIndex;
        this.getdetail(newIndex);
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/all/get_record/?page=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
        if(res.body.status == '200'){
        this.tbmsg = res.body.record_list;
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
  #incomerecord{
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
  }
  .income-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .income-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .income-status .mu-select-field{
    top:11px;
  }
  .income-tb{
    width:100%;
    max-height:550px;
    padding:0 44px;
    overflow:hidden;
  }
  .income-th{
    font-size:16px;
  }
  .income-td{
    font-size:14px;
  }
  .income-tbe{
    border:1px solid #ccc;
  }
  .income-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .income-paging-box{
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
  .income-button{
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
