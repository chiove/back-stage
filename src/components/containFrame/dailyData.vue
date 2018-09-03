<template>
    <div class="body-container">
      <div class="tool-bar-container-border">
          <div>每日数据</div>
          <div>
            <span class="tool-bar-search-babel">
              范围选择
            </span>
            <el-date-picker ref="dateValue"
              v-model="searchDateValue"
              type="date"
              size="mini"
              placeholder="选择日期"
              @change="dateChangeFun"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
          </div>
        </div>
      <div class="daily-data-banner-container">
        <div class="daily-data-banner-title">
          {{collegeNames}}
        </div>
        <div class="daily-data-banner-content">
          <div class="daily-data-banner-item stay-out-late-clock">
            <div class="daily-data-banner-number">
              {{lastNightStayoutLateNum}}
            </div>
            <div class="daily-data-banner-text">
              昨日晚归人数
            </div>
          </div>
          <div class="daily-data-banner-item stay-out-clock">
            <div class="daily-data-banner-number">
              {{lastNightStayoutNum}}
            </div>
            <div class="daily-data-banner-text">
              昨日未归人数
            </div>
          </div>
        </div>
      </div>
      <div class="tool-bar-container">
        <div>
          <span class="daily-data-table-title">学生异常状态列表</span>
          <span>合计{{studentsTotal}}人</span>
        </div>
        <div>
          <el-select v-model="collegeListDataValue" @change="collegeSelectFun" ref="collegeValue" placeholder="全部学院" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in collegeListData"
              :key="item.collegeId"
              :label="item.collegeName"
              :value="item.collegeId">
            </el-option>
          </el-select>
          <el-select v-model="majorListDataValue" @change="majorSelectFun" ref="majorValue" placeholder="全部专业" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in majorListData"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorId">
            </el-option>
          </el-select>
          <!--<el-select v-model="searchStatus" placeholder="状态不限" @change="searchStatusFun" size="mini" class="tool-bar-search-select">
            <el-option
              key="1"
              label="二级学院"
              value="1">
            </el-option>
            <el-option
              key="2"
              label="学生处"
              value="2">
            </el-option>
          </el-select>-->
          <el-select v-model="instructorListDataValue" ref="instructorValue" placeholder="全部辅导员" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in instructorListData"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
          <el-input placeholder="请输入学号/姓名搜索" ref="studentNameDom" v-model="studentNameValue" class="input-with-select" size="mini">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchSubmitFun">搜索</el-button>
        </div>
      </div>
      <div class="daily-data-table-container">
        <el-table :data="tableData" @sort-change="sortChange1" v-loading="loadingStatus" style="width: 100%">
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="studentCode" label="学号"></el-table-column>
          <el-table-column prop="className" label="班级"></el-table-column>
          <el-table-column prop="collegeName" label="学院名称"></el-table-column>
          <el-table-column prop="majorName" label="专业名称"></el-table-column>
          <el-table-column prop="instructorName" label="辅导员"></el-table-column>
          <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
          <el-table-column prop="dormitoryId" label="寝室号"></el-table-column>
          <el-table-column prop="bedCode" label="床号"></el-table-column>
          <el-table-column prop="clockStatus" label="昨日考勤状态"></el-table-column>
          <el-table-column prop="continuousStayoutDays" label="连续未归天数" sortable="custom"></el-table-column>
          <el-table-column prop="continuousStayoutLateDays" label="连续晚归天数" sortable="custom"></el-table-column>
          <el-table-column label="个人详情">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="daily-data-pagination-container">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import getDate from '../../common/js/tools'
    export default {
      name: "dailyData",
      mounted:function(){
        this.userId = localStorage.getItem('userId')
        const newDate = getDate.getCurrentTime('date')
        const yesterday = `${newDate.year}-${newDate.month}-${newDate.day-1}`
        this.searchDateValue = yesterday;
        /*查询学院下拉列表*/
        this.getCollegeListData(this.userId)
        /*学院考勤人数*/
        this.checkTotalFun(this.searchDateValue)
        /*表格查询*/
        const params = {
          date:this.searchDateValue
        }
        this.getTableData(params)
      },
      activated:function () {
        this.userId = localStorage.getItem('userId')
      },
      data(){
          return {
            /*设置时间选择范围*/
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() >= Date.now() - 8.64e5
              }
            },
            studentsTotal:0,/*异常总人数*/
            collegeNames:'全部学院',/*学院名称*/
            lastNightStayoutLateNum:0,/*晚归人数*/
            lastNightStayoutNum:0,/*未归人数*/
            userId:'',/*用户ID*/
            searchDateValue:'',/*初始化为昨天时间*/
            collegeListDataValue:'',/*学院下拉列表默认值*/
            collegeListData:[],/*学院下拉列表*/
            majorListDataValue:'',/*专业下拉列表默认值*/
            majorListData:[],/*专业下拉列表*/
            searchStatus:'1',/*查询状态*/
            instructorListDataValue:'',/*辅导员下拉列表默认值*/
            instructorListData:[],/*辅导员下拉列表*/
            studentNameValue:'',/*学号，姓名默认值*/
            pageNo:1,/*当前页*/
            pageTotal:1,/*总页数*/
            tableData: [],/*表格数据*/
            loadingStatus:false,/*加载显示*/
            dateValue:''/*选择后的时间*/
          }
      },
      methods: {
        /*日期选择后触发事件*/
        dateChangeFun:function(data){
          const dateValue = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`
          this.dateValue = dateValue
          /*学院考勤人数*/
          this.checkTotalFun(dateValue)
          /*表格查询*/
          const params = {
            date:dateValue,
          }
          this.getTableData(params)
        },
        /*考勤数查询*/
        checkTotalFun:function(date,orgId){
          const _this = this
          this.$axios.get(process.env.API_HOST+'analysis/exeception-stat-by-day',{
            params:{
              date:date,
              orgId:orgId
            }
          }).then(function (res) {
            _this.lastNightStayoutLateNum = res.data.data.lastNightStayoutLateNum
            _this.lastNightStayoutNum = res.data.data.lastNightStayoutNum
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*查询学院下拉列表*/
        getCollegeListData:function(status){
          const _this = this
          this.$axios.get(process.env.API_HOST+'/select-data/secondary-college/all').then(function (res) {
            _this.collegeListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*学院下拉选择后触发事件*/
        collegeSelectFun:function(data){
          const _this = this
          this.collegeListData.forEach(function (item,index) {
            if(item.collegeId===data){
              _this.collegeNames = item.collegeName
              _this.checkTotalFun(_this.$refs.dateValue.value,item.collegeId)
            }
          })
          /*查询专业下拉列表*/
          this.$axios.get(process.env.API_HOST+'select-data/major-info/all',{params:{orgId:data}
          }).then(function (res) {
            _this.majorListData = res.data.data
            }).catch(function (error) {
            console.log(error)
          })
        },
        /*状态选择后触发事件*/
        searchStatusFun:function(data){
          this.searchStatus = data
          this.getCollegeListData(data);
        },
        /*专业下拉选择后触发事件*/
        majorSelectFun:function(data){
          const _this = this
          const params = {
            majorId:this.$refs.collegeValue.value,
            orgId:data
          }
          this.$axios.get(process.env.API_HOST+'select-data/instructor-info/all',{params:params
          }).then(function (res) {
            console.log(res)
            _this.instructorListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*搜索按钮搜索*/
        searchSubmitFun:function(){
          /*表格查询*/
          if(!this.dateValue){
            this.dateValue = this.searchDateValue
          }
          const params = {
            date:this.dateValue,
            orgId:this.$refs.collegeValue.value,
            majorId:this.$refs.majorValue.value,
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
          }
          this.getTableData(params)
        },
        /*表格查询*/
        getTableData:function(params){
          this.loadingStatus = true
          const _this = this
          this.$axios.get(process.env.API_HOST+'analysis/exeception-clock-by-day',{params:params
          }).then(function (res) {
              _this.tableData = res.data.data.result
              _this.studentsTotal = res.data.data.totalCount
              _this.pageTotal  =res.data.data.totalCount
              _this.pageNo  =res.data.data.pageNo
          }).catch(function (error) {
            console.log(error)
          })
          setTimeout(() => {
            this.loadingStatus = false
          }, 2000)
        },
        /*排序查询*/
        sortChange1:function(data){
          let descOrAsc=''
          if(data.order==="ascending"){
            descOrAsc='asc'
          }else if(data.order==="descending"){
            descOrAsc='desc'
          }
          if(!this.dateValue){
            this.dateValue = this.searchDateValue
          }
          const params = {
            date:this.dateValue,
            orgId:this.$refs.collegeValue.value,
            majorId:this.$refs.majorValue.value,
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
            descOrAsc:descOrAsc,
            orderBy:data.prop
          }
          this.getTableData(params)
        },
        /*查看详情页*/
        handleClick(row) {
          this.$router.push({
            name:'studentsDetails',
            path: '/index/studentsDetails',
            params:row
          })
        },
        /*分页查询*/
        handleCurrentChange(val) {
          /*表格查询*/
          if(!this.dateValue){
            this.dateValue = this.searchDateValue
          }
          const params = {
            date:this.dateValue,
            orgId:this.$refs.collegeValue.value,
            majorId:this.$refs.majorValue.value,
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
            pageNo:val,
            pageSize:10
          }
          this.getTableData(params)
        }
      }
    }
</script>

<style scoped>
  .daily-data-banner-title{
    font-size:.18rem;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(85,85,85,1);
    margin: .16rem 0;
  }
  .daily-data-banner-content{
    margin: .1rem 0;
    display: flex;
    justify-content: flex-start;
  }
  .daily-data-banner-item{
    width:2.78rem;
    height:.82rem;
    text-align: center;
    margin-right: .12rem;
    border-radius: .04rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
  .stay-out-clock{
    background-image: url('../../assets/images/stayOutClock.png');
    background-size: 2.78rem .82rem;
  }
  .stay-out-late-clock{
    background-image: url('../../assets/images/stayOutLateClock.png');
    background-size: 2.78rem .82rem;
  }
  .daily-data-banner-number{
    font-size:.24rem;
    font-family:STHeiti;
    color:rgba(255,255,255,1);
  }
  .daily-data-banner-text{
    font-size:.12rem;
    font-family:MicrosoftYaHei;
    color:rgba(255,255,255,1);
  }
  .daily-data-table-title{
    margin-right: .2rem;
  }
  .input-with-select{
      width: 1.93rem;
  }
  .tool-bar-search-select{
    width: 1.44rem;
  }
  .daily-data-table-container{
    margin-top: .1rem;
  }
  .daily-data-pagination-container{
    margin-top: .1rem;
    text-align: right;
  }
</style>
