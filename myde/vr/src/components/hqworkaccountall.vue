<template>
  <div id="hqworkaccountall">
    <div class="acctb">
    <div class="header">工作室审批</div>
    <div class="workaccount-search">
      <div class="">
        <mu-text-field label="关键字" hintText="工作室名，交易宝账号" labelFloat v-model="search" labelClass="workaccount-sarch-label"/>
      </div>
      <mu-raised-button label="查询" class="workaccount-button" :backgroundColor="bgcolor" @click = 'searchword'/>
      <mu-raised-button label="刷新" class="workaccount-button" :backgroundColor="bgcolor" @click="reloadthis"/>
      <!--<div class="income-status">
        <mu-select-field v-model="status" label="账号状态" labelClass="search-title"  labelFocusClass="search-focus" @change="searchstatus">
          <mu-menu-item v-for="text,index in list" :key="index" :value="String(index)" :title="text" />
        </mu-select-field>
      </div>-->
    </div>
    <div class="workaccount-tb">
      <mu-table :showCheckbox="isshow" class="workaccount-tbe">
        <mu-thead>
          <mu-tr>
            <mu-th class="workaccount-th" v-for='(title,index) in tbtitle' :key="index">{{title}}</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(tbm,index) in tbmsg" :key="index">
            <mu-td>{{tbm.work_name}}</mu-td>
            <mu-td>{{tbm.wallet_mobile}}</mu-td>
            <mu-td>{{tbm.mobile}}</mu-td>
            <mu-td>{{tbm.name}}</mu-td>
            <mu-td>{{tbm.work_scale}}</mu-td>
            <mu-td>{{tbm.join_date}}</mu-td>
            <mu-td>
              <button class="bt" @click="pass(tbm)">通过</button>
              <button class="bt" @click="rebut(tbm)">驳回</button>
              <button class="bt" @click="thisdetail(tbm)">详细信息</button>
              <!--<button class="bt" @click="startuse('w')">启用</button>
              <button class="bt" @click="forbiduse">禁用</button>
              <br/>
              <button class="bt" @click="upgrade">升级</button>
              <button class="bt" @click="degrade">降级</button>
              <button class="bt" @click="dissolve">解散</button>-->
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
    <div class="workaccount-paging" v-if="total > 10">
      <div class="showlists">总共{{total}}条记录，当前为第{{crtpg}}页，显示第{{(crtpg - 1) * 10+ 1}}条到第{{crtpg * 10 > total ? total : crtpg * 10}}条记录</div>
      <mu-pagination :total="total" :current="current" @pageChange="handleClick" class="workaccount-paging-box">
      </mu-pagination>
    </div>
    </div>
    <mu-dialog :open="show" title="温馨提示">
      {{msg}}<br/>
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
    <mu-dialog :open="gopass" title="温馨提示">
      {{passmsg}}
      <mu-flat-button label="取消" slot="actions" primary @click="passclose"/>
      <mu-flat-button label="确定" slot="actions" primary @click="closepass"/>
    </mu-dialog>
    <mu-dialog :open="detailshow" title="详细信息">
      <div class="dtdemo">
        <div class="dtl l">工作室地址:</div>
        <div class="dtr l">{{address}}</div>
      </div>
      <div class="dtdemo">
        <div class="dtl l">email:</div>
        <div class="dtr l">{{email}}</div>
      </div>
      <div class="dtdemo">
        <div class="dtl l">微信:</div>
        <div class="dtr l">{{wechat}}</div>
      </div>
      <div class="dtdemo">
        <div class="dtl l">QQ:</div>
        <div class="dtr l">{{qq}}</div>
      </div>
      <div class="dtdemo">
        <div class="dtl l">申请理由:</div>
        <div class="dtr l">{{reson}}</div>
      </div>
      <mu-flat-button label="确定" slot="actions" primary @click="detailclose"/>
    </mu-dialog>
    <!--<div class="detail" v-if="showdetail">
      <div class="header">编辑工作室账号</div>
      <div class="addworkaccount_box">
        <div class="addworkaccount_demo" v-for='(demo,index) in demoall'>
          <div class="addworkaccount_left l">{{demo}}：</div>
          <div class="addworkaccount_right l" v-show="index < 10 && index != 7 && index !=6">
            <input type="text" v-model="demodata[index]" readonly>
          </div>
          <div class="addworkaccount_right l noborder" v-show='index == 6'>
            <mu-select-field v-model="mystyle" label="请选择工作室类型" class="choose marl0" hintText="请选择" disabled>
              <mu-menu-item v-for="(text,index) in liststyles" :key="text.id" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />
            </mu-select-field>
          </div>
          <div class="addworkaccount_right l noborder" v-show='index == 7'>
            <mu-select-field v-model="game1" label="请选择省份" class="choose marl0" hintText="请选择" disabled >
              &lt;!&ndash;<mu-menu-item v-for="(text,index) in provincelist" :key="text.id" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />&ndash;&gt;
              <mu-menu-item :title="game1" :value="game1"></mu-menu-item>
            </mu-select-field>
            <mu-select-field v-model="game2" label="请选择城市" class="choose" hintText="请选择" disabled>
              &lt;!&ndash;<mu-menu-item v-for="(text,index) in citylist" :key="text.id" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />&ndash;&gt;
              <mu-menu-item :title="game2" :value="game2"></mu-menu-item>
            </mu-select-field>
            <mu-select-field v-model="game3" label="请选择区域" class="choose" hintText="请选择" disabled>
              &lt;!&ndash;<mu-menu-item v-for="(text,index) in arealist" :key="text.id" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />&ndash;&gt;
              <mu-menu-item :title="game3" :value="game3"></mu-menu-item>
            </mu-select-field>
          </div>
          <div class="line" v-if="index == 3 || index == 7"></div>
          &lt;!&ndash;<div class="addworkaccount_img" v-show="index >= 10">
            <div>请上传居民身份证正面图片</div>
            <div class="face_img_box">
              <div class="face_img l">
                <img :src="faceimg" alt="">
              </div>
              <div class="face_text r">
                <ul>
                  <li v-for="item in items"><span></span>{{item}}</li>
                </ul>
                <mu-raised-button label="点击上传" class="regs_btn">
                  <input type="file" class="filebutton" @change="getimg($event,'faceimg')">
                </mu-raised-button>
              </div>
            </div>
            <div class="mar1">请上传居民身份证背面图片</div>
            <div class="face_img_box">
              <div class="face_img l">
                <img :src="faceimgb" alt="">
              </div>
              <div class="face_text r">
                <ul>
                  <li v-for="item in items"><span></span>{{item}}</li>
                </ul>
                <div class="demobt">
                <mu-raised-button label="点击上传" class="regs_btn">
                  <input type="file" class="filebutton" @change="getimg($event,'faceimgb')">
                </mu-raised-button>
                </div>
              </div>
            </div>&ndash;&gt;
          </div>
        </div>
        <div>
        <mu-raised-button label="返回" class="rjst-btn l" backgroundColor="#a4c639" @click="resetme">
        </mu-raised-button>
        <mu-raised-button :label="labeltext" class="rjst-btn l" backgroundColor="#a4c639" @click="lockme">
        </mu-raised-button>
        </div>
      </div>

    </div>-->
   </div>
</template>
<script>
  export default{
    name:'workhqworkaccountall',
    data(){
      return{
        status:'0',
        bgcolor:'#337ab7',
        isshow:false,
        total:0,
        current:1,
        search:'',
        list:['全部','正常','锁定'],
        showdetail:false,
        tbtitle:['工作室名称','交易宝账号','手机号','申请人姓名','工作室人数','申请时间','管理'],
        tbmsg:[{work_name:'haha',wallet_mobile:'sad',name:'123',work_scale:'',join_date:''}],
        demoall:['工作室名','交易宝账号','手机号','申请人姓名','工作室人数','工作室地址','申请理由','管理'],
        demodata:['','','','','','','','',''],
        liststyles:['省分支','市分支','区/县分支'],
        mystyle:'',
        faceimg:'',
        faceimgb:'',
        myname:'haha',
        show:false,
        msg:'',
        game1:'',
        game2:"",
        game3:"",
        islock:false,
        myindex:1,
        labeltext:'锁定',
        suss:false,
        myid:'',
        activebt:0,
        items:[
          '要求姓名和身份证号清晰可见',
          '身份证信息只作为平台认证依据，不对外使用',
          '支持JPG,PNG,GIF图片格式',
          '建议上传尺寸640*435px',
          '图片大小不超过2M'
        ],
        type:'',
        gopass:false,
        passmsg:'',
        email:'',
        wechat:'',
        qq:'',
        detailshow:false,
        reson:'',
        address:'',
        crtpg:'1'
      }
    },
    methods:{
      detailclose:function(){
        this.email = '';
        this.wechat = '';
        this.qq = '';
        this.detailshow = false;
      },
      /*lockme:function(){
        if(this.islock){
          let data = {
            user_id:this.myid,
            type:'un_active',
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
              this.getactive('active',1);
            }else if(this.activebt == '2'){
              this.getactive('un_active',1)
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
            type:'active',
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
              this.getactive('active',1);
            }else if(this.activebt == '2'){
              this.getactive('un_active',1)
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
          url:'http://120.76.137.157:8887/work_admin/set_user/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
          }).then( res => {
          this.gopass = false;
            this.show = true;
          this.msg = res.body.msg;
          if(res.body.status == '201'){
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

      },
      pass:function(tbm){
        this.passmsg = '确定通过审核？';
        this.gopass = true;
        this.type = 'adopt';
        this.myid = tbm.id;
      },
      rebut:function(tbm){
        this.passmsg = '确定驳回申请?';
        this.gopass = true;
        this.type = 'reject';
        this.myid = tbm.id;
      },
      thisdetail:function(tbm){
        this.address = JSON.parse(tbm.work_address.replace(/'/g,'"')).province+JSON.parse(tbm.work_address.replace(/'/g,'"')).city+ JSON.parse(tbm.work_address.replace(/'/g,'"')).area;
        this.email = tbm.email;
        this.wechat = tbm.wechat;
        this.qq = tbm.qq;
        this.reson = tbm.reason;
        this.detailshow = true;
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
            search_type:'1',
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
          this.getactive('24',1);
        }
        if(val == 2){
          this.total = 0;
          this.current = 1;
          this.getactive('1',1);
        }
      },
      close:function(){
        this.show = false;
        if(this.suss){
          this.showdetail = false;
        }
      },
      getdetail:function(page){
        this.$http({
          method:'GET',
          url:'http://120.76.137.157:8887/work_admin/get_all_user/?page='+ page,
          params:{
            get_type:'1'
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
          this.getactive('24',newIndex);
        }else if(this.activebt == 2){
          this.getactive('1',newIndex);
        }else if(this.activebt == '4'){
          this.getworld(this.search,newIndex);
        }else{
          this.getdetail(newIndex);
        }
        this.myindex = newIndex;
        this.crtpg = newIndex;
      },
      closedetail:function(){
        this.showdetail = false;
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
      haha:function(){
        console.log(this.demodata)
      },
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
          get_type:'1'
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


  .dtdemo{
    width:100%;
    margin-bottom:5px;
    height:24px;
  }
  .dtl{
    width:100px;
    text-align:right;
    margin-right:10px;
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
    background:#f0f0f0;
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
    width:80%;
    overflow:hidden;
    padding:2rem;
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
<style>
  .search-title{
    font-size:20px;
  }
  .search-focus{
    color:red;
  }
  .workaccount-button{
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
  .workaccount-sarch-label{
    font-size:1.2rem !important;
  }
</style>
