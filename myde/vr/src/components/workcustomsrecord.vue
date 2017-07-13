<template>
  <div id="custormsrecord">
    <div class="header">工作室报单记录</div>
    <div class="custorms-search">
      <div class="">
        <mu-date-picker mode="landscape" hintText="报单开始日期" icon="today" label="报单开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="btmar l"/>
        <mu-date-picker mode="landscape" hintText="报单结束日期" icon="today" label="报单结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="btmar l"/>
        <mu-raised-button label="查询" class="custorms-button l loadmr" :backgroundColor="bgcolor" @click="searchdate"/>
        <mu-raised-button label="刷新" class="custorms-button l loadmr" :backgroundColor="bgcolor" @click="reloadthis"/>
        <div class="income-status btmar1 l">
          <mu-select-field v-model="status" label="账号状态" labelClass="search-title"  labelFocusClass="search-focus" @change="searchstatus">
            <mu-menu-item v-for="text,index in list" :key="index" :value="String(index-1)" :title="text" />
          </mu-select-field>
        </div>
        <mu-raised-button label="我要报单" class="custorms-button r loadmr mr44" :backgroundColor="bdcolor" @click="gocustorm" :disabled="bddis"/>
      </div>
    </div>
    <div class="custorms-tb">
      <mu-table :showCheckbox="isshow" class="custorms-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="custorms-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td>{{tbm.mobile}}</mu-td>
            <mu-td>{{tbm.mobile}}</mu-td>
            <mu-td>{{tbm.date}}</mu-td>
            <mu-td>{{tbm.vr9_count}}</mu-td>
            <mu-td>{{tbm.status == 0 ? "未收币" : "已收币"}}</mu-td>
            <mu-td v-if="tbm.status == 0">
              <mu-flat-button label="撤销" @click="closepost(tbm)" color="#337ab7"/>
            </mu-td>
            <mu-td v-if="tbm.status != 0">
              <mu-flat-button label="不可操作" color="#ccc"/>
            </mu-td>
            <!--<mu-td class="custorms-td" v-for="(tb,index) in tbm" :key="index">{{tb}}</mu-td>-->
            <!--<mu-td v-if="tbm.status == 0">
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
    <div class="custorms-paging" v-if="total > 10">
      <div class="showlists">总共{{total}}条记录，当前为第{{crtpg}}页，显示第{{(crtpg - 1) * 10+ 1}}条到第{{crtpg * 10 > total ? total : crtpg * 10}}条记录</div>
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="custorms-paging-box">
      </mu-pagination>
    </div>
    <div class="custormbox" v-if="custorm">
        <div class="vr9-title">
          <div class="vtitle l">
            工作室报单
          </div>
          <div class="r" @click.stop="goout">
            X
          </div>
        </div>
        <div class='vrts'>{{'当前VR9单价为$'+hlprice+'，你最少需要购买'+minnum+'个VR9'}}</div>
        <div class="vr9number">
           <div class="l">转换智慧资产：</div>
           <div class="l">
             <input type="number" class="l vr9input" v-model="vr9number" placeholder="请输入VR9数量" @input.stop="showerror">
           </div>
          <div class="l">个</div>
        </div>
        <div class="errormsg">
          {{errormsg}}
        </div>
        <div class="custormbtn">
          <mu-raised-button label="提交报单" class="custorm-bt l loadmr22" :backgroundColor="bgcolor" @click="setcustorm" :disabled="disb"/>
        </div>
    </div>
 <!--   <mu-dialog :open="dialog" title="查看详情" titleClass="cu-title" actionsContainerClass	="cu-w">
      <div class="mr22">
        本单分收入：{{getmoney}}元
      </div>
      <div class="mr22">
        兑换VR9币：100个<span>*提现所需使用的VR9币</span>
      </div>
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
      <mu-raised-button slot="actions" @click="cancelcu()" primary label="取消"/>
      <mu-raised-button slot="actions" primary @click="close()" label="确定"  class="mrl20"/>
    </mu-dialog>-->
    <!--      <mu-dialog :open="dialog" title="申请提现">
            这是一个简单的弹出框
            <mu-flat-button slot="actions" @click="close(0)" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="close(0)" label="确定"/>
          </mu-dialog>-->
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
    <div>
      <mu-dialog :open="closeshow" title="温馨提示">
        {{closemsg}}
        <mu-flat-button label="取消" slot="actions" primary @click="closeshow1"/>
        <mu-flat-button label="确定" slot="actions" primary @click="closeshow2"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    name:'workcustormsrecord',
    data(){
      return{
        status:'-1',
        startdate:'',
        enddate:'',
        bgcolor:'#337ab7',
        isshow:false,
        total:0,
        current:1,
        size:10,
        statustext:'',
        getmoney:'',
        isshowpsd:false,
        psdclk:['','','','','',''],
        tbtitle:['操作员交易宝账号','收币交易宝账号','报单时间','收币数量(个)','状态','操作'],
        tbmsg:[
        ],
        custorm:false,
        vr9number:'',
        disb:false,
        show:false,
        msg:'',
        closeshow:false,
        closemsg:'是否撤销报单？',
        closeid:'',
        errormsg:'',
        list:['全部','未收币','已收币'],
        activebt:-1,
        bddis:true,
        bdcolor:'gray',
        hlprice:'',
        minnum:'0',
        crtpg:'1'
      }
    },
    methods:{
      showerror:function(){
        if(this.vr9number <= this.minnum ||  /\.+/.test(this.vr9number)){
          this.errormsg= '请输入大于'+this.minnum+'并且小于10000000的正整数';
        }else if(this.vr9number > 10000000){
          this.vr9number = '10000000';
        }else{
          this.errormsg= '';
        }
      },
      closepost:function(tbm){
        this.closeid = tbm.id;
        this.closemsg = '是否撤销报单？';
        this.closeshow = true;

      },
      closeshow1:function(){
        this.closeid = '';
        this.closeshow = false;
      },
      closeshow2:function(){
        this.$http({
          method:'put',
          url:'http://120.76.137.157:8887/work/close_declaration/',
          body:{
            declaration_id:this.closeid
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '201'){
          this.reloadthis();
          }
        this.closeshow = false;
        this.closeid = '';
        this.msg = res.body.msg;
        this.show = true;
      }, res => {
          this.closeshow = false;
          this.closeid = '';
          this.msg = '网络链接失败';
          this.show = true;
        })
      },
      close:function(){
        this.show = false;
        this.msg = '';
        this.disb = false;
      },
      goout:function(){
        this.custorm = false;
        this.vr9number = '';
      },
      gocustorm:function(){
        this.vr9number = '';
        this.errormsg = '请输入大于'+this.minnum+'并且小于10000000的正整数';
        this.disb = false;
        this.custorm = true;
      },
      setcustorm:function(){
        if(this.vr9number <= this.minnum || /\.+/.test(this.vr9number) || this.vr9number > 10000000){
          this.msg = '报单数量不符合规范,请输入大于'+this.minnum+'小于10000000的正整数';
          this.show = true;
          this.vr9number = '';
          return;
        }
        this.disb = true;
        this.$http({
          method:'POST',
          url:'http://120.76.137.157:8887/work/add_declaration/',
          body:{
            vr9_count:this.vr9number
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '201'){
            this.custorm = false;
            this.reloadthis();
          }
        this.disb = false;
        this.msg = res.body.msg;
        this.show = true;
      }, res => {
          this.disb = false;
          this.msg = '网络链接失败';
          this.show = true;
        })
      },
      searchdate:function(){
        if(!this.startdate){
          alert('请输入开始日期');
          return;
        }
        if(!this.enddate){
          alert('请输入结束日期');
          return;
        }
        this.activebt = 4;
        this.total = 0;
        this.current = 1;
        this.getdate(this.startdate,this.enddate,1);
      },
      getdate:function(startdate,enddate,page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_declaration/?page='+page,
          params:{
            get_type:'search',
            start_time:startdate,
            stop_time:enddate
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.declaration_list;
          this.total = res.body.page_info.count;
        }
      }, res => {

        })
      },
      reloadthis:function(){
        this.crtpg = '1';
        this.activebt = -1;
        this.startdate = '';
        this.enddate = '';
        this.total = 0;
        this.current = 1;
        this.status = '-1';
        this.getdetail('1');
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
      searchstatusm:function(mstatus,page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_declaration/',//120.76.137.157:8887
          params:{
            status:mstatus,
            page:page
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.declaration_list;
          this.total = res.body.page_info.count;
        }
      }, res => {
          this.msg = '网络链接失败,请稍后再试';
          this.show = true;
        })
      },
      searchstatus:function(val){
        this.startdate = '';
        this.enddate = '';
        this.activebt = val;
        if(val == -1){
          this.getdetail('1')
        }else if(val == '0'){
          this.searchstatusm('0','1')
        }else if(val == '1'){
          this.searchstatusm('1','1')
        }
      },
      cancelcu:function(){
        this.getmoney = '';
        this.isshowpsd = false;
        this.statustext = '';
        this.psdclk = ['','','','','',''];
        this.dialog = false;

      }
     /* open:function(tbm){
        this.dialog = true;
        this.getmoney = tbm.all;
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



      }*/,
      handleClick:function(newIndex){
        if(this.activebt == -1){
          this.getdetail(newIndex)
        }else if(this.activebt == '0'){
          this.searchstatusm('0',newIndex)
        }else if(this.activebt == '1'){
          this.searchstatusm('1',newIndex)
        }else if(this.activebt == '4'){
          this.getdate(this.startdate,this.enddate,newIndex);
        }else{
          this.getdetail(newIndex);
        }
        this.crtpg = newIndex;
      },
      getdetail:function(page){
        this.$http({
          method:'get',
          url:'http://120.76.137.157:8887/work/get_declaration/?page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.declaration_list;
          this.total = res.body.page_info.count;
        }
      }, res => {
          this.msg = '网络链接失败,请稍后再试';
          this.show = true;
        })
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'get',
        url:'http://120.76.137.157:8887/work/get_declaration/?page=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
         if(res.body.status == '200'){
            this.tbmsg = res.body.declaration_list;
            this.total = res.body.page_info.count;
         }
      }, res => {

      });

    },
    mounted:function(){
      this.$http({
        method:'get',
        url:'http://211.149.214.8:8081/common/getprice'
      }).then( res => {
        this.bddis = false;
        this.minnum = Math.ceil(1000/res.body.gcb_price);
        this.bdcolor = 'green';
        this.hlprice = res.body.gcb_price;
      }, res => {
        this.bddis = true;
        this.bdcolor = 'gray';
        this.minnum = '0';
        this.msg = '获取汇率失败，请刷新页面';
        this.show = true;
      });

    }
  }
</script>
<style scoped>
  .vrts{
    margin-bottom:10px;
  }
  .loadmr22{
    margin-top:10px;
  }
  .btmar1{
    margin-top:8px;
  }
  .income-status{
    width:256px;
    margin-left:80px;
  }
  .errormsg{
    height:21px;
    color:red;
    line-height:21px;
    margin-top:10px;
  }
  .mr44{
    margin-right:44px;
    margin-top:54px !important;
  }
  .custormbox{
    width:400px;
    height:200px;
    background:#fcfcfc;
    border:1px solid #ccc;
    position:absolute;
    top:50%;
    left:0;
    left:50%;
    bottom:0;
    margin-left:-200px;
    margin-top:-100px;
  }
  .custormbtn{
    width:100%;
    overflow:hidden;
    text-align:center;
    padding-left:160px;
  }
  .vr9-title{
    width:100%;
    height:40px;
    background:#333;
    margin-bottom:10px;
    color:#fff;
    line-height:40px;
    font-size:17px;
    position:relative;
  }
  .vr9-title .l{
    width:150px;
    position:absolute;
    height:40px;
    left:50%;
    margin-left:-75px;
  }
  .vr9-title .r{
    cursor:pointer;
    width:30px;
  }
  .vr9number{
    width:100%;
    height:30px;
    line-height:30px;
  }
  .vr9number div{
    height:100%;
  }
  .vr9number div:nth-child(1){
    width:152px;
    text-align:right;
  }
  .vr9number div:nth-child(2){
    width:170px;
    text-align:right;
    margin-right:8px;
  }
  .vr9input{
    width:100%;
    height:100%;
    outline:none;
  }
  #custormsrecord{
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
  .custorms-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .custorms-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .custorms-status .mu-select-field{
    top:11px;
  }
  .custorms-tb{
    width:100%;
    padding:0 44px;
    overflow:hidden;
  }
  .custorms-th{
    font-size:16px;
  }
  .custorms-td{
    font-size:14px;
  }
  .custorms-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .custorms-paging-box{
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
  .custorms-button{
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
