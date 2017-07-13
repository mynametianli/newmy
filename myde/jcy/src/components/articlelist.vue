<template>
  <el-row id="articlelist">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="date" label="上传时间">
      </el-table-column>
      <el-table-column prop="read_count" label="阅读次数">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row.id)">查看文章</el-button>
          <el-button size="small" type="success" v-if="scope.row.is_banner" @click="qxlb(scope.row.id)">取消轮播图</el-button>
          <el-button size="small" type="warning" v-if="!scope.row.is_banner" @click="szlb(scope.row.id)">设置轮播图</el-button>
          <el-button size="small" type="danger" @click="handleRemove(scope.$index, scope.row.id)">删除文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="total > 10">
      <el-pagination layout="prev, pager, next" :total="total" :current-page="crtpg" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog :title="articletitle" :visible.sync="articlebox" size="small" class="myartcledia" @close="removeart">
      <div class="titlehead"><span>{{articledate}}&nbsp;&nbsp;</span><span>作者：</span><span>{{articleauthor}}&nbsp;&nbsp;</span><span>{{articlerc}}</span><span>次阅读</span></div>
      <hr/>
      <div v-html="articlett" class="articledt"></div>
      <!--<span slot="footer" class="dialog-footer">
        <el-button @click="articlebox = false">取 消</el-button>
        <el-button type="primary" @click="articlebox = false">确 定</el-button>
      </span>-->
    </el-dialog>
    <el-dialog title="轮播图设置" :visible.sync="banner" size="small" class="myartcled" @close="nobanner">
      <el-row class="textr">
        <el-col class="wd148">
          <el-upload list-type="picture-card" ref="upload" :file-list="filelist" :auto-upload="true"  action="http://192.168.3.28:8000/admin_api/upload_file/" :on-change="changelb" :on-success="imgsuccess" :on-remove="imgremove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nobanner">取 消</el-button>
        <el-button type="primary" @click="gobanner">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'articlelist',
    data(){
      return{
        tableData: [],
        loading: false,
        articlebox:false,
        articlett:'',
        articletitle:'',
        articledate:'',
        articleauthor:'',
        articlerc:'',
        total:0,
        crtpg:1,
        banner:false,
        bannerid:'',
        imgdata:'',
        filelist:[]
      }
    },
    methods:{
      changelb(file,fileList){
        if(fileList.length > 1){
          fileList.splice(0,1);
        }
      },
      imgsuccess:function(response, file, fileList){
        this.imgdata = response.data;
      },
      imgremove:function(){
        this.imgdata = '';
      },
      szlb(id){
        this.bannerid = id;
        this.banner = true;
      },
      gobanner(){
        this.total = 0;
        this.$http({
          method:'PUT',
          url:'http://192.168.3.28:8000/admin_api/banner/',
          body:{
            article_id:this.bannerid,
            img:this.imgdata
          }
        }).then(res => {
          if(res.body.status_code == '201'){
            this.$message({
              type:'success',
              message:res.body.msg,
              duration:'1000'
            })
            this.getmsg(1);
              this.crtpg = 1;
              this.nobanner();
          }else{
          this.$message({
            type:'error',
            message:res.body.msg,
            duration:'1000'
          })
          }
        }, err => {
          this.$message({
            type:'error',
            message:'网络链接失败请稍后再试',
            duration:'1000'
          })
        })
      },
      nobanner(){
        this.filelist = [];
        this.bannerid = '';
        this.imgdata = '';
        this.banner = false;
      },
      qxlb(id){
        this.$confirm('是否取消轮播图？', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.total = 0;
        this.$http({
          method:'DELETE',
          url:'http://192.168.3.28:8000/admin_api/banner/',
          body:{
            article_id:id
          }
        }).then(res => {
          if(res.body.status_code == '201'){
          this.$message({
            type:'success',
            message:'操作成功',
            duration:'1000'
          });
          this.getmsg(1);
          this.crtpg = 1
        }else{
          this.$message({
            type:'error',
            message:res.body.msg,
            duration:'1000'
          })
        }
      },err => {
          this.$message({
            type:'error',
            message:'网络链接失败，请稍后再试',
            duration:'1000'
          })
        })
      }).catch(() => {
          this.$message({
          type:'warning',
          message:'已取消',
          duration:'1000'
        })
      })
      },
      handleCurrentChange(val){
        this.getmsg(val);
      },
      removeart(){
          this.articlett = '';
          this.articletitle = '';
          this.articledate = '';
          this.articleauthor = '';
          this.articlerc = ''
      },
      handleEdit(index,row){
      },
      handleRemove(index,id){
        this.$confirm('是否删除该文章？', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.total = 0;
          this.$http({
            method:'DELETE',
            url:'http://192.168.3.28:8000/admin_api/article/',
            body:{
              article_id:id
            }
          }).then(res => {
            if(res.body.status_code == '204'){
              this.$message({
                type:'success',
                message:'文章删除成功',
                duration:'1000'
              });
              this.getmsg(1);
              this.crtpg = 1
            }else{
              this.$message({
                type:'error',
                message:res.body.msg,
                duration:'1000'
              })
            }
          },err => {
            this.$message({
              type:'error',
              message:'网络链接失败，请稍后再试',
              duration:'1000'
            })
          })
      }).catch(() => {
          this.$message({
            type:'warning',
            message:'已取消删除',
            duration:'1000'
          })
        })
      },
      handleDetail(index,id){
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/article/',
          params:{
            article_id:id
          }
        }).then(res => {
          this.articlett = res.body.article_detail.html;
          this.articletitle = res.body.article_detail.title;
          this.articledate = res.body.article_detail.date;
          this.articleauthor = res.body.article_detail.author;
          this.articlerc = res.body.article_detail.read_count;
          this.articlebox = true;
        },err => {

        })
      },
      getmsg(page){
        this.$http({
          method:'GET',
          url:'http://192.168.3.28:8000/admin_api/article/',
          params:{
            page:page
          }
        }).then(res => {
          if(res.body.status_code == '200'){
          this.tableData = res.body.article_list;
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
  #articlelist{
    background:#fff;
    padding:.5rem;
  }
  .titlehead{
    text-align:left;
  }
  .wd148{
    width:148px;
    height:148px;
    overflow:hidden;
  }
  .textr{
    padding-left:100px;
  }

</style>
<style>
  .myartcledia{
    height:100%;
    overflow:hidden;
  }
  .myartcled .el-dialog{
    width:375px;
    width:375px;
  }
  .myartcledia .el-dialog{
    width:375px;
    height:70%;
    overflow-y:auto;
  }
  p{
    text-indent:2em;
    text-align:left;
  }
  .articledt img{
    width:80%;
    height:auto;
  }
</style>
