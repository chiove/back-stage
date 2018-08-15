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
          return response
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
          return response
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

}
