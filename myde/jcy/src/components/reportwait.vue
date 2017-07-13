<template>
  <el-row id="reportwait">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="address" label="联系地址">
      </el-table-column>
      <el-table-column prop="add_date" label="举报时间">
      </el-table-column>
      <el-table-column prop="been_name" label="被举报者姓名">
      </el-table-column>
      <el-table-column prop="been_sex" label="被举报者性别">
      </el-table-column>
      <el-table-column prop="been_unit" label="被举报者单位">
      </el-table-column>
      <el-table-column prop="been_resign" label="被举报者职务">
      </el-table-column>
      <el-table-column prop="been_address" label="被举报者地址">
      </el-table-column>
      <el-table-column prop="been_phone" label="被举报者电话">
      </el-table-column>
      <el-table-column prop="been_desc" label="举报内容">
      </el-table-column>
      <el-table-column label="举报附件">
        <template scope="scope">
          <el-button type="info" size='mini' @click="opendown(scope.row.been_annexes)">附件下载</el-button>
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
    name:'reportwait',
    data(){
      return{
        tableData: [],
        loading: false,
        imgtype:'',
        dialogshow:false,
        dialogtitle:'',
        imglist:[],
        mark:false,
        markmsg:'',
        reportid:'',
        total:0,
        crtpg:1
      }
    },
    methods:{
      opendown(url){
        this.imglist = url;
        this.dialogshow = true;
      },
      diahidden(){
        this.dialogshow = false;
        this.imglist = [];
      },
      openmark(id){
        this.reportid = id;
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
          url:'http://192.168.3.28:8000/admin_api/report/',
          body:{
            report_id:this.reportid,
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
          this.reportid = '';
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
          url:'http://192.168.3.28:8000/admin_api/report/',
          params:{
            page:page,
            type:'1'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.report_list;
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
  #reportwait{
    box-sizing:border-box;
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

</style>
