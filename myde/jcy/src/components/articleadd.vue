<template>
  <el-row id="articleadd">
    <el-row>
    <el-col class="mycol">
      <el-form ref="article" :model="articlemsg" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章标题" class="wid300">
              <el-input v-model="articlemsg.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = '8'>
            <el-form-item label="文章作者" class="wid300">
              <el-input v-model="articlemsg.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章类型" class="textl">
              <el-select v-model="articlemsg.type" placeholder="请选择文章类型">
                <el-option label="反腐" value="1"></el-option>
                <el-option label="检察" value="2"></el-option>
                <el-option label="文化" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
       <!-- <el-row>
          <el-col :span="8">
            <el-form-item label="设置轮播图" class="textl mrl">
              <el-radio-group v-model="articlemsg.is_banner">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>-->

        <el-row>
          <el-col :span="8">
            <el-form-item label="文章封面图" class="textl ht148">
              <el-upload list-type="picture-card" ref="upload" :auto-upload="true"  action="http://192.168.3.28:8000/admin_api/upload_file/" :on-change="changelb" :on-success="imgsuccess" :on-remove="imgremove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-show="articlemsg.is_banner === '是'">
            <el-form-item label="轮播图设置" class="textl ht148">
              <el-upload list-type="picture-card" ref="uploadbanner"  action="http://192.168.3.28:8000/admin_api/upload_file/" :on-change="changelb" :on-success="bannersuccess" :on-remove="bannerremove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章内容">
          <div id="editorElem" style="text-align:left"></div>
        </el-form-item>
        <el-form-item class="textl">
          <el-button type="primary" @click="getContent">上传文章</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    </el-row>
  </el-row>
</template>
<script>
  import E from 'wangeditor'
  export default{
    name:'articleadd',
    data(){
      return{
        articlemsg:{
          title:'',
          author:'',
          type:'',
          is_banner:'否'
        },
        fileList:[],
        imgdata:'',
        bannerdata:''
      }
    },
    methods: {
      imgsuccess:function(response, file, fileList){
        this.imgdata = response.data;
      },
      imgremove:function(){
        this.imgdata = '';
      },
      bannersuccess:function(response, file, fileList){
        this.bannerdata = response.data;
      },
      bannerremove:function(){
        this.bannerdata = '';
        console.log(this.bannerdata);
      },
      changelb(file,fileList){
        if(fileList.length > 1){
          fileList.splice(0,1);
          //this.$refs.uploadbanner.clearFiles();
        }
      },
      submitUpload(){
      },
      getContent: function () {
        if(!this.articlemsg.title){
          this.$message({
            type:'warning',
            message:'请添加文章标题',
            duration:'1000'
          })
          return;
        }
        if(!this.articlemsg.author){
          this.$message({
            type:'warning',
            message:'请添加文章作者',
            duration:'1000'
          })
          return;
        }
        if(!this.articlemsg.type){
          this.$message({
            type:'warning',
            message:'请选择文章类型',
            duration:'1000'
          })
          return;
        }
        if(!this.imgdata){
          this.$message({
            type:'warning',
            message:'请上传封面图片',
            duration:'1000'
          })
          return;
        }
        if(this.articlemsg.is_banner === '是' && !this.bannerdata){
          this.$message({
            type:'warning',
            message:'请上传轮播图',
            duration:'1000'
          })
          return;
        }
        var editor = this.editor;
        let articledata = {};
        articledata.title = this.articlemsg.title;
        articledata.author = this.articlemsg.author;
        articledata.type = this.articlemsg.type;
        //articledata.is_banner = this.articlemsg.is_banner;
        articledata.html = editor.txt.html();
        articledata.img = this.imgdata;
        /*if(articledata.is_banner === '是'){
          articledata.is_banner = true;
          articledata.banner_img = this.bannerdata;
        }else{
          articledata.is_banner = false;
        }*/
        this.$http({
          method:'POST',
          url:'http://192.168.3.28:8000/admin_api/article/',
          body:articledata
        }).then(res => {
          if(res.body.status_code == '201'){
            this.$message({
              type:'success',
              message:'文章上传成功',
              duration:'1500'
            })
            this.articlemsg.title = '';
            this.articlemsg.author = '';
            this.articlemsg.type = '';
            this.articlemsg.is_banner = '否';
            editor.txt.clear();
            this.$refs.upload.clearFiles();
            this.$refs.uploadbanner.clearFiles();
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
            message:res.body.msg,
            duration:'1000'
          })
        })

      }
    },
    mounted() {
      var editor = new E('#editorElem');
      editor.customConfig.uploadImgServer = 'http://192.168.3.28:8000/admin_api/upload/';
      editor.customConfig.uploadFileName = 'img';
     /* editor.customConfig.withCredentials = true;*/
      editor.create();
      this.editor = editor
    }
  }
</script>
<style scoped>
  #articleadd{
    background:#fff;
    padding:.5rem;
    width:calc(100% - 1rem);
    height:calc(100% - 3rem);
    overflow-y:auto;
  }
  #editorElem{
    width:800px;
    height:300px;
  }
  button{
    margin-top:40px;
  }
  .mycol{
    width:1200px;
  }
  .textl{
    text-align:left;
  }
  .wid300{
    width:400px;
  }
  .ht148{
    height:148px;
    overflow:hidden;
  }
</style>
