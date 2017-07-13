<template>
  <el-row id="delegatewait">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column label="政协类型">
        <template scope="scope">
          <el-tag type="primary" v-if="scope.row.cppcc_type == '1'">一般</el-tag>
          <el-tag type="warning" v-if="scope.row.cppcc_type != '1'">特殊</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
      </el-table-column>
      <el-table-column prop="name" label="联系邮箱">
      </el-table-column>
      <el-table-column prop="address" label="联系地址">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column label="内容">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchbook(scope.row.content)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="提交时间">
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
    <el-dialog title="内容详情" :visible.sync="dialogshow1" :close-on-click-modal="false" @close="diahidden1">
      <el-row :gutter="20" class="textl">
        <el-col class="textl">
          {{imglist1}}
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
  </el-row>
</template>
<script>
  export default{
    name:'delegatewait',
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
        delegateid:'',
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
        this.imglist1 = data;
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
        this.delegateid = id;
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
          url:'http://192.168.3.28:8000/admin_api/delegate/',
          body:{
            delegate_id:this.delegateid,
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
          this.delegateid = '';
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
          url:'http://192.168.3.28:8000/admin_api/delegate/',
          params:{
            page:page,
            type:'1'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.delegate_list;
          res.total = res.body.page_info.count;
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
  #delegatewait{
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
