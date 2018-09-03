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
          <div class="students-details-banner-content-data-item arrive-clock">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalCared}}
            </div>
            <div class="students-details-banner-content-data-item-text">
              被关怀次数
            </div>
          </div>
          <div class="students-details-banner-content-data-item stay-out-clock">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalStayOut}}
            </div>
            <div class="students-details-banner-content-data-item-text">
              累计未归次数
            </div>
          </div>
          <div class="students-details-banner-content-data-item stay-out-late-clock">
            <div class="students-details-banner-content-data-item-number">
              {{dataList.totalStayOutLate}}
            </div>
            <div class="students-details-banner-content-data-item-text">
              累计晚归次数数
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="students-details-table">
      <div class="students-details-table-title">历史数据</div>
      <div class="students-details-table-tab">
        <div class="students-details-table-tab-search" v-if="showDate">
             <span class="tool-bar-search-babel">
               范围选择
             </span>
          <el-date-picker
            @change="selectDateFun"
            v-model="selectDate"
            type="month"
            size="mini"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="关怀反馈数据" name="first">
            <el-table :data="careListData"  v-loading="loadingStatus" style="width: 100%">
              <el-table-column prop="taskDate" label="任务时间"></el-table-column>
              <el-table-column prop="dealDate" label="处理时间"></el-table-column>
              <el-table-column prop="remark" label="反馈结果"></el-table-column>
            </el-table>
            <div class="daily-data-pagination-container">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="carePageNo"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="carePageTotal">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="门禁打卡数据" name="second">
            <el-table :data="doorListData"  v-loading="loadingStatus" style="width: 100%">
              <el-table-column prop="lastUpdateTime" label="打卡时间"></el-table-column>
              <el-table-column prop="operateAppName" label="打卡设备"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="历史打卡数据" name="third">
            <el-table :data="historyListData"  v-loading="loadingStatus" style="width: 100%">
              <el-table-column prop="clockDate" label="考勤日期"></el-table-column>
              <el-table-column prop="operateAppName" label="操作应用"></el-table-column>
              <el-table-column prop="operatorName" label="操作人"></el-table-column>
              <el-table-column prop="clockStatus" label="考勤状态"></el-table-column>
              <el-table-column
                label="历史记录"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="historyDetailsFun(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="changeStatusFun(scope.row)" type="text" size="small">修改状态</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="修改状态"
      :visible.sync="changeStatus"
      width="30%"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="考勤状态">
            <el-select v-model="ruleForm.clockStatus" style="width: 100%" placeholder="请选择活动区域">
              <el-option label="到勤" value="2"></el-option>
              <el-option label="晚归" value="3"></el-option>
              <el-option label="未归" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"  placeholder="必填" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changeStatus = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="onSubmit('form')" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="历史详情"
      :visible.sync="historyDetails"
      width="30%"
    >
      <div>
        <el-table :data="historyListData"  v-loading="loadingStatus" style="width: 100%">
          <el-table-column prop="lastUpdateTime" label="操作时间日期"></el-table-column>
          <el-table-column prop="operateAppName" label="操作应用"></el-table-column>
          <el-table-column prop="operatorName" label="操作人"></el-table-column>
          <el-table-column prop="clockStatus" label="考勤状态"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="historyDetails = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="historyDetails = false" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "studentsDetails",
    mounted:function(){
      if(this.$route.params){
        this.dataList = this.$route.params
        this.studentId = this.$route.params.studentId
      }
      this.selectDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
      if(this.selectDate){
        this.year = this.selectDate.substring(0,4)
        this.month = this.selectDate.substring(5,this.selectDate.length)
      }
      this.getAlCareListData()
    },
    activated:function(){
      this.selectDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}`
      if(this.selectDate){
        this.year = this.selectDate.substring(0,4)
        this.month = this.selectDate.substring(5,this.selectDate.length)
      }
      if(this.$route.params){
        this.dataList = this.$route.params
        this.studentId = this.$route.params.studentId
      }
      this.getAlCareListData()
    },
    data() {
      return {
        dataList:{},/*详情页数据*/
        studentId:1,/*学生ID*/
        clockListData:[],/*门禁打卡数据*/
        historyClockListData:[],/*历史打卡数据*/
        loadingStatus:false,/*加载显示*/
        activeName: 'first',
        careListData:[],/*已关怀列表数据*/
        carePageNo:1,/*已关怀当前页*/
        carePageTotal:0,/*关怀总页数*/
        doorListData:[],/*门禁数据*/
        historyListData:[],/*历史打卡数据*/
        selectDate:'',
        year:'',
        month:'',
        showDate:false,
        changeStatus:false,
        historyDetails:false,
        ruleForm: {
          clockStatus: '',
          remark: '',
        },
        rules: {
          clockStatus: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      /*返回上一级路由*/
      backRouterFun:function(){
        this.$router.go(-1)
      },
      /*tab切换触发事件*/
      handleClick(tab, event) {
        this.activeName = tab.name
        if(tab.name==='first'){
          this.showDate = false
          this.getAlCareListData()
        }else if(tab.name==='second'){
          this.showDate=true
          this.getClockListData()
        }else if(tab.name==='third'){
          this.showDate=true
          this.getHistoryClockListData()
        }
      },
      /*获取已关怀列表*/
      getAlCareListData:function () {
        this.loadingStatus = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'care-student',{
          params:{
            studentId:_this.studentId,
            pageNo:_this.carePageNo,
            pageSize:10
          }
        }).then(function (res) {
          if(res){
            _this.careListData = res.data.result
            _this.carePageNo =  res.data.pageNo
            _this.carePageTotal = res.data.totalPages
          }
        }).catch(function (error) {
          console.log(error)
        })
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      getClockListData:function () {
        this.loadingStatus = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'student-clock',{
          params:{
            studentId:_this.studentId,
            month:_this.month,
            year:_this.year
          }
        }).then(function (res) {
          if(res){
            _this.doorListData = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      getHistoryClockListData:function () {
        this.loadingStatus = true
        const _this = this
        this.$axios.get(process.env.API_HOST+'student-clock',{
          params:{
            studentId:_this.studentId,
            month:_this.month,
            year:_this.year,
          }
        }).then(function (res) {
          if(res){
            res.data.data.forEach(function (item,index) {
              if(item.clockStatus==1){
                item.clockStatus = '未打卡'
              }else  if(item.clockStatus==2){
                item.clockStatus = '到勤'
              }else  if(item.clockStatus==3){
                item.clockStatus = '晚归'
              }else  if(item.clockStatus==4){
                item.clockStatus = '未归'
              }
            })
            _this.historyListData = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      /*分页查询*/
      handleCurrentChange(val) {
        if(this.activeName ==='first'){
          this.carePageNo = val
          this.getAlCareListData()
        }
      },
      /*时间选择查询*/
      selectDateFun(){
        if(this.selectDate){
          this.year = this.selectDate.getFullYear()
          this.month = this.selectDate.getMonth()+1
        }
        if(this.activeName ==='first'){
          this.getAlCareListData()
        }else if(this.activeName ==='second'){
          this.getClockListData()
        }else if(this.activeName ==='third'){
          this.getHistoryClockListData()
        }
      },
      historyDetailsFun(data){
        if(data){
          this.historyDetails = true
        }
      },
      changeStatusFun(data){
        if(data){
          this.changeStatus = true
          this.clockDateParam = `${data.year}${data.month}${data.day}`
          this.operatorNameParam = data.operatorName
          this.operatorIdParam = data.operatorId
        }
      },
      onSubmit(){
        if(this.ruleForm.remark&&this.ruleForm.clockStatus){
          this.changeStatus = false
          const _this = this
          this.$axios.put(process.env.API_HOST+'student-clock',{
            appType:2,
            id:this.studentId,
            operatorName:this.operatorNameParam,
            operatorId:this.operatorIdParam,
            status:this.ruleForm.clockStatus,
            clockDate:this.clockDateParam,
            remark:this.ruleForm.remark
          }).then(function (res) {
            if(res){
              if (res.data.code==='000000'){
                _this.$notify({
                  title:'提示',
                  message:'修改成功',
                  type:'success',
                  position:'bottom-right'
                })
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
        }else{
          this.$notify({
            title:'提示',
            message:'未填写完毕',
            type:'warning',
            position:'bottom-right'
          })
        }
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
    text-align: center;
    height: 1rem;
  }
  .stay-out-clock{
    background-image: url('../../assets/images/stayOutClock.png');
    background-size: 1.9rem 1rem;
  }
  .stay-out-late-clock{
    background-image: url('../../assets/images/stayOutLateClock.png');
    background-size: 1.9rem 1rem;
  }
  .arrive-clock{
    background-image: url('../../assets/images/arriveClock.png');
    background-size: 1.9rem 1rem;
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
