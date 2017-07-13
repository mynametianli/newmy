<template>
  <el-row id="admin" class="bsz">
    <el-row class="headers">
        <el-col class="headerimg"><img src="/p_admin/static/img/jh.png" alt=""></el-col>
        <el-col class="headerlogo">历城区检察院后台管理系统</el-col>
        <el-col class="headerbutton"><el-button type="text" @click="goout">退出</el-button></el-col>
    </el-row>
    <el-row class="box">
      <el-col class="nav">
        <el-menu :default-active="selectsub" class="yes" :router="true" @select="gopath" :unique-opened="true">
          <el-submenu v-for="(menu,index) in emenu" :key="index" :index="String(index)">
              <template slot="title"><i :class="menu.icons"></i>{{menu.name}}</template>
              <el-menu-item-group>
                <el-menu-item v-for="(smenu,index) in menu.data" :key="index" :index="smenu.url">{{smenu.name}}</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col class="content bsz">
        <el-row class="childhd">
          {{myname}}
        </el-row>
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
  export default{
    name:'administrator',
    data(){
      return{
        myname:'',
        emenu1:[
          {name:'管理员设置',id:'12',icons:'el-icon-menu',data:[{name:'管理员列表',url:'/ad/admanagerlist'},{name:'增加管理员',url:'/ad/add'}]},
          {name:'密码设置',id:'11',icons:'el-icon-setting',data:[{name:'修改密码',url:'/ad/adamend'}]},
          {name:'阅卷预约处理',id:'1',icons:'el-icon-document',data:[{name:'未处理',url:'/ad/scoringwait'},{name:'已处理',url:'/ad/scoringpass'}]},
          {name:'警示教育预约处理',id:'9',icons:'el-icon-message',data:[{name:'未处理',url:'/ad/warningwait'},{name:'已处理',url:'/ad/warningpass'}]},
          {name:'预约会见处理',id:'2',icons:'el-icon-time',data:[{name:'未处理',url:'/ad/orderwait'},{name:'已处理',url:'/ad/orderpass'}]},
          {name:'案件进度(律师)',id:'3',icons:'el-icon-view',data:[{name:'未处理',url:'/ad/caselawyerwait'},{name:'已处理',url:'/ad/caselawyerpass'}]},
          {name:'案件进度(个人)',id:'3',icons:'el-icon-view',data:[{name:'未处理',url:'/ad/caserelatedwait'},{name:'已处理',url:'/ad/caserelatedpass'}]},
          {name:'行贿档案处理',id:'4',icons:'el-icon-document',data:[{name:'未处理',url:'/ad/bribewait'},{name:'已处理',url:'/ad/bribepass'}]},
          {name:'预约接访处理',id:'6',icons:'el-icon-date',data:[{name:'未处理',url:'/ad/visitwait'},{name:'已处理',url:'/ad/visitpass'}]},
          {name:'在线举报处理',id:'5',icons:'el-icon-warning',data:[{name:'未处理',url:'/ad/reportwait'},{name:'已处理',url:'/ad/reportpass'}]},
          {name:'联络平台处理',id:'7',icons:'el-icon-share',data:[{name:'未处理',url:'/ad/delegatewait'},{name:'已处理',url:'/ad/delegatepass'}]},
          {name:'律师审核',id:'10',icons:'el-icon-circle-check',data:[{name:'待审核',url:'/ad/lawyerwait'},{name:'已审核',url:'/ad/lawyerpass'},{name:'审核驳回',url:'/ad/lawyerrebut'}]},
          {name:'文章管理',id:'8',icons:'el-icon-edit',data:[{name:'文章列表',url:'/ad/articlelist'},{name:'添加文章',url:'/ad/articleadd'}]}
        ],
        emenu:[

        ],
        selectsub:'/ad/admanagerlist'
      }
    },
    methods:{
      gopath:function(path){
       /* if(path == '/ad/adamend'){
          this.myname = '修改密码';
        }
        if(path == '/ad/admanagerlist'){
          this.myname = '管理员列表';
        }
        if(path == '/ad/add'){
          this.myname = '新增管理员';
        }*/
      },
      goout:function(){
        this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method:'DELETE',
            url:'http://192.168.3.28:8000/admin_api/auth/'
          }).then( res => {
            if(res.body.status_code == '204'){
              this.$message({
                type: 'success',
                message: '退出登录成功!'
              });
              this.$router.push('/');
            }else{
              this.$message({
                type: 'error',
                message: res.body.msg
              });
            }
        },err => {
          this.$message({
            type: 'error',
            message: '网络链接失败，请稍后再试'
          });
        })

      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      }
    },
    created(){
      var nn = sessionStorage.getItem('permissions');
      if(nn == 'Superuser'){
        this.emenu = this.emenu1;
      }else{
        let arr = JSON.parse(nn);
        arr.push('11');
        for(var i in arr){
          for(var j in this.emenu1){
            if(arr[i] == this.emenu1[j].id){
              this.emenu.push(this.emenu1[j]);
            }
          }
        }
      }
      this.selectsub = this.$route.path;
    }
  }
</script>
<style scoped>
  #admin{
    width:100%;
    height:100%;
    background:#F9FAFC;
    padding:.5rem;
    overflow:auto;
  }
  .headers{
    width:100%;
    height:5rem;
    background:#475669;
    border-radius:.5rem .5rem 0 0;
    padding-left:2rem;
    overflow:hidden;
  }
  .headerimg{
    float:left;
    width:70px;
    height:100%;
  }
  .headerlogo{
    width:360px;
    float:left;
    height:100%;
    padding-left:.8rem;
    line-height:5rem;
    font-size:1.8rem;
    text-align:left;
    color:#fff;
  }
  .headerbutton{
    width:100px;
    float:right;
    height:100%;
    text-align:right;
    padding-right:2rem;
    line-height:5rem;
  }
  .box{
    height:calc(100% - 5rem);
  }
  .nav{
    background:#eef1f6;
    height:100%;
    width:220px;
    overflow:auto;
  }
  .nav::-webkit-scrollbar              { /* 1 */ width:5px;}
  .nav::-webkit-scrollbar-button       { /* 2 */ background:#eef1f6;}
  .nav::-webkit-scrollbar-track        { /* 3 */ background:#eef1f6;}
  .nav::-webkit-scrollbar-track-piece  { /* 4 */ background:#eef1f6;}
  .nav::-webkit-scrollbar-thumb        { /* 5 */ background:rgba(0,0,0,.2);border-radius:4px; height:10px}
  .nav::-webkit-scrollbar-corner       { /* 6 */ background:#eef1f6;}
  .nav::-webkit-resizer{background:#eef1f6;}
  .scrollbar-3dlight-color{}
  .scrollbar-highlight-color{}
  .scrollbar-face-color{
    background:yellow;
  }
  .content{
    background:#fff;
    height:100%;
    width:calc(100% - 220px);
    border:1rem solid #E5E9F2;
    border-top:none;
    overflow:auto;
  }
  .yes{
    font-size:3rem;
    height:100%;
  }
  .childhd{
    height:3rem;
    line-height:3rem;
    background:#E5E9F2;
    text-align:center;
    font-size:1rem;
    font-weight:bold;
  }
  img{
    width:4rem;
    display:block;
    border:none;
    padding:0;
    margin:0;
    margin-top:.5rem;
  }
</style>
