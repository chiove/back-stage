<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
      <span class="students-details-header-title">
        个人详情
      </span>
      <span></span>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="backRouterFun">返回</el-button>
      </div>
    </div>
    <div class="students-details-banner">
      <div class="students-details-banner-title">个人详情</div>
      <div class="students-details-banner-content">
        <div class="students-details-banner-content-information">
          <div class="students-details-banner-content-img">
            <img :src="dataList.profilePhoto" alt="">
          </div>
          <div class="students-details-banner-content-information-item">
            <span class="students-details-banner-content-information-name">{{dataList.studentName}}</span>
            <span>学院名称：{{dataList.collegeName}}</span>
            <span>辅导员：{{dataList.instructorName}}</span>
          </div>
          <div class="students-details-banner-content-information-item">
            <span>专业名称：{{dataList.majorName}}</span>
            <span>寝室号：{{dataList.dormitoryName}}</span>
          </div>
          <div class="students-details-banner-content-information-item">
            <span>学号：{{dataList.studentCode}}</span>
            <span>床号：{{dataList.bedCode}}号</span>
          </div>
          <div class="students-details-banner-content-information-item">
            <span>班级：{{dataList.className}}</span>
          </div>
        </div>
        <div class="students-details-banner-content-data">
          <div class="students-details-banner-content-data-item">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalCared}}
            </div>
            <div class="students-details-banner-content-data-item-text">
              被关怀次数
            </div>
          </div>
          <div class="students-details-banner-content-data-item">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalStayOut}}
            </div>
            <div class="students-details-banner-content-data-item-text">
              连续未归天数
            </div>
          </div>
          <div class="students-details-banner-content-data-item">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalStayOutLate}}
            </div>
            <div class="students-details-banner-content-data-item-text">
             连续晚归天数
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="students-details-table">
      <div class="students-details-table-title">历史数据</div>
      <div class="students-details-table-tab">
        <div class="students-details-table-tab-search">
           <span class="tool-bar-search-babel">
              范围选择
            </span>
          <el-date-picker
            v-model="value"
            type="month"
            size="mini"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="关怀反馈数据" name="first">关怀反馈数据</el-tab-pane>
          <el-tab-pane label="门禁打卡数据" name="second">门禁打卡数据</el-tab-pane>
          <el-tab-pane label="历史打卡数据" name="third">历史打卡数据</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "studentsDetails",
      activated:function(){
       if(this.$route.query){
         this.dataList = this.$route.query
         this.studentId = this.$route.query.studentId
       }
      },
      data() {
        return {
          dataList:{},
          activeName: 'first',
          value:''
        };
      },
      methods: {
        /*返回上一级路由*/
        backRouterFun:function(){
          this.$router.go(-1)
        },
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style scoped>
  .students-details-header-title{
    font-size:.14rem;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(85,85,85,1);
  }
  .students-details-banner{
    height: 1.8rem;
    margin-top: .2rem;
    box-shadow:0 .02rem 0 0 rgba(235,238,240,1);
  }
  .students-details-banner-title{
    font-size:.16rem;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(85,85,85,1);
    margin-top: .22rem;
  }
  .students-details-banner-content{
    height: 1rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .students-details-banner-content-img{
    height: .88rem;
    width: .88rem;
    border-radius: .88rem;
    margin-right: .23rem;
  }
  .students-details-banner-content-img{
    height: .88rem;
    width: .88rem;
  }
  .students-details-banner-content-information{
    width: 10.8rem;
    display: flex;
    justify-content: flex-start;
  }
  .students-details-banner-content-information-item{
    margin-right: .8rem;
    font-size:.12rem;
    font-family:MicrosoftYaHei;
    color:rgba(85,85,85,1);
    display: flex;
    justify-content: flex-start;
    flex-flow: column;
  }
  .students-details-banner-content-information-item span{
    margin-bottom: .1rem;
  }
  .students-details-banner-content-information-name{
     font-size:14px;
     font-family:MicrosoftYaHei-Bold;
     color:rgba(85,85,85,1);
     margin-bottom: .17rem;
  }
  .students-details-banner-content-data{
    width: 6.3rem;
    margin-right: .37rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .students-details-banner-content-data-item{
    width: 1.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    color: #fff;
    background: #2184C5;
    text-align: center;
    height: 1rem;
  }
  .students-details-banner-content-data-item-number{
    font-size:30px;
    font-family:MicrosoftYaHei-Bold;
  }
  .students-details-banner-content-data-item-text{
    font-size:14px;
    font-family:MicrosoftYaHei;
  }
  .students-details-table{
    margin-top: .48rem;
  }
  .students-details-table-title{
    font-size:16px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(85,85,85,1);
  }
  .students-details-table-tab{
    margin-top: .15rem;
    position: relative;
  }
  .students-details-table-tab-search{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
  }
</style>
