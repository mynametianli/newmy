<template>
  <el-row id="reportpass">
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
      <el-table-column prop="change_date" label="处理时间">
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
      <el-table-column prop="result" label="处理意见">
      </el-table-column>
      <!--<el-table-column label="状态">
        <template scope="scope">
          <el-tag type="primary">{{scope.row.status == 2 ? '已处理' : ''}}</el-tag>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="点击链接下载" :visible.sync="dialogshow" :close-on-click-modal="false" @close="diahidden">
      <p v-for="(img,index) in imglist"><a :href="img" target="_blank">{{img}}</a></p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diahidden">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'reportpass',
    data(){
      return{
        tableData: [],
        loading: false,
        imgtype:'',
        dialogshow:false,
        dialogtitle:'',
        imglist:[],
        total:0,
        crtpg:1
      }
    },
    methods:{
      handleCurrentChange(val){
        this.getmsg(val)
      },
      opendown(url){
        this.imglist = url;
        this.dialogshow = true;
      },
      diahidden(){
        this.dialogshow = false;
        this.imglist = [];
      },
      getmsg(page){
        this.loading = true;
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/report/',
          params:{
            page:page,
            type:'2'
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
  #reportpass{
    background:#fff;
    padding:.5rem;
  }
  img{
    width:100%;
  }
</style>
