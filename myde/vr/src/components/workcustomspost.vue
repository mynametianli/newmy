<template>
  <div id="custormspost">
    <div class="header">我要报单</div>
    <div class="custorm-demo">
      <span class="custorm-text">矿机类型:</span>
      <mu-radio label="一星矿机" name="group" nativeValue="1" class="custorm-radio" v-model="picked"/>
      <mu-radio label="二星矿机" name="group" nativeValue="2" class="custorm-radio" v-model="picked"/>
      <mu-radio label="三星矿机" name="group" nativeValue="3" class="custorm-radio" v-model="picked"/>
      <mu-radio label="四星矿机" name="group" nativeValue="4" class="custorm-radio" v-model="picked"/>
    </div>
    <div class="custorm-demo">
      <span class="custorm-text">矿机数量:</span>
      <div class="controlbox l">
        <div class="l" @click="reduce">-</div>
        <div class="l">
          <input type="text" class="l" v-model="num">
        </div>
        <div class="r" @click="add">+</div>
      </div>
      <div class="clearff"></div>
    </div>
    <div class="custorm-demo">
      <div class="custorm-des">您选择的矿机类型为
        <span class="textred">{{pickedtext}}</span>，
        数量为<span class="textred">{{num}}</span> 个<!--，总共需缴纳人民币
        <span class="textred">{{allmoney}}</span>元，根据相关政策，您只需缴纳占比<span  class="textred">{{prt}}</span>的人民币.-->
      </div>
    </div>
    <div class="custorm-demo">
      <div class="custorm-des">
        <span>人民币：</span><input class="mrl2 moneyinput" v-model="allmoney" type="number"/> 元
      </div>
    </div>
    <div class="custorm-demo">
      <mu-raised-button label="提交报单" class="custorm-btn" @click="subcustom" :disabled = 'isdis'/>
    </div>
    <div>
      <mu-dialog :open="show" title="温馨提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
  </div>
</template>
<script>
  export default{
    name:'workcustormspost',
    data(){
      return{
        show:false,
        msg:'',
        picked:'1',
        num:1,
        prt:'30%',
        allmoney:'',
        isdis:false
      }
    },
    computed:{
      pickedtext:function(){
        if(this.picked == '1'){
          return '一星矿机'
        }
        if(this.picked == '2'){
          return '二星矿机'
        }
        if(this.picked == '3'){
          return '三星矿机'
        }
        if(this.picked == '4'){
          return '四星矿机'
        }
      }
    },
    methods:{
      close:function(){
        this.show = false;
        this.isdis = false;
      },
      add:function(){
        this.num += 1;
      },
      reduce:function(){
        if(this.num > 0){
        this.num -= 1;
        }
      },
      subcustom:function(){
        this.isdis = true;
        if(!this.allmoney || this.allmoney < 1){
          this.show = true;
          this.msg = '金额不能为空';
          return;
        }
        let data = {
          gcb_type:this.picked,
          gcb_count:this.num,
          amount:this.allmoney
        }
        this.$http({
          method:'post',
          url:'http://120.76.137.157:8887/wrok/add_declaration/',
          body:data,
          headers:{
            'Authorization':sessionStorage.getItem('token')
          }
        }).then( res => {
          this.show = true;
          if(res.body.status == '201'){
            this.msg = '报单成功';
            this.picked = '1';
            this.num = 1;
            this.allmoney = '';
          }else{
            this.msg = res.body.msg;
          }
        }, res => {
          this.show = true;
          this.msg = '网络链接失败';
        })
      }
    }
  }
</script>
<style scoped>
  #custormspost{
    width:100%;
    height:100%;
  }
  .header{
    width:100%;
    height:2.2rem;
    background:#cbcbcb;
    line-height:2.2rem;
    text-align:left;
    font-size:.85rem;
    padding-left:2rem;
  }
  .custorm-demo{
    width:100%;
    padding:1rem;
    margin-top:.5rem;
    text-align:left;

  }
  .custorm-text{
    display:block;
    float:left;
    margin-left:1rem;
    height:24px;
    line-height:24px;
    font-size:.85rem;
  }
  .custorm-radio{
    margin-left:2rem;
  }
  .controlbox{
    height:24px;
    line-height:24px;
    font-size:.85rem;
  }
  .controlbox input,.controlbox div{
    height:100%;
    line-height:24px;
    text-align:center;
    font-size:.85rem;
  }
  .controlbox div{
    width:24px;
    border:1px solid #ccc;

  }
  .controlbox div:nth-of-type(1){
    margin-left:2rem;
    cursor:pointer;
    background:#999999;
  }
  .controlbox div:nth-of-type(3){
    cursor:pointer;
    background:#999999;
  }
  .controlbox div:nth-of-type(2){
    width:40px;
    margin:0 .2rem;
  }
  .controlbox input{
    width:100%;
    outline:none;
  }
  .textred{
    color:red;
  }
  .custorm-des{
    padding-left:1rem;
    font-size:.85rem;
  }
  .custorm-btn{
    margin-left:6.2rem;
    width:140px;
    border-radius:.5rem;
    background:deepskyblue;
  }
  .mrl2{
    margin-left:2rem;
  }
  .clearff{
    clear:both;
  }
  .moneyinput{
    width:4.5rem;
    height:24px;
    line-height:24px;
  }
</style>

