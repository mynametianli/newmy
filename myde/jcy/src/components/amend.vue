<template>
  <el-row id="amend" class="bsz">
    <div class="amendbox">
      <el-form :model="amenddata" :rules="amendrule" ref="amendref" label-width="100px" class="amendform">
        <el-form-item label="原密码" prop="pass" class="mt">
          <el-input type="password" placeholder="请输入原密码" v-model="amenddata.pass">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass" class="mt">
          <el-input type="password" placeholder="请输入新密码" v-model="amenddata.newpass">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rnewpass" class="mt">
          <el-input type="password" placeholder="请再次输入新密码" v-model="amenddata.rnewpass">
          </el-input>
        </el-form-item>
        <el-form-item class="mt textl">
          <el-button type="primary" @click="submitbt('amendref')" class="btw">确认更改</el-button>
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
    name:'amend',
    data(){
      var _this = this;
      var checkpass = function(rule,value,callback){
        if(!value){
          return callback(new Error('原密码不能为空'))
        }else{
          return callback()
        }
      }
      var checknewpass = function(rule,value,callback){
        if(!value){
          return callback(new Error('新密码不能为空'))
        }else{
          return callback()
        }
      }
      var checkrnewpass = function(rule,value,callback){
        console.log(this);
        if(!value){
          return callback(new Error('确定密码不能为空'))
        }else if(value !== _this.amenddata.newpass){
          return callback(new Error('输入密码与新密码不一致'))
        }else{
          return callback()
        }
      }
      return{
        amenddata:{
          pass:'',
          newpass:'',
          rnewpass:''
        },
        amendrule:{
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
        msg:''
      }
    },
    methods:{
      submitbt:function(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.$http({
              method:'PUT',
              url:'http://192.168.3.28:8000/admin_api/auth/',
              body:{
                old_password: this.amenddata.pass,
                new_password: this.amenddata.newpass
              }
            }).then(res => {

                if(res.body.status_code == '201'){
                  this.$message({
                    type:'success',
                    message:res.body.msg,
                    duration:'1000'
                  })
                  this.$router.push('/');
                }else{
                  this.msg = res.body.msg;
                  this.dialogVisible = true;
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
  #amend{
    position:relative;
    width:100%;
    height:calc(100% - 3rem);
  }
  .amendbox{
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
</style>
