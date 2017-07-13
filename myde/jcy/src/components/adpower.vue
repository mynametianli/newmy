<template>
  <el-row id="adpower">

  </el-row>
</template>
<script>
  export default{
    name:'adpower',
    data(){
      return {

      }
    },
    created:function(){
      this.$http({
        method:'GET',
        url:'http://192.168.3.28:8000/admin_api/permission/'
      }).then(res => {

      }, err => {

      })

    }
  }
</script>
<style scoped>
  #adpower{

  }
</style>
