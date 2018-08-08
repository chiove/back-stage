<template>
  <div class="top">
    <div class="top_logo">
      <a :href="gotoIndex"><img class="top_logo_yh" src="../../assets/images/logo.png"></a>
      <el-popover ref="popover5" placement="top" width="884"   trigger="hover" v-model="visible">
        <v-all></v-all>
      </el-popover>
      <el-button v-popover:popover5></el-button>
    </div>
    <div class="top_right_h3">
      <h3>云华数据开放平台</h3>
      <span v-if="data.xxmc">{{data.xxmc}}</span>
      <!-- <span v-else>云华大学</span> -->
    </div>
    <div class="top_right_div">
      <img :src="data.url" v-if="data.url">
      <img src="../../assets/images/faceaddress.png" v-else>
      <div>
        <p v-if="data.username">{{data.username}}</p>
        <p v-else>管理员</p>
        <span v-if="data.name">{{data.name}}</span>
        <span v-else>高级管理员</span>
      </div>
      <div class="top_right_div_img dropdown">
        <el-dropdown trigger="click" :hide-on-click="false">
        <span class="el-dropdown-link">
          <img src="../../assets/images/dbx.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="gotoLogin">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>
  </div>
</template>
 <script>
 import all from './all_htgl'
 export default {
  name: 'top',
  components:{'v-all':all},
  data:function(){
    return {
      visible: false,
      data:'',
    }
  },
  computed: {
    // 跳回后台主页面
    gotoIndex() {
      // return window.g.url2+'/#/indexs'
    }
  },
  created(){
    if(sessionStorage.getItem("content")){
      this.data = JSON.parse(sessionStorage.getItem("content"));
      console.log(this.data)
    }
  },
  methods:{
    // 跳回后台login页面
    gotoLogin(){
    }
  }
}
</script>
<style>
.top{
  font-size: .16rem;
  width:100%;
  height:.6rem; 
  display: flex;
}
.top_logo{
  width: 1.2rem;
  font-size: 0;
}
.top_logo_yh{
  width: .67rem;
  height: .35rem;
  margin:.13rem .11rem .12rem .15rem;
}
.top_logo_more{
  width: .18rem;
  height: .15rem;
  margin:.23rem 0;
}
.top_right_h3{
  width: calc(100% - 3.19rem);
}
.top_right_h3 h3{
  display: inline-block;
  font-size: .18rem;
  color: #FFFFFF;
  margin:.22rem 0 .2rem 0;
  padding-left: .21rem;
  border-left: .01rem solid #DBE3F1;
}
.top_right_h3 > span{
  font-size: .16rem;
  color: #FFFFFF;
  float: right;
  height: .21rem;
  font-weight: 700;
  line-height: .21rem;
  padding-right: .32rem;
  margin:.22rem 0 .2rem 0;
  border-right: .01rem solid #DBE3F1;
}
.top_right_div{
  width: 197px;
  display: flex;
  color: #ffffff;
}
.top_right_div > img{
  width: .37rem;
  height: .37rem;
  border-radius:50%;
  margin:.14rem .1rem .11rem .11rem;
}
.top_right_div div p{
  font-weight: 600;
  white-space: nowrap;
  font-size: .16rem;
  margin:0;
}
.top_right_div div span{
  font-weight: 600;
  font-size: .1rem;
  margin:0;
  display: inline-block;
  white-space: nowrap;
}
.top_right_div div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 0;
}
.top_right_div_img{
  padding:.2rem 0 .25rem .31rem!important;
}
.top_logo .el-button{
  padding:0;
  width: .18rem;
  height: .15rem;
  margin-top: .25rem;
  vertical-align: top;
  border-radius: 0;
  border:none;
  background: url(../../assets/images/more.png) no-repeat; 
  background-size: 100% 100%;
}
.el-dropdown-menu{
    position: absolute;
    top: .6rem !important;
    right: .3rem !important;
    transform-origin: center top 0px;
    z-index: 2000;
    height: .38rem !important;
    width: .94rem !important;
    min-width: .96rem !important;
    margin: 0;
    padding:0;
}
.el-dropdown-menu__item{
  font-size: .12rem;
  text-align: center;
}
.dropdown .el-dropdown{
  padding:0 !important;
}
</style>
