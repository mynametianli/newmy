<template>
  <div id="my_code">
     <div id="mycode"></div>
  </div>
</template>
<script>
  export default{
    name:"mycode",
    mounted:function(){
      //通过订单信息，生成二维码，并且轮询取餐是否成功
      var time = Date.parse(new Date());
      var data = JSON.parse(sessionStorage.getItem("mycode"));
      var number = data["number"];
      var mnumber = $.md5(data["number"]+"hgbwqc");
      //$.md5(pass)
      var mycode = {
        "n":number,
        "M":mnumber,
        "t":time
      }
      /*var mycode = {
        "n":"234",
        "M":"123"
      }*/
      /*var mycode={
        foodd_out:data["food_info"]["foodd_out"],
        time:time,
        mechine_number:data["food_info"]["mechine_number"],
        number:data["number"]
      }*/
      $("#mycode").qrcode({
        width:180,
        height:180,
        text:JSON.stringify(mycode)
      });
      var timmer = setInterval(function(){
        $.ajax({
          type:"get",
          url:"/mechine/outFoodStatus",
          data:{
            order_no:mycode.n
          },
          success:function(res){
             if(JSON.parse(res).status == "1"){
               clearInterval(timmer);
               alert("出餐成功");

             }
            if(JSON.parse(res).status == "2"){
               clearInterval(timmer);
               alert("出餐失败,请联系客服");

             }
          }
        })
      },10000)
    }
  }
  //14872311307015707
</script>
<style scoped>
   #my_code{
     width:100%;
     height:100%;
     position:fixed;
     z-index:1000;
     background:white;
     top:0;
     left:0;
   }
  #mycode{
    position:fixed;
    width:240px;
    height:240px;
    z-index:1011;
    top:2rem;
    left:0;
    right:0;
    margin:0 auto;
  }
</style>
