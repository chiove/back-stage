<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>辅导员查寝签到</div>
      <div>
        <el-select v-model="collegeListDataValue" ref="collegeValue" placeholder="全部学院" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in collegeListData"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
        <el-input placeholder="请输入工号/姓名搜索" ref="studentNameDom" v-model="teacherNameValue" class="input-with-select" size="mini">
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchSubmitFun">搜索</el-button>
      </div>
    </div>
    <div class="daily-data-table-container">
      <el-table :data="tableData" @sort-change="sortChange1"  v-loading="loadingStatus" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="code" label="工号"></el-table-column>
        <el-table-column prop="collegeName" label="学院名称"></el-table-column>
        <el-table-column prop="responsibleStudent" label="负责学生数" sortable="custom"></el-table-column>
        <el-table-column prop="clockCount" label="打卡次数" sortable="custom"></el-table-column>
        <el-table-column prop="dealCareCount" label="处理关怀次数" sortable="custom"></el-table-column>
        <!--<el-table-column prop="totalLayOutCount" label="累计未归学生" sortable="custom"></el-table-column>
        <el-table-column prop="totalLayOutLateCount" label="累计晚归学生" sortable="custom"></el-table-column>-->
        <el-table-column label="打卡记录">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="downLoadFun(scope.row)" type="text" size="small">下载</el-button>
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
    <el-dialog
      title="打卡记录"
      :visible.sync="viewDetails"
      width="30%"
      >
      <div>
        <el-table
          :data="tableDetailsData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="code"
            label="工号"
           >
          </el-table-column>
          <el-table-column
            prop="clockTime"
            label="打卡时间">
          </el-table-column>
        </el-table>
        <div class="daily-data-pagination-container">
          <el-pagination
            layout="prev, pager, next"
            @current-change="historyDetails"
            :current-page.sync="historyCurrentPage"
            :total="historyCount">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="viewDetails = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="viewDetails = false" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "studentsSearch",
    mounted:function(){
      this.userId = localStorage.getItem('userId')
      /*查询学院下拉列表*/
      this.getCollegeListData(this.userId)
      /*查询表格数据*/
      const params = {
        userId:this.userId,
        orgId:this.$refs.collegeValue.value,
        nameOrCode:this.$refs.studentNameDom.value,
      }
      this.getTableData(params)
    },
    activated:function () {
      this.userId = localStorage.getItem('userId')
    },
    data(){
      return {
        userId:'',/*用户ID*/
        collegeListDataValue:'',/*学院下拉列表默认值*/
        collegeListData:[],/*学院下拉列表*/
        teacherNameValue:'',
        pageNo:1,/*当前页*/
        pageTotal:1,/*总页数*/
        tableData: [],/*表格数据*/
        loadingStatus:false,/*加载显示*/
        viewDetails:false,/*查看详情*/
        tableDetailsData:[],/*详情页面table数据*/
        historyCount:'',
        historyCurrentPage:1,
      }
    },
    methods:{
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
      /*搜索按钮搜索*/
      searchSubmitFun:function(){
        /*表格查询*/
        const params = {
          userId:this.userId,
          orgId:this.$refs.collegeValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
        }
        this.getTableData(params)
      },
      /*表格查询*/
      getTableData:function(params){
        this.loadingStatus = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'analysis/instructor-stat',{params:params
        }).then(function (res) {
          _this.tableData = res.data.data.result
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
          pageNo:this.pageNo,
          pageSize:10,
          orgId:this.$refs.collegeValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
          descOrAsc:descOrAsc,
          orderBy:data.prop
        }
        this.getTableData(params)
      },
      /*查看详情页*/
      handleClick(row) {
        this.viewDetails = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'instructor-clock',{
          params:{
            instructorId:row.userId
          }
        }).then(function (res) {
          if(res){
            _this.historyCount = res.data.data.totalCount
            _this.tableDetailsData= res.data.data.result
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*下载excel*/
      downLoadFun:function(){

      },
      /*分页查询*/
      handleCurrentChange(val) {
        /*表格查询*/
        const params = {
          userId:this.userId,
          orgId:this.$refs.collegeValue.value,
          nameOrCode:this.$refs.studentNameDom.value,
          pageNo:val,
          pageSize:10
        }
        this.getTableData(params)
      },
      historyDetails(){
        const _this = this
        this.$axios.get(process.env.API_HOST+'instructor-clock',{
          params:{
            userId:this.userId,
            pageNo:this.historyCurrentPage+1,
            instructorId:row.userId
          }
        }).then(function (res) {
          if(res){
            _this.historyCount = res.data.data.totalCount
            _this.tableDetailsData= res.data.data.result
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
