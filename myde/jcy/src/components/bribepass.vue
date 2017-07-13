<template>
  <el-row id="bribepass">
    <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
      <el-table-column prop="unit" label="申请单位">
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
      <el-table-column prop="agency_code" label="机构代码">
      </el-table-column>
      <el-table-column prop="phone" label="经办人电话">
      </el-table-column>
      <el-table-column prop="name" label="经办人姓名">
      </el-table-column>
      <el-table-column prop="add_date" label="提交时间">
      </el-table-column>
      <el-table-column prop="change_date" label="处理时间">
      </el-table-column>
      <el-table-column label="单位三证">
        <template scope="scope">
          <el-button size="mini" type="info" @click="watchbook(scope.row.three_card)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="被查询项目及个人信息">
        <template scope="scope">
          <el-button size="mini" type="info" @click="openabout(scope.row.project_info)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="举报附件">
        <template scope="scope">
          <el-button type="info" size='mini' @click="opendown(scope.row.annexes)">附件下载</el-button>
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
    <el-dialog :title="dialogtitle1" :visible.sync="dialogshow1" :close-on-click-modal="false" @close="diahidden1">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(img,index) in imglist1" :key="index">
          <el-card>
            <img :src="img" class="image">
            <el-button @click="goweb(img)" size="mini" type="primary">查看大图</el-button>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diahidden1">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="被查询项目及个人信息" :visible.sync="aboutit" @close="abouthidden" class="htwd">
      <el-row v-for="(items,index) in aboutitems" :key="index" class="textl bd1">
        <h4>被查询项目信息</h4>
        <el-row>
          <p>项目简称：{{items.project_name}}</p>
          <p>招标单位：{{items.project_unit}}</p>
          <p>申请用途：{{items.project_use}}</p>
        </el-row>
        <h4>被查询个人信息</h4>
        <el-row :getter="10">
          <el-col :span="10" v-for="(item,inx) in items.user_info" :key="inx">
            <p>姓名：{{item.name}}</p>
            <p>证件类型：{{item.card_type}}</p>
            <p>证件号码：{{item.card_number}}</p>
          </el-col>
        </el-row>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="abouthidden">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'bribepass',
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
        total:0,
        crtpg:1
      }
    },
    methods:{
      goweb(url){
        window.open(url);
      },
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
        if(typeof data === 'string'){
          this.imglist1.push(data)
        }else{
          this.imglist1 = data;
        }
        this.dialogtitle1 = '单位三证查看';
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
          url:'http://192.168.3.28:8000/admin_api/bribery/',
          params:{
            page:page,
            type:'2'
          }
        }).then(res => {
          this.loading = false;
        if(res.body.status_code == '200'){
          this.tableData = res.body.bribery_list;
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
  #bribepass{
    background:#fff;
    padding:.5rem;
  }
  img{
    height:130px;
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
