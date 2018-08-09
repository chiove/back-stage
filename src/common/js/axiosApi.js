import axios from 'axios';
const server = '192.168.3.180';
export default {
  /*每日异常数据分页查询*/
  commonGetAjax:function(params,url){
    console.log("参数",typeof params)
    if(typeof params !== Object){
        params = {}
    }

    axios.get(url, {
      params:params
    })
      .then(function (response) {
        if(response){
          return response
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  commonPostAjax:function(params,url){
    if(typeof params !== Object){
      params = {}
    }
    axios.post(url,params)
      .then(function (response) {
        if(response){
          return response
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  dailyDataSearch:function (params) {
      this.commonGetAjax(params,server+'/analysis/exeception-clock-by-day')
  },
  weekDataSearch:function (params) {
    this.commonGetAjax(params,server+'/analysis/exeception-clock-by-day')
  }
}
