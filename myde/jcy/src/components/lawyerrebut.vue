<template>
  <el-row id="lawyerrebut">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话">
      </el-table-column>
      <el-table-column prop="id_card" label="身份证">
      </el-table-column>
      <el-table-column prop="join_date" label="申请日期">
      </el-table-column>
      <el-table-column prop="last_login" label="最近登录日期">
      </el-table-column>
      <el-table-column prop="law_card" label="律师证号码">
      </el-table-column>
      <!--<el-table-column label="状态">
        <template scope="scope">
          <el-tag type="warning">{{scope.row.is_review == 3 ? '审核已驳回' : ''}}</el-tag>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
  export default{
    name:'lawyerrebut',
    data(){
      return{
        tableData: [],
        loading: false,
        total:0,
        crtpg:1
      }
    },
    methods:{
      handleCurrentChange(val){
        this.getmsg(val)
      },
      getmsg(page){
        this.loading = true;
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/lawyer/',
          params:{
            page:page,
            review:'3'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.user_list;
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
  #lawyerrebut{
    background:#fff;
    padding:.5rem;
  }
</style>
