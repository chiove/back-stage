<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>每周数据</div>
      <div>
        <span class="tool-bar-search-babel">
          范围选择
        </span>
        <el-select v-model="weekValue" placeholder="周选择" ref="weekDom" @change="weekEventFun" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in weekListData"
            :key="item.weekNumber"
            :label="item.label"
            :value="item.weekNumber">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="daily-data-banner-container">
      <div class="daily-data-banner-title">
        {{collegeNames}}
      </div>
      <div class="data-chart-container">
        <div class="data-chart-ring" id="data-chart-ring"></div>
        <div class="data-chart-line" id="data-chart-line"></div>
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
        <!--<el-select v-model="majorListDataValue" @change="majorSelectFun" ref="majorValue" placeholder="全部专业" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in majorListData"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorId">
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
        <el-button  size="mini" @click="resetFormValue">重置</el-button>
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
        <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
        <el-table-column prop="bedCode" label="床号"></el-table-column>
        <el-table-column prop="stayoutDays" label="周未归次数" sortable="custom"></el-table-column>
        <el-table-column prop="stayoutLateDays" label="周晚归次数" sortable="custom"></el-table-column>
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
  require('echarts/theme/macarons');
  export default {
    name: "dailyData",
    watch:{
      weekValue:function (val) {
        /*默认渲染环形图*/
        this.getRingChartData(val)
        /*默认渲染折线图*/
        this.getLineChartData(val)
        /*表格渲染*/
        this.getTableData({
          userId:this.userId,
          weekNum:val
        })
      }
    },
    mounted:function(){
      this.userId = localStorage.getItem('userId')
      /*获取周数下拉列表*/
      this.getWeekListData()
      /*学院查询*/
      this.getCollegeListData(this.userId)
      /*辅导员下拉列表*/
      this.getInstuctorList()
      this.getCurrentWeek()
    },
    activated:function () {
      this.userId = localStorage.getItem('userId')
    },
    data(){
      return {
        userId:'',/*用户ID*/
        orgId:'',/*学院ID*/
        weekValue:1,/*周数下拉列表默认值*/
        weekListData:[{value:1,label:'第一周'}],/*周数下拉列表*/
        collegeNames:'全部学院',/*学院名称*/
        studentsTotal:0,/*周异常人数统计*/
        collegeListDataValue:'',/*学院下拉列表默认值*/
        collegeListData:[],/*学院下拉列表*/
        majorListDataValue:'',/*专业下拉列表默认值*/
        majorListData:[],/*专业下拉列表*/
        instructorListDataValue:'',/*辅导员下拉列表默认值*/
        instructorListData:[],/*辅导员下拉列表*/
        studentNameValue:'',/*学号，姓名默认值*/
        pageNo:1,/*当前页数*/
        pageTotal:1,/*总页数*/
        tableData: [],/*表格数据*/
        loadingStatus:false,/*加载显示*/
      }
    },
    methods: {
      /*获取周数下拉列表*/
      getWeekListData:function(){
       const _this = this
        this.$axios.get(process.env.API_HOST+'select-data/week-info/all',{
          params:{
            userId:this.userId
          }
        })
          .then(function (res) {
            res.data.data.forEach(function (item,index) {
              item.label = `第${item.weekNumber}周`
            })
            _this.weekListData = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*周选择后触发事件*/
      weekEventFun:function(data){
        this.weekValue = data
        /*默认渲染环形图*/
        this.getRingChartData(data)
        /*默认渲染折线图*/
        this.getLineChartData(data)
        /*表格渲染*/
        this.getTableData({
          userId:this.userId,
          weekNum:data
        })
      },
      /*查询环形图数据*/
      getRingChartData:function(weekNumber,orgId){
        const _this = this
        this.$axios.get(process.env.API_HOST+'analysis/exeception-stat-by-week',{
          params:{
            userId:this.userId,
            weekNumber :weekNumber,
            orgId:orgId
          }
        }).then(function (res) {
            /*渲染环形图*/
            _this.drawRing(res.data.data.weekNormalNum,res.data.data.weekStayoutLateNum,res.data.data.weekStayoutNum)
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*查询折线图数据*/
      getLineChartData:function(weekNumber,orgId){
        const _this = this
        this.$axios.get(process.env.API_HOST+'analysis/exeception-stat-by-day-of-week',{
          params:{
            userId:this.userId,
            weekNum:weekNumber,
            orgId:orgId
          }
        }).then(function (res) {
          if(res){
            if(res.data.data){
              /*渲染折线图*/
              let dateArray=[],stayOutLateArray=[],stayOutArray=[]
              res.data.data.forEach(function (item,index) {
                dateArray.push(item.date)
                stayOutLateArray.push(item.stayoutLateNum)
                stayOutArray.push(item.stayoutNum)
              })
              _this.drawLine(dateArray,stayOutLateArray,stayOutArray)
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*渲染环形图*/
      drawRing:function (weekNormalNum,weekStayoutLateNum,weekStayoutNum) {
        let dataChartRing = this.$echarts.init(document.getElementById('data-chart-ring'),'macarons')
        dataChartRing.setOption({
          title: { text: '本周各考勤人次占比' },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['到勤','晚归','未归']
          },
          series: [
            {
              name:'考勤状态',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:weekNormalNum, name:'到勤'},
                {value:weekStayoutLateNum, name:'晚归'},
                {value:weekStayoutNum, name:'未归'},
              ]
            }
          ]
          })
      },
      /*渲染折线图*/
      drawLine:function (dateArray,stayOutLateArray,stayOutArray) {
        let dataChartLine = this.$echarts.init(document.getElementById('data-chart-line'),'macarons')
        dataChartLine.setOption({
          title: {
            text: '本周晚归未归人数变化趋势'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['晚归','未归']
          },
          grid: {
            left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
            type: 'category',
              boundaryGap: false,
              data: dateArray
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'晚归',
              type:'line',
              stack: '晚归',
              data:stayOutLateArray
            },
            {
              name:'未归',
              type:'line',
              stack: '未归',
              data:stayOutArray
            }
          ]
        })
      },
      /*查询学院下拉列表*/
      getCollegeListData:function(userId){
        const _this = this
        this.$axios.get(process.env.API_HOST+'/select-data/secondary-college/query-by-user',{
          params:{
            userId:userId
          }
        }).then(function (res) {
          _this.collegeListData = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*学院下拉选择后触发事件*/
      collegeSelectFun:function(data){
        const _this = this
        this.orgId = data
        this.getInstuctorList()
        /*查询专业下拉列表*/
        this.$axios.get(process.env.API_HOST+'select-data/major-info/all',{
          params:{
            userId:this.userId,
            orgId:data
          }
        }).then(function (res) {
          _this.majorListData = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
        this.collegeListData.forEach(function (item,index) {
          if(item.collegeId===data){
            _this.collegeNames = item.collegeName
            /*默认渲染环形图*/
            _this.getRingChartData(_this.weekValue,item.collegeId)
            /*默认渲染折线图*/
            _this.getLineChartData(_this.weekValue,item.collegeId)
          }
        })
      },
      /*专业下拉选择后触发事件*/
      majorSelectFun:function(data){
        const _this = this
        const params = {
          userId:this.userId,
          majorId:this.$refs.collegeValue.value,
          orgId:data
        }
        this.$axios.get(process.env.API_HOST+'select-data/instructor-info/all',{params:params
        }).then(function (res) {
          _this.instructorListData = res.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*搜索按钮搜索*/
      searchSubmitFun:function(){
        /*表格查询*/
        const params = {
          userId:this.userId,
          weekNum:this.weekValue,
          orgId:this.$refs.collegeValue.value,
          instructorId:this.$refs.instructorValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
        }
        this.getTableData(params)
      },
      /*清空值*/
      resetFormValue(){
        this.collegeListDataValue = ''
        this.instructorListDataValue = ''
        this.studentNameValue = ''
        this.orgId = ''
        this.getInstuctorList()
      },
      /*表格查询*/
      getTableData:function(params){
        this.loadingStatus = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'analysis/exeception-clock-by-week',{params:params
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
        const params = {
          userId:this.userId,
          weekNum:this.weekValue,
          orgId:this.$refs.collegeValue.value,
          instructorId:this.$refs.instructorValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
          descOrAsc:descOrAsc,
          orderBy:data.prop,
          pageNo:this.pageNo
        }
        this.getTableData(params)
      },
      /*查看详情页*/
      handleClick(row) {
        this.$router.push({
          name:'studentsDetails',
          path: '/index/studentsDetails',
          query:row
        })
      },
      /*分页查询*/
      handleCurrentChange(val) {
        /*表格查询*/
        const params = {
          userId:this.userId,
          weekNum:this.weekValue,
          orgId:this.$refs.collegeValue.value,
          instructorId:this.$refs.instructorValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
          pageNo:val,
          pageSize:10
        }
        this.getTableData(params)
      },
      /*获取当前周*/
      getCurrentWeek(){
        const _this = this
        this.$axios.get(process.env.API_HOST+'select-data/curr-week',{
          params:{
            userId:this.userId
          }
        }).then(function (res) {
          if(res){
            if(res.data.code==='000000'){
              _this.weekValue = res.data.data
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*获取辅导员列表*/
      getInstuctorList(){
        const _this = this
        this.$axios.get(process.env.API_HOST+'/select-data/instructor-info/all',{
          params:{
            userId:this.userId,
            orgId:this.orgId
          }
        }).then(function (res) {
          if(res){
            _this.instructorListData = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
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
  .data-chart-container{
    display: flex;
    justify-content: flex-start;
    margin-bottom: .1rem;
  }
  .data-chart-ring{
    width: 4.32rem;
    height: 2.96rem;
    margin-right: .24rem;
    border-radius:6px;
    box-shadow:5px 0px 13px rgba(219,230,250,0.45);
  }
  .data-chart-line{
    width: 9rem;
    height: 2.96rem;
    border-radius:6px;
    box-shadow:5px 0px 13px rgba(219,230,250,0.45);
  }
  .daily-data-table-title{
    margin-right: .2rem;
  }
</style>
