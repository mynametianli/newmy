<template>
  <el-row id="warningpass">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="unit" label="单位">
      </el-table-column>
      <el-table-column prop="reserve_date" label="预约时间">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="date" label="提交时间">
      </el-table-column>
      <el-table-column label="预约内容">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchbook(scope.row.content)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="change_date" label="处理时间">
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
  </el-row>
</template>
<script>
  export default{
    name:'warningpass',
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
        aboutit:false,
        aboutitems:[],
        total:1,
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
        this.dialogtitle1 = '内容详情';
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
      getmsg(page){
        this.loading = true;
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/warning/',
          params:{
            page:page,
            type:'2'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.warning_list;
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
  #warningpass{
    background:#fff;
    padding:.5rem;
  }
  img{
    width:100%;
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
