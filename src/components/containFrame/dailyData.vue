<template>
    <div class="body-container">
      <div class="tool-bar-container-border">
          <div>每日数据</div>
          <div>
            <span class="tool-bar-search-babel">
              范围选择
            </span>
            <el-date-picker
              v-model="searchDateValue"
              type="date"
              size="mini"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
          </div>
        </div>
      <div class="daily-data-banner-container">
        <div class="daily-data-banner-title">
          XXXXXXXX学院
        </div>
        <div class="daily-data-banner-content">
          <div class="daily-data-banner-item">
            <div class="daily-data-banner-number">
              200
            </div>
            <div class="daily-data-banner-text">
              昨日晚归人数
            </div>
          </div>
          <div class="daily-data-banner-item">
            <div class="daily-data-banner-number">
              50
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
          <span>合计400人</span>
        </div>
        <div>
          <el-select v-model="value" placeholder="全部学院" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="全部专业" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="状态不限" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="全部辅导员" size="mini" class="tool-bar-search-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入学号/姓名搜索" v-model="value" class="input-with-select" size="mini">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        </div>
      </div>
      <div class="daily-data-table-container">
        <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'name', order: 'descending'}">
          <el-table-column prop="name" label="姓名" sortable></el-table-column>
          <el-table-column prop="studentCode" label="学号" sortable></el-table-column>
          <el-table-column prop="className" label="班级" sortable></el-table-column>
          <el-table-column prop="collegeName" label="学院名称" sortable></el-table-column>
          <el-table-column prop="majorName" label="专业名称" sortable></el-table-column>
          <el-table-column prop="instructorName" label="辅导员" sortable></el-table-column>
          <el-table-column prop="buildingName" label="宿舍楼栋" sortable></el-table-column>
          <el-table-column prop="dormitoryName" label="寝室号" sortable></el-table-column>
          <el-table-column prop="bedCode" label="床号" sortable></el-table-column>
          <el-table-column prop="clockStatus" label="昨日考勤状态"></el-table-column>
          <el-table-column prop="continuousStayoutDays" label="连续未归天数" sortable></el-table-column>
          <el-table-column prop="continuousStayoutLateDays" label="连续晚归天数" sortable></el-table-column>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import axios from '../../common/js/axios'
  import getDate from '../../common/js/tools'
    export default {
      name: "dailyData",
      mounted:function(){
        const newDate = getDate.getCurrentTime('date')
        const yesterday = `${newDate.year}-${newDate.month}-${newDate.day-1}`
        this.searchDateValue = yesterday
      },
      data(){
          return {
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e5
              }
            },
            searchDateValue:'',
            data:{},
            value:'2018-08-14',
            currentPage:1,
            search:'',
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            tableData: [{
              date: '2016-05-02',
              name: 'sdffs',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '1111',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }]
          }
      },
      methods: {
        handleClick(row) {
          console.log(row);
        },
        formatter(row, column) {
          return row.address;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
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
    background: #2184C5;
    text-align: center;
    margin-right: .12rem;
    border-radius: .04rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
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
