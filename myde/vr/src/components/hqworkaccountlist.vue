<template>
  <div id="hqworkaccountall">
    <div class="acctb">
      <div class="header">工作室列表</div>
      <div class="workaccount-search">
        <div class="">
          <mu-text-field label="关键字" hintText="工作室名称，交易宝账号" labelFloat v-model="search" labelClass="workaccount-sarch-label"/>
        </div>
        <mu-raised-button label="查询" class="workaccount-button" :backgroundColor="bgcolor" @click = 'searchword'/>
        <mu-raised-button label="刷新" class="workaccount-button" :backgroundColor="bgcolor" @click="reloadthis"/>
        <mu-raised-button label="导出为报表" class="workaccount-button" :backgroundColor="bgcolor" @click="getexcel"/>
        <div class="income-status">
          <mu-select-field v-model="status" label="账号状态" labelClass="search-title"  labelFocusClass="search-focus" @change="searchstatus">
            <mu-menu-item v-for="text,index in list" :key="index" :value="String(index)" :title="text" />
          </mu-select-field>
        </div>
      </div>
      <div class="workaccount-tb" v-show="!showdetail">
        <mu-table :showCheckbox="isshow" class="workaccount-tbe">
          <mu-thead>
            <mu-tr>
              <mu-th class="workaccount-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(tbm,index) in tbmsg" :key="index" :class="{redmark:!tbm.is_active}">
              <mu-td>{{tbm.work_name}}</mu-td>
              <mu-td>{{tbm.wallet_mobile}}</mu-td>
              <mu-td>{{tbm.mobile}}</mu-td>
              <mu-td>{{tbm.name}}</mu-td>
              <mu-td>{{tbm.work_count}}</mu-td>
              <!--<mu-td v-if='tbm.work_type == 1'>省分支</mu-td>
              <mu-td v-if='tbm.work_type == 2'>市分支</mu-td>
              <mu-td v-if='tbm.work_type == 3'>区/县分支</mu-td>-->
              <mu-td>{{JSON.parse(tbm.work_address.replace(/'/g,'"')).province+JSON.parse(tbm.work_address.replace(/'/g,'"')).city+ JSON.parse(tbm.work_address.replace(/'/g,'"')).area}}</mu-td>
              <mu-td>{{tbm.add_type == '1' ? '自行申请' : '管理员注册'}}</mu-td>
              <mu-td v-if='tbm.status == 2'>
                未激活
              </mu-td>
              <mu-td v-if='tbm.status == 4'>
                <!--<button class="bt" @click="thisdetail(tbm)">详情</button>-->
                <button class="bt" @click="opendetail(tbm)" :class="{redmark:!tbm.is_active}">查看业绩</button>
                <button v-if="tbm.is_active" class="bt" @click="pass(tbm)">冻结</button>
                <button v-if="!tbm.is_active" :class="{redmark:!tbm.is_active}" class="bt" @click="rebut(tbm)">解冻</button>
              </mu-td>
              <mu-td v-if="tbm.status == 4">
                <mu-flat-button :label="accountlabel" @click="open(tbm)" class="disla" :color="tbm.is_active ? '#337ab7' : 'red'"/>
              </mu-td>
              <mu-td v-if="tbm.status == 2">
                无法操作
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <div class="workaccount-paging1" v-if="total > 10">
          <div class="showlists">总共{{total}}条记录，当前为第{{crtpg}}页，显示第{{(crtpg - 1) * 10+ 1}}条到第{{crtpg * 10 > total ? total : crtpg * 10}}条记录</div>
          <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="workaccount-paging-box" :showSizeChanger="showSizeChanger">
          </mu-pagination>
        </div>
      </div>

    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
    <mu-dialog :open="gopass" title="温馨提示">
      {{passmsg}}
      <mu-flat-button label="取消" slot="actions" primary @click="passclose"/>
      <mu-flat-button label="确定" slot="actions" primary @click="closepass"/>
    </mu-dialog>
    <div class="custormbox" v-if="custorm">
      <div class="vr9-title">
        <div class=" l">
          更换{{myworkname}}工作室管理员
        </div>
        <div class="r" @click.stop="goout">
          X
        </div>
      </div>
      <div class="vr9number">
        <div class="l">更换后账号：</div>
        <div class="l">
          <input type="number" class="l vr9input" v-model="accountid">
        </div>
      </div>
      <div class="custormbtn">
        <mu-raised-button label="确定更改" class="custorm-bt l loadmr" :backgroundColor="bgcolor" @click="setcustorm" :disabled="disb"/>
      </div>
    </div>
    <!--会员详情-->
    <div class="detail" v-if="showdetail">
      <div class="header">工作室业绩</div>
      <div class="dtback">
        <mu-raised-button label="返回" class="r" :backgroundColor="bgcolor" @click="getback"/>
      </div>
      <div class="addworkaccount_box l">
        <mu-table :showCheckbox="isshow" class="member-tbe">
          <mu-thead>
            <mu-tr>
              <mu-th class="member-th" v-for='(title,index) in otbtitle' :key="index">{{title}}</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(tbm,index) in otbmsg" :key="index">
              <mu-td class="dfhandle-td">{{tbm.user_info.work_name}}</mu-td>
              <mu-td class="dfhandle-td">{{tbm.user_info.wallet_mobile}}</mu-td>
              <mu-td class="dfhandle-td">{{JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).province + JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).city + JSON.parse(tbm.user_info.work_address.replace(/'/g,'"')).area}}</mu-td>
              <mu-td class="dfhandle-td">{{tbm.status == 0 ? '未拨币' : '已拨币'}}</mu-td>
              <mu-td>{{tbm.date}}</mu-td>
              <mu-td>{{tbm.change_date}}</mu-td>
              <mu-td class="dfhandle-td">{{tbm.vr9_count}}</mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <div class="workaccount-paging1" v-if="dtotal > 10">
          <div class="showlists">总共{{dtotal}}条记录，当前为第{{dcrtpg}}页，显示第{{(dcrtpg - 1) * 10+ 1}}条到第{{dcrtpg * 10 > dtotal ? dtotal : dcrtpg * 10}}条记录</div>
          <mu-pagination :total="dtotal" :current="dcurrent" @pageChange="dhandleClick" class="workaccount-paging-box">
          </mu-pagination>
        </div>
      </div>
    </div>
    <!--会员详情-->
  </div>
</template>
<script>
  export default{
    name:'hqworkaccountlist',
    data(){
      return{
        showSizeChanger:false,
        status:'0',
        bgcolor:'#337ab7',
        isshow:false,
        total:0,
        current:1,
        search:'',
        list:['全部','未冻结','已冻结','未激活'],
        showdetail:false,
        tbtitle:['工作室名称','交易宝账号','申请人手机号','申请人姓名','工作室人数','工作室地址','注册来源','管理','操作'],
        tbmsg:[
        ],
        myname:'haha',
        show:false,
        msg:'',
        islock:false,
        myindex:1,
        labeltext:'锁定',
        suss:false,
        myid:'',
        activebt:0,
        type:'',
        gopass:false,
        passmsg:'',
        email:'',
        wechat:'',
        qq:'',
        custorm:false,
        disb:false,
        accountid:'',
        otbtitle:['工作室名称','收币交易宝账号','工作室地址','状态','报单时间','处理时间','拨币数量（个）'],
        dtotal:0,
        dcurrent:1,
        otbmsg:[],
        accountlabel:'更改管理员',
        myworkname:'',
        detailid:'',
        crtpg:'1',
        dcrtpg:'1'
      }
    },
    methods:{
      getexcel:function(){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/export_works/',
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
      getback:function(){
        this.showdetail = false;
      },
      opendetail:function(tbm){
        this.dcrtpg = '1';
        this.detailid = tbm.id;
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/work_declaration/',
          params:{
            user_id:tbm.id
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {

        if(res.body.status == '200'){
          this.otbmsg = res.body.declaration_list;
          this.dtotal = res.body.page_info.count;
          if(res.body.declaration_list.length < 1){
            this.msg = '当前工作室没有业绩信息';
            this.show = true;
          }else{
            this.showdetail = true;
          }
        }else{
          this.msg = res.body.msg;
          this.show = true;
        }

      }, res => {
          this.msg = '网络链接失败';
          this.show = true;
        })
      },
      open:function(tbm){
        this.myworkname = tbm.work_name;
        this.accountid = tbm.wallet_mobile;
        this.myid = tbm.id;
        this.custorm = true;
      },
      goout:function(){
        this.custorm = false;
        this.accountid = '';
      },
      setcustorm:function(){
        let data = {
          wallet_mobile:this.accountid,
          user_id:this.myid
        }
        this.$http({
          method:'put',
          url:'http://120.76.137.157:8887/work_admin/change_work_wallet/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          this.goout();
          this.msg = res.body.msg;
          this.show = true;
          if(res.body.status == '201'){
            this.suss = true;
          }
      }, res => {
          this.show = true;
          this.msg = '网络链接失败';
        })
      },
     /* lockme:function(){
        if(this.islock){
          let data = {
            user_id:this.myid,
            type:'1',
          }
          this.$http({
            method:'post',
            url:'http://120.76.137.157:8887/work_admin/user_active/',
            body:data,
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          }).then( res => {
            this.show = true;
          this.msg = res.body.msg;
          if(res.body.status == '200'){
            if(this.activebt == '1'){
              this.getactive('24',1);
            }else if(this.activebt == '2'){
              this.getactive('1',1)
            }else if(this.activebt == '4'){
              this.getworld(this.search);
            }else{
              this.getdetail(this.myindex);
            }
            this.suss = true;
          }
        }, res => {
            this.show = true;
            this.msg = '网络链接失败';
          })

        }else{
          let data = {
            user_id:this.myid,
            type:'24',
          }
          this.$http({
            method:'post',
            url:'http://120.76.137.157:8887/work_admin/user_active/',
            body:data,
            headers:{
              'Authorization':sessionStorage.getItem('token')
            }
          }).then( res => {
            if(res.body.status == '200'){
            if(this.activebt == '1'){
              this.getactive('24',1);
            }else if(this.activebt == '2'){
              this.getactive('1',1)
            }else if(this.activebt == '4'){
              this.getworld(this.search);
            }else{
              this.getdetail(this.myindex);
            }
            this.suss = true;
          }
          this.show = true;
          this.msg = res.body.msg;
        }, res => {
            this.show = true;
            this.msg = '网络链接失败';
          })
        }
      },*/
      passclose:function(){
        this.gopass = false;
        this.myid = '';
        this.passmsg = '';
        this.type = '';
      },
      closepass:function(){
        let data = {
          user_id:this.myid,
          set_type:this.type
        }
        this.$http({
          method:'put',
          url:'http://120.76.137.157:8887/work_admin/set_work/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          this.passclose();
          this.msg = res.body.msg;
          this.show = true;
        if(res.body.status == '201'){
          this.suss = true;
        }


      }, res => {
          this.show = true;
          this.msg = '网络链接失败';
        })

      },
      pass:function(tbm){
        this.passmsg = '确定冻结'+tbm.work_name+'工作室？';
        this.type = 'un_active';
        this.myid = tbm.id;
        this.gopass = true;
      },
      rebut:function(tbm){
        this.passmsg = '确定解冻'+tbm.work_name+'工作室?';
        this.type = 'active';
        this.myid = tbm.id;
        this.gopass = true;
      },
      thisdetail:function(tbm){
        this.msg = '';
        this.email = tbm.email;
        this.wechat = tbm.wechat;
        this.qq = tbm.qq;
        this.show = true;
      },
      searchword:function(){
        if(this.search === ''){
          this.show = true;
          this.msg = '请输入关键字';
          return;
        }
        this.activebt = 4;
        this.status = '';
        this.total = 0;
        this.current = 1;
        this.myindex = 1;
        this.getworld(this.search,'1');
      },
      getworld:function(data,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_all_user/',
          params:{
            get_type:'search',
            search_type:'24',
            word:data,
            page:page
          },
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
      getactive:function(type,page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_all_user/',
          params:{
            page:page,
            get_type:type
          },
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
      searchstatus:function(val){
        this.activebt = val;
        this.myindex = 1;
        if(val == 0){
          this.total = 0;
          this.current = 1;
          this.getdetail('1');
        }
        if(val == 1){
          this.total = 0;
          this.current = 1;
          this.getactive('6',1);
        }
        if(val == 2){
          this.total = 0;
          this.current = 1;
          this.getactive('5',1);
        }
        if(val == 3){
          this.total = 0;
          this.current = 1;
          this.getactive('2',1)
        }
      },
      close:function(){
        this.show = false;
        if(this.suss){
          this.reloadthis();
        }
      },
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_all_user/?page='+ page,
          params:{
            get_type:'24'
          },
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
        this.crtpg = '1';
        this.dcrtpg = '1';
        this.myindex = 1;
        this.status = 0;
        this.total = 0;
        this.search = '';
        this.current = 1;
        this.activebt = '0';
        this.getdetail('1');
      },
      handleClick:function(newIndex){
        if(this.activebt == 1){
          this.getactive('6',newIndex);
        }else if(this.activebt == 2){
          this.getactive('5',newIndex);
        }else if(this.activebt == '4'){
          this.getworld(this.search,newIndex);
        }else if(this.activebt == '3'){
          this.getactive('2',newIndex);
        }else{
          this.getdetail(newIndex);
        }
        this.myindex = newIndex;
        this.crtpg = newIndex;
      },
      dhandleClick:function(newIndex){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/work_declaration/',
          params:{
            user_id:this.detailid,
            page:newIndex
          },
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {

          if(res.body.status == '200'){
          this.otbmsg = res.body.declaration_list;
          this.dtotal = res.body.page_info.count;
          if(res.body.declaration_list.length < 1){
            this.msg = '当前工作室没有业绩信息';
            this.show = true;
          }else{
            this.dcrtpg = newIndex;
            this.showdetail = true;
          }
        }else{
          this.msg = res.body.msg;
          this.show = true;
        }

      }, res => {
          this.msg = '网络链接失败';
          this.show = true;
        })
      },
      /*showdt:function(tbm){
       this.suss = false;
       this.showdetail = true;
       this.myid = tbm.id;
       this.demodata[0] = tbm.username;
       this.demodata[1] = tbm.password;
       this.demodata[3] = tbm.mobile
       this.demodata[4] = tbm.work_name
       this.demodata[5] = tbm.wallet_account;
       this.mystyle = String(tbm.work_type - 1);
       this.game1 = JSON.parse(tbm.work_address.replace(/'/g,'"')).province;
       this.game2 = JSON.parse(tbm.work_address.replace(/'/g,'"')).city;
       this.game3 = JSON.parse(tbm.work_address.replace(/'/g,'"')).area;
       this.demodata[8] = tbm.detail_address;
       this.demodata[9] = tbm.id_card;
       if(tbm.is_active){
       this.islock = true;
       this.labeltext = '锁定';
       }else{
       this.islock = false;
       this.labeltext = '解锁';
       }
       },*/
      resetme:function(){
        this.showdetail = false;
      },
      getimg:function(event,names){
        if(event.currentTarget.files[0]) {
          var file = event.currentTarget.files[0], url = null, name = file.name;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          this[names] = url;
        }
      }
    },
    beforeCreate:function(){
      this.$http({
        method:'GET',
        url:'http://120.76.137.157:8887/work_admin/get_all_user/?page=1',
        params:{
          get_type:'24'
        },
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
      this.listp = ['四川','北京','重庆']
    }
  }
</script>
<style scoped>
  .redmark{
    color:red !important;
  }
  .disla{
    white-space:nowrap !important;
  }
  .dtback{
    width:100%;
    overflow:hidden;
    padding:.5rem 2rem;
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
    margin-bottom:40px;
    text-align:center;
    color:#fff;
    line-height:40px;
    font-size:17px;
    position:relative;
  }
  .vr9-title .l{
    width:400px;
    text-align:center;
    position:absolute;
    left:50%;
    margin-left:-200px;
    height:100%;
  }
  .vr9-title .r{
    cursor:pointer;
    position:relative;
    right:0;
    z-index:1;
    height:100%;
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
    width:150px;
    text-align:right;
  }
  .vr9number div:nth-child(2){
    width:170px;
    text-align:right;
    margin-right:8px;
    border:1px solid #ccc;
  }
  .vr9input{
    width:100%;
    height:100%;
    outline:none;
  }
  .bt{
    background:transparent;
    color:#06c;
    border:none;
    cursor:pointer;
  }

  .income-status{
    width:150px;
    display:inline-block;
    margin-left:5rem;
  }
  .income-status .mu-select-field{
    top:11px;
  }
  #hqworkaccountall{
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
  .workaccount-search{
    width:100%;
    padding-left:2rem;
    text-align:left;
  }
  .workaccount-search div{
    width:256px;
    display:inline-block;
    padding-left:.2rem;
  }
  .workaccount-tb{
    width:100%;
    padding:0 44px;
    overflow:hidden;
  }
  .workaccount-th{
    font-size:16px;
  }
  .workaccount-td{
    font-size:14px;
  }
  .workaccount-paging{
    margin-top:12px;
    padding-right:44px;
  }
  .workaccount-paging-box{
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
    /*height:100%;*/
    overflow:hidden;
    background:#fcfcfc;
    left:0;
    top:0;
    z-index:3;
    padding-bottom:22px;
  }
  .detail .header{
  }

  /*注册页面的*/
  *{
    box-sizing:border-box;
  }
  img{
    display:block;
    border:0;
  }
  ul{
    float:right;
    list-style:none;
    width:93%;
    padding:0;
    margin:0;
  }
  .addworkaccount_box{
    overflow:hidden;
    padding:0 2rem 2rem 2rem;
  }
  .addworkaccount_demo{
    width:100%;
    overflow:hidden;
  }
  .line{
    height:1px;
    width:100%;
    background:#999999;
    box-shadow:0 0 1px rgba(0, 0, 0, .5);
    clear: both;
    margin-bottom:1rem;
  }
  .addworkaccount_left{
    text-align:right;
    min-width:13%;
    margin-right:1rem;
  }
  .addworkaccount_left,.addworkaccount_right{
    margin-bottom:1rem;
    height:1.3rem;
    line-height:1.3rem;
    overflow:auto;
    text-align:left;
  }
  .addworkaccount_right{
    width:50%;
    border:2px solid #888;
  }
  input{
    border:none;
    width:100%;
    height:100%;
    float:left;
    outline:none;
  }
  .addworkaccount_right:hover{
    border-color:deepskyblue;
  }
  .addworkaccount_img{
    width:80%;
    overflow:hidden;
    float:left;
    text-align:left;
    padding:.1rem;
  }
  .face_img_box{
    margin-top:.5rem;
    width:100%;
    overflow:hidden;
  }
  .face_img{
    width:45%;
    height:8rem;
    border:1px solid #ccc;
  }
  .face_img img{
    width:100%;
    height:100%;
  }
  .face_text{
    width:55%;
  }
  .face_text span{
    width:.4rem;
    height:.4rem;
    border-radius:50%;
    background:black;
    display:inline-block;
    margin-right:.2rem;
  }
  .filebutton{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  .regs_btn{
    margin-left:10%;
    margin-top:1rem;
    border-radius:.3rem;
    font-size:.8rem;
    transform:scale(1.1,.8);
  }
  .mar1{
    margin-top:.5rem;
  }
  .noborder{
    border:none !important;
    height:4rem;
    text-algin:left !important;
    margin-bottom:0 !important;
  }
  .choose{
    width:30% !important;
    margin:0 1%;
  }
  .marl0{
    margin-left:0 !important;
  }
  .col-text{
    font-size:.8rem;
    margin-left:1rem;
  }
  .rjst-btn{
    margin-top:2rem;
    width:12rem !important;
    border-radius:.5rem;
    display:block;
    margin-left:13%;
    transform:translateX(1rem);
  }
  .demobt{
    width:100%;
    overflow:hidden;
  }
  /*解决方案*/
</style>

