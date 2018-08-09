<template>
  <div class="body-container">
    <div class="students-care-title">学生关怀</div>
    <div class="students-care-tab-container">
      <div class="tool-bar-container">
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="可发起" name="first">
          <div class="daily-data-table-container">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
            >
              <el-table-column
                type="selection"
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
            <div>
              <el-button type="primary" size="mini">发起关怀</el-button>
              <el-button type="primary" size="mini">撤销关怀</el-button>
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="待处理" name="second">
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
            <div>
              <el-button type="primary" size="mini">撤销关怀</el-button>
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="已处理" name="third">
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
            <div></div>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentsCare",
      data(){
          return {
            value:'',
            activeName: 'first',
            options:'',
            currentPage:1,
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
        handleClick(tab, event) {
          console.log(tab, event);
        },
        formatter(row, column) {
          return row.address;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
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
