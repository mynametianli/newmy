<template>
  <el-row id="lawyerwait">
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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">通过审核</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
  export default{
    name:'lawyerwait',
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
      handleEdit(index,row){
        this.$confirm('是否通过审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.total = 0;
          this.$http({
          method:'PUT',
          url:'http://192.168.3.28:8000/admin_api/lawyer/',
          body:{
            user_id:row.id
          }
        }).then(res => {
          if(res.body.status_code == '201'){
            this.$message({
              type: 'success',
              message: res.body.msg,
              duration:'1000'
            });
            this.getmsg(1);
            this.crtpg = 1;
          }else{
          this.$message({
            type: 'error',
            message: res.body.msg,
            duration:'1000'
          });
        }
        }, err =>{

        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消操作',
          duration:'1000'
        });
      });
      },
      handleDelete(index,row){
        this.$confirm('是否驳回申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.total = 0;
          this.$http({
          method:'DELETE',
          url:'http://192.168.3.28:8000/admin_api/lawyer/',
          body:{
            user_id:row.id
          }
        }).then(res => {
          if(res.body.status_code == '204'){
            this.$message({
              type: 'success',
              message: res.body.msg,
              duration:'1000'
            });
          this.getmsg(1);
          this.crtpg = 1;
        }else{
          this.$message({
            type: 'error',
            message: res.body.msg,
            duration:'1000'
          });
        }
      }, err =>{

        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消操作',
          duration:'1000'
        });
      });
      },
      getmsg(page){
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/lawyer/',
          params:{
            page:page,
            review:'1'
          }
        }).then(res => {
          if(res.body.status_code == '200'){
          this.tableData = res.body.user_list;
          res.total = res.body.page_info.count;
        }
      },err => {

        })
      }
    },
    created(){
      this.getmsg(1);
    }
  }
</script>
<style scoped>
  #lawyerwait{
    background:#fff;
    padding:.5rem;
  }
</style>
