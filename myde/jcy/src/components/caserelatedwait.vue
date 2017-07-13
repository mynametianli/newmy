<template>
  <el-row id="caserelatedwait">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="inquiry_name" label="查询人姓名">
      </el-table-column>
      <el-table-column prop="inquiry_number" label="查询人身份证">
      </el-table-column>
      <el-table-column label = '申请律师信息'>
        <template scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>&emsp;电话: {{ scope.row.user_info.mobile}}</p>
            <p>身份证: {{ scope.row.user_info.id_card }}</p>
            <p>律师证: {{ scope.row.user_info.law_card }}</p>
            <div slot="reference">
              <el-tag>{{ scope.row.user_info.name}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="related" label="与此案件关系">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column prop="suspect_name" label="嫌疑人姓名">
      </el-table-column>
      <el-table-column prop="suspect_number" label="嫌疑人身份证">
      </el-table-column>
      <el-table-column prop = 'add_date' label="提交时间">
      </el-table-column>
      <el-table-column label="相关材料">
        <template scope="scope">
          <el-button type="info" size='mini' @click="opendown(scope.row.material)">附件下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="warning" size='mini' @click="openmark(scope.row.id)">{{scope.row.status == 1 ? '处理' : ''}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="点击链接查看下载" :visible.sync="dialogshow" :close-on-click-modal="false" @close="diahidden">
      <p v-for="(img,index) in imglist"><a :href="img" target="_blank">{{img}}</a></p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diahidden">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogtitle1" :visible.sync="dialogshow1" :close-on-click-modal="false" @close="diahidden1">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(img,index) in imglist1" :key="index">
          <el-card>
            <img :src="img" class="image">
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diahidden1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="处理意见" :visible.sync="mark" :close-on-click-modal="false" @close="markhidden">
      <el-row>
        <textarea v-model="markmsg" class="markarea" placeholder="请输入处理意见"></textarea>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="markhidden">取 消</el-button>
        <el-button type="primary" @click="markenter">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="被查询项目及个人信息" :visible.sync="aboutit" :close-on-click-modal="false" @close="abouthidden" class="htwd">
      <el-row v-for="(items,index) in aboutitems" :key="index" class="textl bd1">
        <h2>项目{{index+1}}</h2>
        <h4>被举报项目信息</h4>
        <el-row>
          <p>项目简称：{{items.project_name}}</p>
          <p>招标单位：{{items.project_unit}}</p>
          <p>申请用途：{{items.project_use}}</p>
        </el-row>
        <h4>被举报个人信息</h4>
        <el-row :getter="10">
          <el-col :span="8" v-for="(item,inx) in items.user_info" :key="inx">
            <p>姓名：{{item.name}}</p>
            <p>证件类型：{{item.card_type}}</p>
            <p>证件号码：{{item.card_number}}</p>
          </el-col>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="abouthidden">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'caserelatedwait',
    data(){
      return{
        tableData: [],
        loading: false,
        imgtype:'',
        dialogshow:false,
        dialogtitle:'',
        imglist:[],
        dialogshow1:false,
        dialogtitle1:'',
        imglist1:[],
        mark:false,
        markmsg:'',
        caserelatedid:'',
        aboutit:false,
        aboutitems:[],
        total:0,
        crtpg:1
      }
    },
    methods:{
      handleCurrentChange(val){
        this.getmsg(val);
      },
      openabout(data){
        this.aboutitems = data;
        this.aboutit = true;
      },
      abouthidden(){
        this.aboutit = false;
        this.aboutitems = [];
      },
      watchbook(data){
        console.log(data);
        if(typeof data === 'string'){
          this.imglist1.push(data)
        }else{
          this.imglist1 = data;
        }
        this.dialogtitle1 = '单位三证查看';
        this.dialogshow1 = true;
      },
      diahidden1(){
        this.dialogshow1 = false;
        this.imglist1 = [];
      },
      opendown(url){
        this.imglist = url;
        this.dialogshow = true;
      },
      diahidden(){
        this.dialogshow = false;
        this.imglist = [];
      },
      openmark(id){
        this.caserelatedid = id;
        this.mark = true;
      },
      markhidden(){
        this.markmsg = '';
        this.mark = false;
      },
      markenter(){
        if(!this.markmsg){
          this.$message({
            type:'error',
            message:'请输入处理意见',
            duration:'1500'
          });
          return;
        }
        this.total = 0;
        this.$http({
          method:'PUT',
          url:'http://192.168.3.28:8000/admin_api/case_related/',
          body:{
            related_id:this.caserelatedid,
            result:this.markmsg
          }
        }).then(res => {
          if(res.body.status_code == '201'){
          this.$message({
            type:'success',
            message:res.body.msg,
            duration:'1500'
          });
          this.mark = false;
          this.caserelatedid = '';
          this.markmsg = '';
          this.getmsg(1);
          this.crtpg = 1;
        }else{
          this.$message({
            type:'error',
            message:res.body.msg,
            duration:'1500'
          })
        }
      },err => {
          this.$message({
            type:'error',
            message:'网络链接失败，请稍后再试',
            duration:'1500'
          })
        })
      },
      getmsg(page){
        this.loading = true;
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/case_related/',
          params:{
            page:page,
            type:'1'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.related_list;
          this.total = res.body.page_info.count;
        }
      },err => {
          this.loading = false;
        })
      }
    },
    created(){
      this.getmsg(1);
    }
  }
</script>
<style scoped>
  #caserelatedwait{
    background:#fff;
    padding:.5rem;
  }
  img{
    width:100%;
  }
  .markarea{
    width:calc(100% - 1rem);
    height:10rem;
    padding:.5rem;
    resize:none;
    border:2px solid #ccc;
    box-shadow:0 0 5px 0 rgba(0,0,0,.2);
    outline:none;
  }
  .textl{
    text-align:left;
  }
  .textr{
    text-align:right;
  }
  .bd1{
    border:1px solid #ccc;
    padding:.5rem;
    margin-top:.5rem;
  }

</style>
<style>
  .htwd{
    height:100%;
    overflow:hidden;
  }
  .htwd .el-dialog{
    max-height:80%;
    overflow-y:auto;
  }

</style>
