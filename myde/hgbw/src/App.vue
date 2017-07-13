<template>
  <div id="app">
    <div id="content">
      <transition name="fade" mode="out-in">
          <router-view @add_car="carnums" @addshop="carnums" @decrease="carnums" @ensure="carnums" @pushcar="carnums" :root="vroot"></router-view>
        </transition>
    </div>
    <div id="foot">
      <ul>
      <router-link tag="li" class="nav_footer" to="/foo"><span class="spanl iconfont icon-tesecanyin"></span><span class="spanr">订餐</span></router-link>
      <router-link tag="li" class="nav_footer" to="/getfood"><span class="spanl iconfont icon-qucan"></span><span class="spanr">取餐</span></router-link>
        <router-link tag="li" class="nav_footer nav_footer_car" to="/shopcar"><span class="carcircle" v-show="buynums > 0">{{buynums}}</span><span class="spanl iconfont icon-tubiao4"></span><span class="spanr">购物车</span></router-link>
        <router-link tag="li" class="nav_footer" to="/my"><span class="spanl iconfont icon-wode"></span><span class="spanr">我</span></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
/*import Hello from './components/Hello'
import myname from './components/Myname'*/

export default {
  name: 'app',
  data: function () {
    return {
      machineid: "",
      cargoods:"",
      buynums:0,
      vroot:""
    }
  },
  components: {},
  methods: {
    carnums:function(buy) {
      //购物车商品数量显示，购物车页面数量改变，触发此函数
      this.buynums = buy;
    },
    /*machine: function (chooseid) {
      this.machineid = chooseid;
    },

    }*/
  },
  updated:function(){
    //数据改变，页面刷新时，购物车商品数量获取显示
    this.buynums = parseInt(sessionStorage.getItem("buynums"));
  },
  mounted:function(){
  }
}

</script>

<style>
  .fade-enter-active,.fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter-active{
    opacity:1;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-leave{
    opacity:0;
  }
  .fade-leave-active{
    opacity:0;
  }
  @media screen and (min-width:374px)and (max-width:411px){
    html{font-size:19.9px;}
  }
  @media screen and (min-width:320px) and (max-width:374px){
    html{font-size:17.05px;}
  }
  @media screen and (min-width:412px) and (max-width:479px){
    html{font-size:21px;}
  }
  @media screen and (min-width:480px){
    html{font-size:22px;}
  }
  body,div,ul,li,img,h1,h2,h3,h4,h5,h6,a,span,input,dt,dd,dl,ol,p,input{-webkit-tap-highlight-color: transparent;margin:0;padding:0;box-sizing:border-box;/*-webkit-user-select: none;
    user-select: none;-webkit-touch-callout: none;*/}
  ul,ol,dl{list-style:none;}
  img{display:block; border:0;}
  body{font-size:12px; font-family:"宋体"; color:#3e3e3e;}
  a{text-decoration:none; color:#3e3e3e;}
  a:hover{text-decoration:underline; color:#f60; cursor:pointer;}
  body,html{width:100%;height:100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272636;
  margin-top: 0px;
  width:100%;
  height:100%
}
html{
  width:100%;
}
body{
  margin:0px;
  width:100%;
  height:100%;
  background:#eee;
}
  #content{
    width:100%;
    height:100%;
    overflow:hidden;
  }

#foot{
  width:100%;
  height:2.5rem;
  position:fixed;
  z-index:2;
  bottom:0;
  border-top:1px solid #e7e7e7;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
ul{
  width:100%;
  height:100%;
  list-style:none;
  padding:0;
  margin:0;
  background:white;
  color:#929292;
}
.router-link-active{
  color:red;
}
.nav_footer{
  font-size:.55rem;
  width:25%;
  height:2.5rem;
  display:block;
  float:left;
  background:white;
  tex-align:center;
  border:none;
  padding:.15rem 0;
}
  .spanl{
    height:1.6rem;
    display:block;
    font-size:1.6rem;
    line-height:1.6rem
  }
  .spanr{
    display:block;
  }
  .nav_footer_car{
   position:relative;
  }
  .carcircle{
    position:absolute;
    display:block;
    min-width:1.02rem;
    height:1.02rem;
    border-radius:0.51rem;
    background:red;
    color:white;
    line-height:1.02rem;
    padding:0rem 0.25rem;
    top:0.1rem;
    left:60%;
    font-size:.6rem;
  }
</style>
