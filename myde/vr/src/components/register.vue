<template>
  <div id="register">
    <mu-flexbox class="flex-demo1" align="center">
      <mu-flexbox-item class="demo-icon">
        <mu-icon value="language" :size="size"></mu-icon>
      </mu-flexbox-item>
      <mu-flexbox-item class="" grow="11">
        <mu-col class="" desktop="20">VR9工作室后台管理系统<span class="col-text">工作室申请</span></mu-col>
      </mu-flexbox-item>
    </mu-flexbox>
    <div class="register_box">
        <div class="register_demo" v-for='(demo,index) in demoall' :class = '{demobox:index == 9}'>
          <div class="register_left l" v-if="index == 0 || index == 1 || index == 2 || index == 7 || index == 8 || index == 9 || index == 10">{{demo}}<span class="redmark">*</span>   </div>
          <div class="register_left l" v-if="index != 0 && index !=1 && index != 2 && index != 7 && index != 8 && index != 9 && index != 10">{{demo}}</div>
          <div class="register_right l" v-show="index < 11 && index != 9">
            <input type="text" v-model="demodata[index]" :placeholder="plhd[index]">
          </div>
         <!-- <div class="register_right l noborder" v-show='index == 7'>
            <mu-select-field v-model="mystyle" label="请选择工作室类型" class="choose l marl0" hintText="请选择">
              <mu-menu-item v-for="(text,index) in liststyles" :key="text.id" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />
            </mu-select-field>
          </div>-->
          <div class="register_right l noborder" v-show='index == 9'>
            <mu-select-field v-model="game1" hintText="请选择省份" class="choose l marl0" :maxHeight="150" @change="changepro">
              <mu-menu-item v-for="(text,index) in listp" :key="index" ccc="dddd" ttt="ddd" :value="text.value+text.text" :title="text.text" />
            </mu-select-field>
            <mu-select-field v-model="game2" hintText="请选择城市" class="choose l" :maxHeight="150" @change="changecity">
              <mu-menu-item v-for="(city,index) in citys" :key="index" ccc="dddd" ttt="ddd" :value="city.value+city.text" :title="city.text" />
            </mu-select-field>
            <mu-select-field v-model="game3" hintText="请选择区域" class="choose l" :maxHeight="150">
              <mu-menu-item v-for="(text,index) in dists" :key="index" ccc="dddd" ttt="ddd" :value="text.text" :title="text.text" />
            </mu-select-field>
          </div>
          <div class="register_right2 l" v-if="index == 11">
             <textarea class="remarks l" :placeholder="plhd[index]" v-model="demodata[index]"></textarea>
          </div>
          <div class="line" v-if="index == 6 || index == 11"></div>
         <!-- <div class="register_img" v-show="index >= 10">
              <div>请上传居民身份证正面图片</div>
              <div class="face_img_box">
                <div class="face_img l">
                  <img :src="faceimg" alt="">
                </div>
                <div class="face_text r">
                  <ul>
                    <li v-for="item in items"><span></span>{{item}}</li>
                  </ul>
                  <mu-raised-button label="点击上传" class="regs_btn">
                    <input type="file" class="filebutton" @change="getimg($event,'faceimg')">
                  </mu-raised-button>
                </div>
              </div>
              <div class="mar1">请上传居民身份证背面图片</div>
              <div class="face_img_box">
                <div class="face_img l">
                  <img :src="faceimgb" alt="">
                </div>
                <div class="face_text r">
                  <ul>
                    <li v-for="item in items"><span></span>{{item}}</li>
                  </ul>
                  <mu-raised-button label="点击上传" class="regs_btn">
                    <input type="file" class="filebutton" @change="getimg($event,'faceimgb')">
                  </mu-raised-button>
                </div>
              </div>
          </div>-->
        </div>
        <div class="register_demo">
          <div class="register_left l"></div>
          <div class="register_right1 l">
            <mu-checkbox label="我已阅读并同意<<工作室申请章程>>" class="demo-checkbox1" v-model="ischeck"/> <!--labelClass="democheck"-->
          </div>
        </div>
        <div class="register_demo">
          <div class="register_left l"></div>
          <div class="register_right1 l">
            <mu-raised-button label="提交申请" class="rjst-btn" backgroundColor="#337ab7" @click="regist($router)">
            </mu-raised-button>
          </div>
        </div>
    </div>
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close($router)"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  import area from '@/area'
  export default{
    name:'register',
    data(){
      return{
          ischeck:true,
          demoall:['申请人姓名','申请人手机号','申请人交易宝账号','申请人微信','申请人QQ','申请人email','申请人地址','工作室名称','工作室人数','工作室地址','工作室详细地址','工作室申请理由'],
          demodata:['','','','','','','','','','',''],
          plhd:[
            '请输入您的真实姓名',
            '请输入工作室管理员的手机号',
            '请输入工作室管理员的交易宝账号',
            '请输入您的微信号',
            '请输入您的QQ号',
            '请输入您的email地址',
            '请输入您的详细地址',
            '请输入您的工作室名称',
            '请输入工作室人数',
            '',
            '请输入工作室详细地址',
            '请说明申请原因',
          ],
          scroll:'window',
          show:false,
          msg:'',
          faceimg:'',
          faceimgb:'',
          myname:'haha',
          game1:'',
          game2:'',
          game3:'',
          size:33,
          mystyle:'-1',
          suss:false,
          citys:[],
          dists:[],
          items:[
            '要求姓名和身份证号清晰可见',
            '身份证信息只作为平台认证依据，不对外使用',
            '支持JPG,PNG,GIF图片格式',
            '建议上传尺寸640*435px',
            '图片大小不超过2M'
          ]
      }
    },
    methods:{
      changepro:function(val){
        val = val.substring(0,6);
        this.game2 = '';
        this.game3 = '';
        this.dists = [];
        this.citys = area.citys_data[val];
      },
      changecity:function(val){
        val = val.substring(0,6);
        this.game3 = '';
        this.dists = area.dists_data[val];
      },
      close:function(router){
        this.show = false;
        this.msg = '';
        if(this.suss){
          router.push('/worklogin');
        }
      },
      haha:function(){
        console.log(this.demodata)
      },
      getimg:function(event,names){

        if(event.currentTarget.files[0]) {
          var file = event.currentTarget.files[0], url = null, name = file.name;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          this[names] = url;
          console.log(this.faceimg);
          console.log(names);
        }
      },
        /*getimgb:function(event) {
          console.log(event.currentTarget.files[0]);
          if (event.currentTarget.files[0]) {
            var file = event.currentTarget.files[0], url = null, name = file.name;
            if (window.createObjectURL != undefined) { // basic
              url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
              url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
              url = window.webkitURL.createObjectURL(file);
            }
            this.faceimgb = url;
          }
        }*/
       regist:function(router){
         if(!this.ischeck){
           this.msg = '请同意工作室申请章程';
           this.show = true;
           return;
         }
         if(!this.demodata[0] || !this.demodata[1] || !this.demodata[2] || !this.demodata[7] || !this.demodata[8] || !this.demodata[10] || !this.game1 || !this.game2 || !this.game3){
           this.show = true;
           this.msg = '请将注册信息填写完整';
           return;
         }
         /*if(!/^[_|a-z|A-Z|0-9|-]{6,16}$/.test(this.demodata[0])){
           this.show = true;
           this.msg = '请输入规范的用户名';
           return;
         }*/
         if(!/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.demodata[1])){
           this.show = true;
           this.msg = '请输入正确的手机号';
           return;
         }
        if(this.demodata[5]&&!/@/.test(this.demodata[5])){
          this.show = true;
          this.msg = '请输入正确的邮箱地址';
          return;
          }

         /*if(this.demodata[1] !== this.demodata[2]){
           this.show = true;
           this.msg = '请保证两次输入密码一致';
           return;
         }*/
         let data = {
           name:this.demodata[0],
           mobile:this.demodata[1],
           wallet_mobile:this.demodata[2],
           work_name:this.demodata[7],
           work_scale:this.demodata[8],
           work_address:{
             province:this.game1.substring(6),
             city:this.game2.substring(6),
             area:this.game3
           },
           address_info:this.demodata[10],
         }
         if(this.demodata[3]){
           data.wechat = this.demodata[3];
         }
         if(this.demodata[4]){
           data.qq = this.demodata[4];
         }
         if(this.demodata[5]){
           data.email = this.demodata[5];
         }
         if(this.demodata[6]){
           data.detail_address = this.demodata[6];
         }
         if(this.demodata[11]){
           data.reason = this.demodata[11];
         }

         this.$http.post('http://120.76.137.157:8887/work/register/',data).then(res => {
           if(res.body.status == '201'){
             this.suss = true;
           }
             this.msg = res.body.msg;
             this.show = true;
          }, response => {
            this.msg = '网络链接失败';
            this.show = true;

         });
       }
    },
    beforeCreate:function(){
        this.listp = area.provs_data;
        this.liststyles = ['省分支','市分支','区/县分支']
    }
  }
</script>
<style scoped>
  .demobox{
    height:60px !important;
    padding-top:5px;
  }
  .register_right1{
    margin-bottom:1rem;
    overflow:hidden;
    text-align:left;
    width:50%;
  }
  .register_right2{
    margin-bottom:1rem;
    overflow:hidden;
    text-align:left;
    width:50%;
    border:2px solid #ccc;
  }
  .remarks{
    width:100%;
    height:100px;
    border:none;
    resize:none;
    outline:none;
  }
  .demo-checkbox1{
    margin-left:0 !important;
  }
  *{
    box-sizing:border-box;
  }
  img{
    display:block;
    border:0;
  }
  ul{
    float:right;
    list-style:none;
    width:93%;
    padding:0;
    margin:0;
  }
  #register{
    width:100%;
    height:100%;
    background:#fcfcfc;
  }
  .register_box{
    position:absolute;
    left:0;
    right:0;
    width:80%;
    overflow:hidden;
    padding:2rem;
    margin:0 auto;
  }
  .register_demo{
    width:100%;
    overflow:hidden;
  }
  .line{
    height:1px;
    width:100%;
    background:#999999;
    box-shadow:0 0 1px rgba(0, 0, 0, .5);
    clear: both;
    margin-bottom:1rem;
  }
  .register_left{
    text-align:right;
    min-width:13%;
    margin-right:1rem;
  }
  .register_left,.register_right{
    margin-bottom:1rem;
    height:1.3rem;
    line-height:1.3rem;
    overflow:auto;
  }
  .register_right{
    text-align:left;
    width:50%;
    border:2px solid #888;
  }
  input{
    border:none;
    width:100%;
    height:100%;
    float:left;
    outline:none;
  }
  .register_right:hover{
    border-color:deepskyblue;
  }
  .register_right2:hover{
    border-color:deepskyblue;
  }
  .register_img{
    width:80%;
    overflow:hidden;
    float:left;
    text-align:left;
    padding:.1rem;
  }
  .face_img_box{
    margin-top:.5rem;
    width:100%;
    overflow:hidden;
  }
  .face_img{
    width:45%;
    height:8rem;
    border:1px solid #ccc;
  }
  .face_img img{
    width:100%;
    height:100%;
  }
  .face_text{
    width:55%;
  }
  .face_text span{
    width:.4rem;
    height:.4rem;
    border-radius:50%;
    background:black;
    display:inline-block;
    margin-right:.2rem;
  }
  .filebutton{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  .regs_btn{
    margin-left:10%;
    margin-top:1rem;
    border-radius:.3rem;
    font-size:.8rem;
    transform:scale(1.1,.8);
  }
  .mar1{
    margin-top:.5rem;
  }
  .noborder{
    border:none !important;
    height:4rem;
    text-algin:left !important;
    margin-bottom:0 !important;
  }
  .choose{
    width:30% !important;
    margin:-9px 1%;
  }
  .marl0{
    margin-left:0 !important;
  }
  .col-text{
    font-size:.8rem;
    margin-left:1rem;
  }
  .rjst-btn{
    width:12rem !important;
    border-radius:.5rem;
    margin-left:-20px;
    transform:translateX(1.1rem);
    display:block;
  }
  .flex-demo1{
    height:5rem;
    background:#333;
    color:#fff;
    font-size:1.5rem;
    padding-left:1rem;
    top:0;
    left:0;
  }
</style>
<style>
  .democheck{
    color:deepskyblue !important;
  }
</style>
