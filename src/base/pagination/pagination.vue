<template>
	<div class="pagination">
    <el-button class="e_btn_pagination" @click="home">首页</el-button>
    <el-pagination
      class="pull-right clearfix"
      :pager-count="pageCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="total"
      >
    </el-pagination>
	</div>
</template>
 <script>
 export default {
  props:{
    pageCount:{
      type:Number,
      default:6
    },
    pageNum:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:10
    },
    total:{
      type:Number,
      default:0
    }
  },
  data:function(){
    return {
    }
  },
  methods:{
    // 首页
    home(){
      this.$emit('currentChange',1)
    },
    // 每页 ${val} 条
    handleSizeChange(val){
      this.$emit('sizeChange',val)
    },
    // 当前页: ${val}
    handleCurrentChange(val){
      this.$emit('currentChange',val)
    }
  }
 
}
</script>
<style>
.pagination{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: .18rem;
}
.el-pagination__editor.el-input .el-input__inner,
.el-pagination .el-select .el-input .el-input__inner{
  border-radius: 0 !important;
}
.e_btn_pagination{
  height: 28px;
  line-height: 28px;
  border-radius:0 !important;
  padding:0 5px !important;
}
.el-pagination .btn-prev{
  margin-right: 6px;
  padding-right:5px !important;
  border:1px solid #dcdfe6 !important;
}
.el-pagination .btn-next {
  margin-left: 6px;
  padding-left: 5px !important; 
  border: 1px solid #dcdfe6 !important;
}
.el-pager li{
    border:1px solid #dcdfe6 !important;
    margin:0 2px;
}
.el-pager li.active{
  border:1px solid #409EFF !important;
}
.btn-prev:before{
    content: "上一页";
}
.btn-next:before{
    content: "下一页";
}
.el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
    display: none !important;
}
</style>
