<template>
    <div id="city_content">
          <div class="city_choose">
            <div class="cc_top">请选择您所在的城市:</div>
            <div class="city_all">
               <div class="city default_city" @click.stop="changebg($event)" v-for="allcity in allcitys">{{allcity}}</div>
            </div>
          </div>
          <div class="city_machine">
            <div class="cm_top">请选择贩卖机:</div>
            <div class="machine_all">
              <div class="machine default_machine" @click.stop="machinebg($event,index)" v-for="(allmahine,index) in allmachines" :key="allmahine.number">
                   <span class="machine_choose"></span>
                   <div class="machine_title">{{allmahine.nickname}}</div>
                   <div class="machine_detail">{{allmahine.locate}}</div>
              </div>
            </div>
          </div>
          <button class="city_ensure" @click="gofoo($router)">确定</button>
    </div>
</template>
<script>
  export default{
    name:'city',
    data:function(){
       return{
           allcitys:[],
           allmsg:[],
           allmachines:[],
           mcid:"23",
           city:"",
           chooseid:'',
           locate:'',
           machinename:"",
       }
    },
    props:["root"],
    methods:{
      changebg:function(event){
        //点击城市，当前选择的城市背景改变
        $(event.currentTarget).addClass("choose_city").removeClass("default_city").siblings(".city").removeClass("choose_city").addClass("default_city");
        this.city = $(event.currentTarget).text();
        this.allmachines = [];
        for(var i = 0, l = this.allmsg.length; i < l ; i ++){
          if(this.allmsg[i].name == this.city){
            this.allmachines = this.allmsg[i].data;
          }
        }
        $(".city_ensure").attr("disabled",true).removeClass("choose_yes");
      },
      machinebg:function(event,index){
        //机器选择
        $(event.currentTarget).find(".machine_choose").addClass("machine_pick").parent().siblings(".machine").find(".machine_choose").removeClass("machine_pick");
        this.chooseid= this.allmachines[index].number;
        this.locate= this.allmachines[index].locate;
        this.machinename = this.allmachines[index].nickname;
        $(".city_ensure").attr("disabled",false).addClass("choose_yes");
        /*this.$emit("machinebg",chooseid);*/
      },
      gofoo:function(router){
        //选择完毕后，记录后面ajax所需要的机器信息，然后跳转到foo页面
        localStorage.setItem("mycity",this.city);
        localStorage.setItem("mymachine",this.chooseid);
        localStorage.setItem("address",this.locate);
        localStorage.setItem("machinename",this.machinename);
        sessionStorage.removeItem("buyfood");
        sessionStorage.removeItem("buynums");
        sessionStorage.removeItem("cargoods");
        sessionStorage.removeItem("onefood");
        sessionStorage.removeItem("nobuyfoods");
        sessionStorage.removeItem("nobuygoods");
        sessionStorage.removeItem("mycode");
        router.push("foo");
      }
    },
    created:function(){
      var _this = this;
      $.ajax({
        type:"get",
        url:_this.root+"/post/mechineList",
        success:function(res){
          res = JSON.parse(res);
          if(res.status == "success"){
            _this.allmsg = res["citys"];
            for(var i = 0, l = res.citys.length; i < l ; i++){
              _this.allcitys.push(res["citys"][i]["name"]);
            }
          }
        }
      })
    },
    mounted:function(){
      $(".city_ensure").attr("disabled",true);
    }
  }
</script>
<style scoped>
   #city_content{
     width:100%;
     height:100%;
     background:#eee;
     position:fixed;
     top:0;
     left:0;
     z-index:200;
     padding-bottom:2.5rem;
     overflow-y:auto;
     -webkit-overflow-scrolling: touch;
   }
  .cc_top,.cm_top{
    width:100%;
    height:2.5rem;
    line-height:2.5rem;
    font-size:.85rem;
    background:#fff;
    text-align:left;
    border-bottom:1px solid #e7e7e7;
  }
   .cm_top{
     margin-top:1rem;
   }
  .city_all,.machine_all{
    width:100%;
    height:8.6rem;
    background:#fff;
    overflow:auto;
  }
   .city_all{
     padding:.5rem .5rem 0rem 0rem;
   }
  .city_ensure{
    width:100%;
    height:2.5rem;
    /*border-radius:.25rem;*/
    background:#7e7e7e;
    font-size:1rem;
    color:white;
    position:fixed;
    z-index:201;
    bottom:0;
    left:0;
    border:none;
    line-height:2.5rem;
    letter-spacing:2rem;
    padding-left:2rem;
  }
  .choose_yes{
    background:#e54346 !important;
  }
  .city{
    float:left;
    width:4rem;
    height:1.7rem;
    border-radius:.25rem;
    margin-left:.5rem;
    margin-bottom:.5rem;
    line-height:1.7rem;
    font-size:.65rem;
  }
  .choose_city{
    background:#e54346;
    color:white;
  }
  .default_city{
    background:#eee;

  }
  .machine{
    width:100%;
    overflow:hidden;
    border-bottom:1px solid #e7e7e7;
    padding:.3rem 0rem;
    position:relative;
  }
  .machine_title{
    width:100%;
    height:1.5rem;
    line-height:1.5rem;
    font-size:.85rem;
  }
  .machine_detail{
    font-size:12px;
    height:.8rem;
    line-height:.8rem;
  }
  .machine_choose{
    width:1.1rem;
    height:1.1rem;
    border-radius:50%;
    border:1px solid #272636;
    display:block;
    position:absolute;
    top:.75rem;
    left:.5rem;
  }
  .machine_pick{
    background:url("/lwx/images/pick.png");
    background-size:cover;
    border-style:hidden !important;
  }
</style>
