<template>
  <el-row id="add" class="bsz">
    <div class="addbox">
      <el-form :model="adddata" :rules="addrule" ref="addref" label-width="100px" class="addform">
        <el-form-item label="子管理员账号" prop="pass" class="mt">
          <el-input type="text" placeholder="请输入子管理员账号" v-model="adddata.pass">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newpass" class="mt">
          <el-input type="password" placeholder="请输入密码" v-model="adddata.newpass">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rnewpass" class="mt">
          <el-input type="password" placeholder="请再次输入密码" v-model="adddata.rnewpass">
          </el-input>
        </el-form-item>
        <el-form-item label="权限选择" prop="rnewpass" class="mt">
          <el-checkbox-group v-model="permissions" class="mycheckboxall">
            <el-checkbox v-for="check in boxmsg" :label="check.id" :key="check.id" class="mycheckbox">{{check.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="mt textl">
          <el-button type="primary" @click="submitbt('addref')" class="btw">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :close-on-click-modal="false">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    name:'add',
    data(){
      var _this = this;
      var checkpass = function(rule,value,callback){
        if(!value){
          return callback(new Error('子管理员账号不能为空'))
        }else{
          return callback()
        }
      }
      var checknewpass = function(rule,value,callback){
        if(!value){
          return callback(new Error('密码不能为空'))
        }else{
          return callback()
        }
      }
      var checkrnewpass = function(rule,value,callback){
        console.log(this);
        if(!value){
          return callback(new Error('确定密码不能为空'))
        }else if(value !== _this.adddata.newpass){
          return callback(new Error('2次密码输入不一致'))
        }else{
          return callback()
        }
      }
      return{
        adddata:{
          pass:'',
          newpass:'',
          rnewpass:''
        },
        addrule:{
          pass:[
            {validator: checkpass, trigger: 'blur'}
          ],
          newpass:[
            {validator: checknewpass, trigger: 'blur'}
          ],
          rnewpass:[
            {validator: checkrnewpass, trigger: 'blur'}
          ]
        },
        dialogVisible:false,
        msg:'',
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
        permissions:[]
      }
    },
    methods:{
      submitbt:function(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.$http({
              method:'POST',
              url:'http://192.168.3.28:8000/admin_api/admin_manager/',
              body:{
                email: this.adddata.pass,
                password: this.adddata.newpass,
                permissions:this.permissions.join(',')
              }
            }).then(res => {
              this.msg = res.body.msg;
              this.dialogVisible = true;
              if(res.body.status_code == '200'){
                this.$refs['addref'].resetFields();
                this.permissions = [];
              }
          }, err => {
              this.msg = '发送失败';
              this.dialogVisible = true;
            })
          }else{
            this.msg = '请将信息填完整';
            this.dialogVisible = true;
      }
      })
      },
    }
  }
</script>
<style scoped>
  #add{
    position:relative;
    width:100%;
    height:calc(100% - 3rem);
    overflow:hidden;
  }
  .addbox{
    position:absolute;
    width:30rem;
    overflow:hidden;
    border:1px solid #ccc;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding:4rem 2rem 2rem 2rem;
    box-shadow:0 0 12px 0px rgba(71,86,105,.8);
    background:#EFF2F7;
  }
  h1{
    position:absolute;
    padding:0;
    margin:0;
    width:34rem;
    height:3rem;
    line-height:3rem;
    background:#8492A6;
    left:0;
    top:0;
  }
  .mt{
    margin-top:1rem;
  }
  .textl{
    margin-left:0;
    margin-top:2rem;
    text-align:left;
    padding-left:6rem;
  }
  .btw{
    width:6rem;
  }
  .mycheckboxall{
    text-align:left;
  }
  .mycheckbox{
    margin-left:15px;
    width:120px;
  }
</style>
