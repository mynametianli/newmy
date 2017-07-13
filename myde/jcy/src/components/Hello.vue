<template>
  <el-row>
    <el-col :span = '10'>
      <el-row>历城检察院</el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row{
    background:yellow;
    height:10rem;
  }
  .mini{
    background:red;
    text-align:left;
  }
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
