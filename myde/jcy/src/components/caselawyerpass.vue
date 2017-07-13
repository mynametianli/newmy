<template>
  <el-row id="caselawyerpass">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="client_name" label="委托人姓名">
      </el-table-column>
      <el-table-column prop="identity_name" label="委托人身份">
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
      <el-table-column prop="change_date" label="处理时间">
      </el-table-column>
      <el-table-column prop="result" label="处理意见">
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
      <el-table-column label="家属证明">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchfamily(scope.row.family_img)">点击查看</el-button>
        </template>
      </el-table-column>
     <!-- <el-table-column label="状态">
        <template scope="scope">
          <el-tag type="primary">{{scope.row.status == 2 ? '已处理' : ''}}</el-tag>
        </template>
      </el-table-column>-->
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
  </el-row>
</template>
<script>
  export default{
    name:'caselawyerpass',
    data(){
      return{
        tableData: [],
        loading: false,
        imgtype:'',
        dialogshow:false,
        dialogtitle:'',
        imglist:[],
        total:1,
        crtpg:1
      }
    },
    methods:{
      goweb(url){
        window.open(url);
      },
      handleCurrentChange(val){
        this.getmsg(val)
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
        this.dialogtitle = '家属证明';
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
          url:'http://192.168.3.28:8000/admin_api/case_lawyer/',
          params:{
            page:page,
            type:'2'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.lawyer_list;
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
  #caselawyerpass{
    background:#fff;
    padding:.5rem;
  }
  img{
    height:130px;
    width:100%;
  }
</style>
