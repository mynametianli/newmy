<template>
  <el-row id="login">
    <el-row class="loginbox">
      <el-col class="headerimg"><img src="/p_admin/static/img/jh.png" alt=""></el-col>
      <el-col class="headerlogo">历城区检察院后台管理系统</el-col>
    </el-row>
    <div class="mybox">
      <el-row class="formbox">
        <el-tabs v-model="activeName" type="border-card" class="mytabs">
          <el-tab-pane label="用户登录" name="first">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="4rem" class="demo-ruleForm">
              <el-form-item label="帐号" prop="account" class="ht2 mr">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" class="mr">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item class="mt">
                <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :close-on-click-modal="false">
      <span>请将账号密码填写完整</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-row>

</template>
<script>
  export default{
    name:'login',
    data(){
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          /*if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }*/
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return{
        ruleForm2: {
          account: '',
          pass: '',
        },
        rules2: {
          account: [
            { validator: validateAccount, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        activeName:'first',
        dialogVisible:false
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method:'POST',
              url:'http://192.168.3.28:8000/admin_api/auth/',
              body:{
                email:this.ruleForm2.account,
                password:this.ruleForm2.pass
              }
              /*emulateJSON:true*/
            }).then(function(res){
                if(res.body.status_code == '200'){
                  this.$message({
                    type:'success',
                    message:'登录成功'
                  })
                  if(res.body.permissions == 'Superuser'){
                    sessionStorage.setItem('permissions',res.body.permissions);
                    this.$router.push('/ad/admanagerlist');
                  }else{
                    var n = res.body.permissions[0];
                    sessionStorage.setItem('permissions',JSON.stringify(res.body.permissions));
                    if(n == 1){
                      this.$router.push('/ad/scoringwait');
                    }
                    if(n == 2 ){
                      this.$router.push('/ad/orderwait');
                    }
                    if(n == 3 ){
                      this.$router.push('/ad/scoringwait');
                    }
                    if(n == 4){
                      this.$router.push('/ad/bribewait');
                    }
                    if(n == 5 ){
                      this.$router.push('/ad/reportwait');
                    }
                    if(n == 6 ){
                      this.$router.push('/ad/visitwait');
                    }
                    if(n == 7 ){
                      this.$router.push('/ad/delegatewait');
                    }
                    if(n == 8 ){
                      this.$router.push('/ad/articlelist');
                    }
                    if(n == 9 ){
                      this.$router.push('/ad/warningwait');
                    }
                    if(n == 10 ){
                      this.$router.push('/ad/lawyerpass');
                    }
                  }
                }else{
                  this.$message({
                    type:'error',
                    message:res.body.msg
                  })
                }
            },function(err){
              this.$message({
                type:'error',
                message:'网络链接失败，请稍后再试'
              })
            })
          } else {
            this.dialogVisible = true;
             return false;
        }
      });
      },
      resetForm() {
        /*this.$router.push('reset');*/
        this.$http({
          method:'DELETE',
          url:'http://192.168.3.28:8000/admin_api/auth/',
          body:{
            email:'admin@admin.com',
            password:'admin1234'
          }
          /*emulateJSON:true*/
        }).then(function(res){
          console.log(res)
        },function(err){

        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
          done();
      })
      .catch(_ => {});
      }
    },
    created(){
    }
  }
</script>
<style scoped>
  #login{
    height:100%;
  }
  .loginbox{
    padding-left:1rem;
    background:#475669;
    height:5rem;
    overflow:hidden;
  }
  .title{
    height:6rem;
    line-height:6rem;
    font-size:2rem;
    color:#fff;
  }
  .formbox{
    height:200px;
    background:black;
  }
  .mybox{
    position:fixed;
    width:25rem;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    margin:auto;
  }
  .mytabs{
    height:15rem;
  }
  .ht2{
    height:2rem;
    margin-top:1rem;
  }
  .mr{
    margin-right:1rem;
  }
  .mt{
    margin-top:.5rem;
    text-align:left;
    padding-left:85px;
  }
  .el-button{
    width:5rem;
  }
  .headerimg{
    float:left;
    width:70px;
    height:100%;
  }
  .headerlogo{
    width:380px;
    float:left;
    height:100%;
    padding-left:.8rem;
    line-height:5rem;
    font-size:1.8rem;
    text-align:left;
    color:#fff;
  }
  img{
    width:4rem;
    display:block;
    border:none;
    padding:0;
    margin:0;
    margin-top:.5rem;
  }
</style>
