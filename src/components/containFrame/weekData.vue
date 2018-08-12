<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>每周数据</div>
      <div>
        <span class="tool-bar-search-babel">
          范围选择
        </span>
        <el-date-picker
          v-model="value"
          type="date"
          size="mini"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="daily-data-banner-container">
      <div class="daily-data-banner-title">
        XXXXXXXX学院
      </div>
      <div class="data-chart-container">
        <div class="data-chart-ring" id="data-chart-ring"></div>
        <div class="data-chart-line" id="data-chart-line"></div>
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
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
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
  require('echarts/theme/macarons');
  export default {
    name: "dailyData",
    mounted:function(){
      this.drawRing()
      this.drawLine()
    },
    data(){
      return {
        value:'',
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
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
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
      formatter(row, column) {
        return row.address;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      drawRing:function () {
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
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
            {
              name:'访问来源',
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
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ]
            }
          ]
          })
      },
      drawLine:function () {
        let dataChartLine = this.$echarts.init(document.getElementById('data-chart-line'),'macarons')
        dataChartLine.setOption({
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告']
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
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            }
          ]
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
    width: 5.99rem;
    height: 2.96rem;
    border-radius:6px;
    box-shadow:5px 0px 13px rgba(219,230,250,0.45);
  }
  .daily-data-table-title{
    margin-right: .2rem;
  }
</style>
