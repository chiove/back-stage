<template>
  <div class="left">
    <div class="left_list">
      <ul>
        <li><router-link to="/index/dailyData">每日数据</router-link></li>
        <li><router-link to="/index/weekData">每周数据</router-link></li>
        <li><router-link to="/index/studentsCare">学生关怀</router-link></li>
        <li><router-link to="/index/studentsSearch">学生考勤查询</router-link></li>
        <li><router-link to="/index/teacherCheck">辅导员查寝签到</router-link></li>
      </ul>
    </div>
    <div class="right_list">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
 <script>
 export default {
  name: 'left',
  data:function(){
    return {
    }
  },
}
</script>
<style>
.left{
  font-size: .16rem;
  display: flex;
  width: 100%;
}
.left_list{
  width: 1.2rem;
  min-width: 1.2rem;
  height: 100%;
  background:#224B95;
  padding-top: .1rem;
  box-shadow: -1px 3px 20px rgb(25, 47, 113) inset;
  z-index: 1;
  box-sizing: border-box;
}
.right_list{
  flex: auto;
  padding: .18rem .24rem;
  overflow: auto;
  /*width: calc(100% - 1.2rem);*/
  /*overflow: hidden;*/
}
.left_list ul{
  padding:0;
}
.left_list ul li{
  height: .4rem;
  line-height: .4rem;
  text-align: center;
}
.left_list ul li a{
  display: block;
  color: rgba(255,255,255,.8);
  font-size: .14rem;
  font-weight: 600;
  text-decoration: none;
}
.left_list ul li a:hover{
  background: #0F3A88 !important;
  color: #ffffff !important;
}
.left_list .router-link-active{
  background: #0F3A88 !important;
}
</style>
