export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
	param: 'jsonpCallback'
}

export const ERR_OK = 0

import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
const $vue = new Vue()
Vue.use(Router)
export const getDataApi = (action,pars) => {
	const data = Object.assign({}, pars)
		return new Promise((resolve) => {
			axios({
			  	method: 'post',
			  	url: window.REQUEST_URL+action,
			  	params: data
			}).then((res) => {
				if(res.data.code == 30006 && action != 'enterprise/yzm'){
					$vue.$message.error(res.data.message);
	                setTimeout(()=>{
	                	// if($vue.$router){
	                	// 	$vue.$router.push('/login');
	                	// }else{
	                		// window.location.href = config.domain+'/tswcClient/com.html#/login';
	                	// }
	                },1000);
	                return
				}
			  	resolve(res.data)
		})
	})

}