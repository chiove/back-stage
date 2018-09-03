<template>
  <div class="body-container">
    <div class="students-care-title">学生关怀</div>
    <div class="students-care-tab-container">
      <div class="tool-bar-container">
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
      <el-tabs v-model="tabActive" @tab-click="tabChangeFun">
        <el-tab-pane label="可发起" name="first">
          <div class="daily-data-table-container">
            <el-table :data="tableData" @sort-change="sortChange1" v-loading="loadingStatus" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="studentName" label="姓名"></el-table-column>
              <el-table-column prop="studentCode" label="学号"></el-table-column>
              <el-table-column prop="className" label="班级"></el-table-column>
              <el-table-column prop="collegeName" label="学院名称"></el-table-column>
              <el-table-column prop="majorName" label="专业名称"></el-table-column>
              <el-table-column prop="instructorName" label="辅导员"></el-table-column>
              <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
              <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
              <el-table-column prop="bedCode" label="床号"></el-table-column>
              <el-table-column prop="totalCared" label="被关怀次数"></el-table-column>
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
            <div>
              <el-button type="primary" size="mini" @click="startCareFun">发起关怀</el-button>
              <el-button type="primary" size="mini" @click="deleteCareFun">撤销关怀</el-button>
            </div>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="pageTotal">
              </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待处理" name="second">
          <div class="daily-data-table-container">
            <el-table :data="tableData"  @sort-change="sortChange1" v-loading="loadingStatus" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="studentName" label="姓名"></el-table-column>
              <el-table-column prop="studentCode" label="学号"></el-table-column>
              <el-table-column prop="className" label="班级"></el-table-column>
              <el-table-column prop="collegeName" label="学院名称"></el-table-column>
              <el-table-column prop="majorName" label="专业名称"></el-table-column>
              <el-table-column prop="instructorName" label="辅导员"></el-table-column>
              <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
              <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
              <el-table-column prop="bedCode" label="床号"></el-table-column>
              <!--<el-table-column prop="totalCared" label="被关怀次数"></el-table-column>
              <el-table-column prop="continuousStayoutDays" label="连续未归天数" sortable="custom"></el-table-column>
              <el-table-column prop="continuousStayoutLateDays" label="连续晚归天数" sortable="custom"></el-table-column>-->
              <!--<el-table-column prop="" label="关怀状态"></el-table-column>-->
              <el-table-column label="个人详情">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="daily-data-pagination-container">
            <div>
              <el-button type="primary" size="mini" @click="deleteCareFun">撤销关怀</el-button>
            </div>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="third">
          <div class="daily-data-table-container">
            <el-table :data="tableData" @sort-change="sortChange1" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
              <el-table-column prop="studentName" label="姓名"></el-table-column>
              <el-table-column prop="studentCode" label="学号"></el-table-column>
              <el-table-column prop="className" label="班级"></el-table-column>
              <el-table-column prop="collegeName" label="学院名称"></el-table-column>
              <el-table-column prop="majorName" label="专业名称"></el-table-column>
              <el-table-column prop="instructorName" label="辅导员"></el-table-column>
              <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
              <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
              <el-table-column prop="bedCode" label="床号"></el-table-column>
              <el-table-column label="个人详情">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="daily-data-pagination-container">
            <div></div>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
      name: "studentsCare",
      mounted: function () {
        this.userId = localStorage.getItem('userId')
        let params = {
          orgId: this.$refs.collegeValue.value,
          majorId: this.$refs.majorValue.value,
          instructor: this.$refs.instructorValue.value,
          nameOrCode: this.$refs.studentNameDom.value,
        }
        /*查询学院下拉列表*/
        this.getCollegeListData()
        /*默认发起未关怀表格数据*/
        this.getTableData(params)
      },
      activated:function () {
        this.userId = localStorage.getItem('userId')
      },
      data() {
        return {
          userId: '', /*用户ID*/
          collegeListDataValue: '', /*学院下拉列表默认值*/
          collegeListData: [], /*学院下拉列表*/
          majorListDataValue: '', /*专业下拉列表默认值*/
          majorListData: [], /*专业下拉列表*/
          instructorListDataValue: '', /*辅导员下拉列表默认值*/
          instructorListData: [], /*辅导员下拉列表*/
          studentNameValue: '', /*学号，姓名默认值*/
          pageNo: 1, /*当前页数*/
          pageTotal: 1, /*总页数*/
          tableData: [], /*表格数据*/
          tabActive: 'first',/*tab当前状态*/
          multipleSelection:'',/*发起关怀选中行*/
          willConfirm:'',/*待处理选中行*/
          loadingStatus:false/*加载显示*/
        }
      },
      methods: {
        /*查询学院下拉列表*/
        getCollegeListData: function () {
          const _this = this
          this.$axios.get(process.env.API_HOST+'/select-data/secondary-college/all').then(function (res) {
            _this.collegeListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*学院下拉选择后触发事件*/
        collegeSelectFun: function (data) {
          const _this = this
          this.collegeListData.forEach(function (item, index) {
            if (item.collegeId === data) {
              _this.collegeNames = item.collegeName
            }
          })
          /*查询专业下拉列表*/
          this.$axios.get(process.env.API_HOST+'select-data/major-info/all', {
            params: {orgId: data}
          }).then(function (res) {
            _this.majorListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*专业下拉选择后触发事件*/
        majorSelectFun: function (data) {
          const _this = this
          const params = {
            majorId: this.$refs.collegeValue.value,
            orgId: data
          }
          this.$axios.get(process.env.API_HOST+'select-data/instructor-info/all', {
            params: params
          }).then(function (res) {
            _this.instructorListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*搜索按钮搜索*/
        searchSubmitFun: function () {
          /*表格查询*/
          let params = {
            orgId: this.$refs.collegeValue.value,
            majorId: this.$refs.majorValue.value,
            instructor: this.$refs.instructorValue.value,
            nameOrCode: this.$refs.studentNameDom.value,
          }
          if (this.tabActive === 'first') {
            this.getTableData(params)
          } else if (this.tabActive === 'second') {
            params.careStatus = 1
            this.getAlCareTableList(params)
          } else {
            params.careStatus = 2
            this.getAlCareTableList(params)
          }
        },
        /*表格查询*/
        getTableData: function (params) {
          this.loadingStatus = true
          const _this = this
          this.$axios.get(process.env.API_HOST+'analysis/care/can-start', {
            params: params
          }).then(function (res) {
            _this.tableData = res.data.data.result
            _this.pageTotal = res.data.data.totalCount
            _this.pageNo = res.data.data.pageNo
          }).catch(function (error) {
            console.log(error)
          })
          setTimeout(() => {
            this.loadingStatus = false
          }, 2000)
        },
        /*待处理和已关怀表格查询*/
        getAlCareTableList: function (params) {
          this.loadingStatus = true
          const _this = this
          this.$axios.get(process.env.API_HOST+'analysis/student-care', {
            params: params
          }).then(function (res) {
            _this.tableData = res.data.data.result
            _this.pageTotal = res.data.data.totalCount
            _this.pageNo = res.data.data.pageNo
          }).catch(function (error) {
            console.log(error)
          })
          setTimeout(() => {
            this.loadingStatus = false
          }, 3000)
        },
        /*排序查询*/
        sortChange1: function (data) {
          let descOrAsc = ''
          if (data.order === "ascending") {
            descOrAsc = 'asc'
          } else if (data.order === "descending") {
            descOrAsc = 'desc'
          }
          let params = {
            orgId: this.$refs.collegeValue.value,
            majorId: this.$refs.majorValue.value,
            instructor: this.$refs.instructorValue.value,
            nameOrCode: this.$refs.studentNameDom.value,
            descOrAsc: descOrAsc,
            orderBy: data.prop
          }
          if (this.tabActive === 'first') {
            this.getTableData(params)
          } else if (this.tabActive === 'second') {
            params.careStatus = 1
            this.getAlCareTableList(params)
          } else {
            params.careStatus = 2
            this.getAlCareTableList(params)
          }
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
          let params = {
            orgId: this.$refs.collegeValue.value,
            majorId: this.$refs.majorValue.value,
            instructor: this.$refs.instructorValue.value,
            nameOrCode: this.$refs.studentNameDom.value,
            pageNo: val,
            pageSize: 10
          }
          if (this.tabActive === 'first') {
            this.getTableData(params)
          } else if (this.tabActive === 'second') {
            params.careStatus = 1
            this.getAlCareTableList(params)
          } else {
            params.careStatus = 2
            this.getAlCareTableList(params)
          }
        },
        /*勾选行事件*/
        handleSelectionChange:function (val) {
          if (this.tabActive === 'first') {
            this.multipleSelection = val;
          } else if (this.tabActive === 'second') {
            this.willConfirm = val
          }
        },
        /*面板切换查询表格数据*/
        tabChangeFun: function (data) {
          if (data.name === 'first') {
            this.tabActive = 'first'
            const params = {
              orgId: this.$refs.collegeValue.value,
              majorId: this.$refs.majorValue.value,
              instructor: this.$refs.instructorValue.value,
              nameOrCode: this.$refs.studentNameDom.value,
            }
            this.getTableData(params)
          } else if (data.name === 'second') {
            this.tabActive = 'second'
            const params = {
              careStatus: 1,
              orgId: this.$refs.collegeValue.value,
              majorId: this.$refs.majorValue.value,
              instructor: this.$refs.instructorValue.value,
              nameOrCode: this.$refs.studentNameDom.value,
            }
            this.getAlCareTableList(params)
          } else {
            this.tabActive = 'third'
            const params = {
              careStatus: 2,
              orgId: this.$refs.collegeValue.value,
              majorId: this.$refs.majorValue.value,
              instructor: this.$refs.instructorValue.value,
              nameOrCode: this.$refs.studentNameDom.value,
            }
            this.getAlCareTableList(params)
          }
        },
        /*发起学生关怀*/
        startCareFun:function(){
          if(this.multipleSelection.length>0){
            let studentIds = []
            this.multipleSelection.forEach(function (item,index) {
              studentIds.push(item.studentId)
            })
            this.startCareData(studentIds,this.userId)
          }else{
            this.$notify.error({
              title:'提示',
              message:'至少选择一条',
              position: 'bottom-right'
            })
          }
        },
        /*撤销关怀*/
        deleteCareFun:function(){
           if (this.tabActive === 'first') {
              if(this.multipleSelection.length>0){
                let studentIds = []
                this.multipleSelection.forEach(function (item,index) {
                  studentIds.push(item.studentId)
                })
                this.deleteCareData(studentIds,this.userId)
              }else{
                 this.$notify.error({
                   title:'提示',
                   message:'至少选择一条',
                   position: 'bottom-right'
                 })
              }
           } else if (this.tabActive === 'second') {
             if(this.willConfirm.length>0){
               let studentIdwill = []
               this.willConfirm.forEach(function (item,index) {
                 studentIdwill.push(item.studentId)
               })
               this.deleteCareData(studentIdwill,this.userId)
             }else{
               this.$notify.error({
                 title:'提示',
                 message:'至少选择一条',
                 position: 'bottom-right'
               })
             }
           }
        },
        /*发起学生关怀数据查询*/
        startCareData:function (studentIds,operatorId ) {
          const _this = this
          this.$axios.post(`${process.env.API_HOST}analysis/start-student-care?studentIds=${studentIds}&operatorId=${operatorId}`).then(function (res) {
            if(res){
              if(res.data.code === '000000'){
                let params = {
                  orgId: _this.$refs.collegeValue.value,
                  majorId: _this.$refs.majorValue.value,
                  instructor: _this.$refs.instructorValue.value,
                  nameOrCode: _this.$refs.studentNameDom.value,
                }
                if (_this.tabActive === 'first') {
                  _this.getTableData(params)
                }
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*删除学生关怀*/
        deleteCareData:function (careIds,operatorId) {
          const _this = this
          this.$axios.put(process.env.API_HOST+'analysis/delete-student-care',{
            careIds:careIds,
            operatorId:operatorId
          }).then(function (res) {
            if(res){
              _this.$notify({
                message: res.data.message,
                type: 'warning',
                position:'bottom-right'
              })
              let params = {
                orgId: _this.$refs.collegeValue.value,
                majorId: _this.$refs.majorValue.value,
                instructor: _this.$refs.instructorValue.value,
                nameOrCode: _this.$refs.studentNameDom.value,
              }
              if (_this.tabActive === 'first') {
                _this.getTableData(params)
              } else if (_this.tabActive === 'second') {
                params.careStatus = 1
                _this.getAlCareTableList(params)
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>
  .tool-bar-container{
    justify-content: flex-end!important;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
  }
  .students-care-title{
    font-size:.14rem;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(85,85,85,1);
    height: .4rem;
  }
  .students-care-tab-container{
    position: relative;
  }
  .daily-data-pagination-container{
    display: flex;
    justify-content: space-between;
  }
</style>
