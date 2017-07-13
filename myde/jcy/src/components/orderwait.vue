<template>
  <el-row id="orderwait">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="identity_name" label="委托人姓名">
      </el-table-column>
      <el-table-column prop="suspect_name" label="嫌疑人姓名">
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
      <el-table-column prop="add_date" label="提交时间">
      </el-table-column>
      <el-table-column label="委托书">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchbook(scope.row.proxy)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="所函">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchletter(scope.row.letter)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="身份证">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchcard(scope.row.id_card_img)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="关系证明">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchfamily(scope.row.relation_img)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="相关材料">
        <template scope="scope">
          <el-button type="info" size='mini' @click="opendown(scope.row.relation_data)">附件下载</el-button>
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
    <el-dialog :title="dialogtitle" :visible.sync="dialogshow" :close-on-click-modal="false" @close="diahidden">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(img,index) in imglist" :key="index">
          <el-card>
            <img :src="img" class="image">
            <el-button @click="goweb(img)" size="mini" type="primary">查看大图</el-button>
          </el-card>
        </el-col>
      </el-row>
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
    <el-dialog title="点击链接查看下载" :visible.sync="datalistshow" :close-on-click-modal="false" @close="datahidden">
      <p v-for="(dataimg,index) in datalist"><a :href="dataimg" target="_blank">{{dataimg}}</a></p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="datahidden">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'orderwait',
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
        markid:'',
        total:0,
        crtpg:1,
        datalist:[],
        datalistshow:false
      }
    },
    methods:{
      datahidden(){
        this.datalistshow = false;
        this.datalist = [];
      },
      opendown(url){
        this.datalist = url;
        this.datalistshow = true;
      },
      goweb(url){
        window.open(url)
      },
      handleCurrentChange(val){
        this.getmsg(val);
      },
      watchbook(data){
        if(typeof data === 'string'){
          this.imglist.push(data)
        }else{
          this.imglist = data;
        }
        this.dialogtitle = '委托书';
        this.dialogshow = true;
      },
      watchletter(data){
        if(typeof data === 'string'){
          this.imglist.push(data)
        }else{
          this.imglist = data;
        }
        this.dialogtitle = '所函';
        this.dialogshow = true;
      },
      watchcard(data){
        if(typeof data === 'string'){
          this.imglist.push(data)
        }else{
          this.imglist = data;
        }
        this.dialogtitle = '身份证';
        this.dialogshow = true;
      },
      watchfamily(data){
        if(typeof data === 'string'){
          this.imglist.push(data)
        }else{
          this.imglist = data;
        }
        this.dialogtitle = '关系证明';
        this.dialogshow = true;
      },
      diahidden(){
        this.dialogshow = false;
        this.imglist = [];
      },
      openmark(id){
        this.markid = id;
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
          url:'http://192.168.3.28:8000/admin_api/met/',
          body:{
            met_id:this.markid,
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
          this.markid = '';
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
          url:'http://192.168.3.28:8000/admin_api/met/',
          params:{
            page:page,
            type:'1'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.met_list;
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
  #orderwait{
    background:#fff;
    padding:.5rem;
  }
  img{
    height:130px;
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
