<template>
  <el-row id="managerlist">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column label="子账号">
        <template scope="scope">
              <el-tag type="gray">{{ scope.row.email }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="当前拥有权限">
        <template scope="scope" class="tagpp">
          <el-popover trigger="hover" placement="top" v-if="scope.row.permissions.length > 1">
            <el-tag class="tagmr" type="success" v-for="pm in scope.row.permissions" :key="pm.id">{{pm.desc}}</el-tag>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{scope.row.permissions.length == 2 ? scope.row.permissions[0].desc+'，'+scope.row.permissions[1].desc : scope.row.permissions[0].desc+'，'+scope.row.permissions[1].desc+'...'}}</el-tag>
            </div>
          </el-popover>
          <el-tag v-if="scope.row.permissions.length == 1">{{scope.row.permissions[0].desc}}</el-tag>
          <el-tag v-if="scope.row.permissions.length == 0">无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.join_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.last_login ? scope.row.last_login : '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">更改权限</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange" v-if="show">
      </el-pagination>
    </div>
    <el-dialog title="权限设置" :visible.sync="power" :close-on-click-modal="false">
      <el-checkbox-group v-model="permissions" class="mycheckboxall">
        <el-checkbox v-for="check in boxmsg" :label="check.id" :key="check.id" class="mycheckbox">{{check.name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="power = false">取 消</el-button>
        <el-button type="primary" @click="amendpw">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="是否删除管理员" :visible.sync="rm" class="ctdialog" :close-on-click-modal="false">
      <div slot="footer" class="dialog-footer">
        <el-button @click="rm = false">取 消</el-button>
        <el-button type="primary" @click="removepw">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'managerlist',
    data(){
      return{
          tableData: [],
          permissions:[],
          boxmsg:[
            {id:10,name:'律师审核'},
            {id:9,name:'警示教育预约处理'},
            {id:8,name:'文章管理'},
            {id:7,name:'联络平台处理'},
            {id:6,name:'预约接访处理'},
            {id:5,name:'在线举报处理'},
            {id:4,name:'行贿档案处理'},
            {id:3,name:'案件进度处理'},
            {id:2,name:'预约会见处理'},
            {id:1,name:'阅卷预约处理'}
          ],
          power:false,
          adminid:'',
          rm:false,
          loading:false,
          total:'1',
          crtpg: 1,
          show:true
        }
    },
    methods:{
      handleCurrentChange(val){
        this.getlist(val);
      },
      handleEdit(index, row) {
        this.permissions = [];
        this.adminid = row.id;
        if(row.permissions.length > 0){
          for(var  i in row.permissions){
            this.permissions.push(row.permissions[i].id);
          }
        }
        console.log(this.permissions);
        this.power = true;
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.adminid = row.id;
        this.removepw();
        //this.rm = true;
      },
      amendpw(){
        this.total = 0;
        this.$http({
          method:'POST',
          url:'http://192.168.3.28:8000/admin_api/permission/',
          body:{
            permissions: this.permissions.join(','),
            admin_id: this.adminid
          }
        }).then(res => {
          if(res.body.status_code == '200'){
            this.$message({
              type: 'success',
              message: '权限更改成功!',
              duration:'1000'
            });
             this.getlist(1);
             this.crtpg = 1;
             this.power = false;
          }else{
          this.$message({
            type: 'error',
            message: res.body.msg,
            duration:'1000'
          });
        }
      }, err => {

        })
      },
      removepw(){
        this.total = 0;
        /*this.$http({
          method:'DELETE',
          url:'http://192.168.3.28:8000/admin_api/admin_manager/',
          body:{
            admin_id: this.adminid
          }
        }).then(res => {
          if(res.body.status_code == '200'){
          this.rm = false;
        }
      }, err => {

        })*/
        this.$confirm('是否删除该管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
          method:'DELETE',
          url:'http://192.168.3.28:8000/admin_api/admin_manager/',
          body:{
            admin_id: this.adminid
          }
        }).then(res => {
          if(res.body.status_code == '200'){
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration:'1000'
          });
          this.getlist(1);
          this.crtpg = 1;
        }else{
          this.$message({
            type: 'error',
            message: '删除失败，请稍后再试!',
            duration:'1000'
          });
        }
      }, err => {

        })

      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除',
          duration:'1000'
        });
      });
      },
      getlist(page){
        this.loading = true;
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/admin_manager/',
          params:{
            page:page
          }
        }).then(res => {
          this.total = 0;
          this.loading = false;
          if(res.body.status_code == '200'){
            this.tableData = res.body.admin_list;
            this.total = res.body.page_info.count;
        }
      }, err => {
          this.loading = false;
        })
      }
    },
    created:function(){
      this.getlist(1);
    }
  }
</script>
<style scoped>
  #managerlist{
    background:#fff;
    padding:.5rem;
  }
  .mycheckbox{
    width:9rem;
    margin:20px;
  }
  .mycheckboxall{
    text-align:left;
  }
  .tagmr{
    margin:5px;
  }
  .tagpp{
    max-width:300px;
  }
</style>
<style>
  .mycheckbox{
    width:9rem;
    margin:20px;
  }
</style>
