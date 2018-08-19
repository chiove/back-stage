import axios from 'axios'
export default {
  axiosGet: function (url,params) {
    if(url){
      if(typeof params !== Object){
        params = {}
      }
      axios.get(url, {
        params:params
      })
        .then(function (response) {
          return resolve(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  axiosPost:function (url,data) {
    if(url) {
      if (typeof data !== Object) {
        data = {}
      }
      axios.post(url, data)
        .then(function (response) {
          result = response
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  axiosPut:function (url,data) {
    if(url) {
      if (typeof data !== Object) {
        data = {}
      }
      axios.post(url, data)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  /*每日数据页面*/
    /*1、下拉数据查询接口-根据用户ID查询学院列表 GET /select-data/secondary-college/query-by-user*/
    getSchoolList:function (userId) {
      this.axiosGet('/api/select-data/secondary-college/query-by-user',{
        userId:userId
      })
    },
    /*2、晚归考勤分析模块接口-每日异常数据统计 GET /analysis/exeception-stat-by-day 拿到昨日晚归昨日未归数据*/
  getDailyExeceptionTotal:function (data) {
    /*{date}必填yyyy-MM-dd*/
    /*{orgId}机构ID可选*/
    this.axiosGet('/api/analysis/exeception-stat-by-day',data)
  },
    /*3、晚归考勤分析模块接口-每日异常数据分页查询 GET /analysis/exeception-clock-by-day  总数从里面拿*/
  getDailyExeceptionPagenation:function (data) {
    /*{date}必填yyyy-MM-dd*/
    /*{clockStatus,descOrAsc,instructor,instructor,nameOrCode,orderBy,orgId}可选*/
    this.axiosGet('/api/analysis/exeception-clock-by-day',data)
  },
    /*4、下拉数据查询接口-专业信息 GET /select-data/major-info/all  可以根据院系来查，或者查全部的。*/
  getSelectMajorList:function (data) {
    /*{orgId}院系可选*/
    const result = this.axiosGet('/api/select-data/major-info/all',data)
    console.log(result,666)
    return result
  },
    /*5、下拉数据查询接口-查询辅导员列表 GET /select-data/instructor-info/all 根据院系，专业来查辅导员，参数都可以不填。*/
  getSelectTeacherList:function (data) {
    /*{majorId,orgId}专业ID院系ID*/
    this.axiosGet('/api/select-data/instructor-info/all',data)
  },
  /*每周数据页面*/
    /*1、晚归考勤分析模块接口-每周异常数据统计 GET /analysis/exeception-stat-by-week*/
    getWeekExeceptionTotal:function (data) {
      /*{orgId}可选*/
      /*{weekNumber}必填*/
      this.axiosGet('/api/analysis/exeception-stat-by-week',data)
    },
    /*2、晚归考勤分析模块接口-每周异常数据列表统计 GET /analysis/exeception-stat-by-day-of-week  趋势图用*/
  getWeekExeceptionChart:function (data) {
    /*{orgId}可选*/
    /*{weekNumber}必填*/
    this.axiosGet('/api/analysis/exeception-stat-by-day-of-week',data)
  },
    /*3、晚归考勤分析模块接口-每日异常数据分页查询 GET /analysis/exeception-clock-by-week*/
  getWeekExeceptionPagenation:function (data) {
    /*{clockStatus,descOrAsc,instructor,majorId,nameOrCode,orderBy,orgId}可选*/
    /*{weekNum}必填*/
    this.axiosGet('/api/analysis/exeception-clock-by-week',data)
  },
  /*学生关怀页面*/
    /*1、学生关怀模块接口-分页获取可发起关怀列表 GET /analysis/care/can-start*/
    getCareStudentList:function (data) {
      /*{descOrAsc,instructorId,majorId,nameOrCode,orderBy,orgId,pageNo,pageSize}可选*/
      this.axiosGet('/api/analysis/care/can-start',data)
    },
    /*2、学生关怀模块接口-分页获取已发起/已处理关怀列表 GET /analysis/student-care*/
  getCaredStudentList:function (data) {
    /*{careStatus,descOrAsc,instructorId,majorId,nameOrCode,orderBy,orgId,pageNo,pageSize}可选*/
    this.axiosGet('/api/analysis/student-care',data)
  },
    /*3、学生关怀模块接口-发起学生关怀 POST /analysis/start-student-care*/
  postStartStudentsCare:function (operatorId,studentIds) {
    this.axiosPost('/api/analysis/start-student-care',{
      operatorId:operatorId,
      studentIds:studentIds
    })
  },
    /*4、学生关怀模块接口-撤销学生关怀 PUT /analysis/delete-student-care*/
  putDeleteStudentCare:function (operatorId,studentIds) {
    this.axiosPut('/api/analysis/delete-student-care',{
      operatorId:operatorId,
      studentIds:studentIds
    })
  },
 /*学生考勤查询*/
    /*1、后台-考勤数据复核模块接口-数据复核分页查询 GET /data-recheck/student-clock-care-stat*/
    getRecheckPagenationData:function (data) {
      /*{buildingId,instructor,majorId,nameOrCode,orgId,pageNo,pageSize}可选*/
      this.axiosGet('/api/data-recheck/student-clock-care-stat',data)
    },
  /*辅导员查寝签到*/
     /*1、辅导员操作接口-辅导员查寝签到-分页获取辅导员打卡统计 GET /analysis/instructor-stat*/
     getTeacherClockTotal:function (data) {
       /*{descOrAsc,orderBy,nameOrCode,orgId,pageNo,pageSize}可选*/
       this.axiosGet('/api/analysis/instructor-stat',data)
     }
}
