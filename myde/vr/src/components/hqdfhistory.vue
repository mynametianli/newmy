<template>
  <div id="hqdfhistory">
    <div class="header">工作室报单历史</div>
    <div class="dfhistory-search">
      <div class="">
        <div class="l smallwd">
        <mu-text-field label="关键字" hintText="工作室名、交易宝账号、地区" labelFloat v-model="word" labelClass="member-sarch-label"/>
        </div>
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="报单开始日期" :maxDate="enddate" labelClass="search-title" v-model="startdate" class="l btmar smallwidth"/>
        <mu-date-picker mode="landscape" hintText="请选择" icon="today" label="报单结束日期" :minDate="startdate"  labelClass="search-title" v-model="enddate" class="l btmar smallwidth"/>
        <mu-raised-button label="查询" class="dfhistory-button l loadmr" :backgroundColor="bgcolor" @click="searchdate"/>
        <mu-raised-button label="导出为报表" class="dfhistory-button l loadmr" :backgroundColor="bgcolor" @click="getexcel"/>
        <mu-raised-button label="刷新" class="dfhistory-button l loadmr" :backgroundColor="bgcolor" @click="reloadthis"/>
      </div>
    </div>
    <div class="dfhistory-tb">
      <mu-table :showCheckbox="isshow" class="dfhistory-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="dfhistory-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td class="dfhandle-td">{{tbm.user_info.work_name}}</mu-td>
            <mu-td class="dfhandle-td">{{tbm.mobile}}</mu-td>
            <mu-td class="dfhandle-td">{{JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).province + JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).city + JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).area}}</mu-td>
            <mu-td class="dfhandle-td">{{tbm.status == 0 ? '未拨币' : '已拨币'}}</mu-td>
            <mu-td>{{tbm.date}}</mu-td>
            <mu-td>{{tbm.change_date}}</mu-td>
            <mu-td class="dfhandle-td">{{tbm.vr9_count}}</mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="dfhistory-paging" v-if="total > 10">
      <div class="showlists">总共{{total}}条记录，当前为第{{crtpg}}页，显示第{{(crtpg - 1) * 10+ 1}}条到第{{crtpg * 10 > total ? total : crtpg * 10}}条记录</div>
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="dfhistory-paging-box">
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
<script>  export default{
    name:'hqdfhistory',
    data(){
      return{
        startdate:'',
        enddate:'',
        bgcolor:'#337ab7',
        isshow:false,
        total:0,
        current:1,
        size:10,
        activebt:0,
        tbtitle:['工作室名称','收币交易宝账号','工作室地址','状态','报单时间','处理时间','拨币数量（个）'],
        tbmsg:[],
        word:'',
        show:false,
        msg:'',
        crtpg:'1'
      }
    },
    methods:{
      getexcel:function(){

        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/export_report/',
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          window.open(res.body.path)
        }else{
          this.msg = res.body.msg;
          this.show = true;
        }

      }, res => {
          this.msg = '网络链接失败,请稍后再试';
          this.show = true;
        })
      },
      getchildlocation:function(){
        this.$emit('getchildlocation',this.$route.path);
      },
      close:function(){
        this.show = false;
      },
      searchdate:function(){
        if(!this.startdate && !this.enddate && !this.word){
          this.reloadthis();
          return;
        }
        if((this.startdate && !this.enddate) || (!this.startdate && this.enddate)){
          this.msg = '日期选择不完整';
          this.show = true;
          return;
        }
        this.total = 0;
        this.current = 1;
        this.activebt = 4;
        if(this.word && !this.startdate && !this.enddate){
          this.getword(this.word,1)
        }
        if(!this.word && this.startdate && this.enddate){
          this.getdate(this.startdate,this.enddate,1);
        }
        if(this.word && this.startdate && this.enddate){
          this.getall(this.word,this.startdate,this.enddate,1)
        }
      },
      getword:function(word,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_declaration/?type=1&page='+page,
          params:{
            get_type:'search',
            word:word
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.declaration_list;
          this.total = res.body.page_info.count;
        }else{
          this.tbmsg = [];
        }
      }, res => {

        })
      },
      getall:function(word,startdate,enddate,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_declaration/?type=1&page='+page,
          params:{
            get_type:'search',
            word:word,
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
        }else{
          this.tbmsg = [];
        }
      }, res => {

        })
      },
      getdate:function(startdate,enddate,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_declaration/?type=1&page='+page,
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
        }else{
          this.tbmsg = [];
        }
      }, res => {

        })
      },
      reloadthis:function(){
        this.crtpg = '1';
        this.activebt = 0;
        this.startdate = '';
        this.enddate = '';
        this.word = '';
        this.total = 0;
        this.current = 1;
        this.getdetail('1');
      },
      handleClick:function(newIndex){
        if(this.activebt == '4'){
          if(this.word && !this.startdate && !this.enddate){
            this.getword(this.word,newIndex)
          }
          if(!this.word && this.startdate && this.enddate){
            this.getdate(this.startdate,this.enddate,newIndex);
          }
          if(this.word && this.startdate && this.enddate){
            this.getall(this.word,this.startdate,this.enddate,newIndex)
          }
        }else{
          this.getdetail(newIndex);
        }
        this.crtpg = newIndex;
      },
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_declaration/?type=1&page='+page,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          if(res.body.status == '200'){
          this.tbmsg = res.body.declaration_list;
          this.total = res.body.page_info.count;
        }else{
          this.tbmsg = [];
        }
      }, res => {

        })
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'GET',
        url:'http://120.76.137.157:8887/work_admin/get_declaration/?page=1&type=1',
        headers:{
          'Authorization':sessionStorage.getItem('token')
        }
      }).then( res => {
        if(res.body.status == '200'){
        this.tbmsg = res.body.declaration_list;
        this.total = res.body.page_info.count;
      }else{
        this.tbmsg = [];
      }
    }, res => {

      })
    },
    mounted:function(){
      this.getchildlocation();
    }
  }
</script>
<style scoped>
  .smallwd{
    width:225px;
    margin-top:11px;
    margin-left:5px;
  }
  .smallwidth{
    width:180px;
  }
  #hqdfhistory{
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
  .dfhistory-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .dfhistory-status{
    width:150px;
    display:inline-block;
    margin-left:22px;
  }
  .dfhistory-status .mu-select-field{
    top:11px;
  }
  .dfhistory-tb{
    width:100%;
    padding:0 22px 0 44px;
    overflow:hidden;
  }
  .dfhistory-th{
    font-size:16px;
  }
  .dfhistory-td{
    font-size:14px;
  }
  .dfhistory-paging{
    margin-top:12px;
    padding-right:44px;
    position:relative;
  }
  .dfhistory-paging-box{
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
  .dfhistory-button{
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
