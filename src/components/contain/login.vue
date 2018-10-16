<template>
  <div class="main-body">
    <div class="main_logo">
      <img src="../../assets/images/loginlogo.png">
      <span>晚归考勤分析系统</span>
    </div>
    <div class="main">
      <el-form :model="ruleForm" :rules="rulesState?rules2:rules3" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <div class="title"><h3>系统登录</h3></div>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号" v-on:keyup.enter="handleSubmit2"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" v-if="see">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码" v-on:keyup.enter="handleSubmit2"></el-input>
          <span @click.stop="changebg()" v-if="ruleForm.checkPass.length < 7"></span>
        </el-form-item>
        <!--<el-form-item prop="checkPass" v-else>
          <el-input type="text" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码" v-on:keyup.enter="handleSubmit2"></el-input>
          <span @click.stop="changebg()"><img src="../../assets/images/password.png"></span>
        </el-form-item>-->
        <!-- <el-form-item prop="code" class="code">
           <el-input type="text" v-model="ruleForm.code" auto-complete="off" name="code" placeholder="请输入验证码"></el-input>
           &lt;!&ndash; <img src="../../../assets/images/code.png"> &ndash;&gt;
           <span>换一张</span>
         </el-form-item>-->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" :class="{'bgcolor' :ruleForm.account && ruleForm.checkPass}" @click.native.prevent="handleSubmit2" :loading="logining" >登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <!--<div>
          <input type="checkbox" id="a" class="checkbox" v-model="checked">
          <label for="a" class="checkbox"><span style="margin-left: 25px;white-space: nowrap;">记住密码</span></label>
        </div>-->
        <div class="main_login">
          <!--  <button>忘记密码</button>
           |
           <button> 注册</button> -->
        </div>
      </el-form>
    </div>
    <div class="main_copy">
      <p>Copyright ©  2018.重庆云华科技有限公司 All right reserved</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        logining: false,
        checked: false,      //是否现在保存密码
        timestamp:0,         //登录时的时间戳
        password:0,          //编码后的密码
        ruleForm: {
          account: '',     //账号
          checkPass: '',   //密码
          code:'',         //验证码
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号！', trigger: 'change' },
          ],
          checkPass: [
            { required: true, message: '密码不能为空！', trigger: 'change' },
          ]
        },
        rules3:{},
        rulesState:false,
        see:true,  //密码是否可见
        ifmd5:false
      };
    },
    mounted(){
      sessionStorage.removeItem('token')
      this.getCookie();
    },
    methods: {
      // 重置
      handleReset2() {
        this.$refs.ruleForm.resetFields();
      },
      // 登录
      handleSubmit2(ev) {
        this.rulesState=true
        var self = this;
        self.$refs.ruleForm.validate((valid) => {
          if (valid) {
            self.logining = true;
            self.getNowFormatDate();
            axios.post(process.env.API_HOST+'login',{
              sys:1,
              username:self.ruleForm.account,
              password:self.ruleForm.checkPass
            }).then(res=>{
              if(res.data.code==='000000'){
                self.logining = false;
                if (self.checked == true) {      //判断复选框是否被勾选 勾选则调用配置cookie方法
                  if(self.ruleForm.checkPass.length > 6 && self.ifmd5 == true){
                    console.log('大于6')
                    self.setCookie(self.ruleForm.account, self.ruleForm.checkPass, 7);     //传入账号名，密码，和保存天数3个参数
                  }else{
                    console.log('等于6')
                    self.setCookie(self.ruleForm.account, self.$md5(self.ruleForm.checkPass), 7);
                  }
                }else {
                  console.log('清空Cookie')
                  self.clearCookie();    //清空Cookie
                }
                var token = res.data.data.token
                sessionStorage.setItem("token",token)
                localStorage.setItem("userId",res.data.data.userId)
                localStorage.setItem('userName',res.data.data.name)
                localStorage.setItem('orgName',res.data.data.orgName)
                self.$router.push({ path: '/index/dailyData' });
              }else {
                self.logining = false;
                self.$message.error(res.data.message);
              }
            }).catch(function (error) {
              self.logining = false;
              self.$message.error('请求错误');
            })
          } else {
            self.logining = false;
            // self.$message.error( '账号和密码不能为空!');
          }
        });
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
        // console.log(document.cookie)
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');     //再次切割
            if (arr2[0] == 'userName') {      //判断查找相对应的值
              this.ruleForm.account = arr2[1];     //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.checked = true
              this.ifmd5 = true
              this.ruleForm.checkPass = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      },
      // 获取当前时间
      getNowFormatDate() {
        var self=this;
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds;
        }

        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();

        var currentdate1 = date.getFullYear() + month + strDate + hours + minutes + seconds;
        self.timestamp=currentdate1
        if(self.ifmd5){
          console.log(self.ruleForm.checkPass.length)
          if(self.ruleForm.checkPass.length > 6){
            console.log(1)
            self.password=self.$md5(self.timestamp+(self.ruleForm.checkPass).toUpperCase()).toUpperCase()
          }else{
            console.log(2)
            self.password=self.$md5(self.timestamp+self.$md5(self.ruleForm.checkPass).toUpperCase()).toUpperCase()
          }
        }else{
          console.log(3)
          self.password=self.$md5(self.timestamp+self.$md5(self.ruleForm.checkPass).toUpperCase()).toUpperCase()
          // console.log(2)
        }
      },
      //密码可见与不可见
      changebg(){
        var self = this
        if(self.see){
          self.see = false
        }else{
          self.see = true
        }
      },
    }
  }

</script>

<style>
  .main-body{
    height: 100%;
    width: 100%;
    font-size:.16rem;
    position: fixed;
    background: url('../../assets/images/loginbg.png') 0 / cover fixed;
  }
  .main_logo{
    margin:.2rem 0 0 .3rem;
  }
  .main_logo span{
    font-family: "Microsoft YaHei";
    font-size: .24rem;
    color: #ffffff;
    border-left: .01rem solid #ffffff;
    padding-left: .15rem;
    margin-left: .1rem;
    vertical-align: top;
  }
  .main{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .login-container::before{
    content: '';
    position: absolute;
    top:0;right:0;bottom:0;left:0;
    filter: blur(20px);
    margin: -30px;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    position: relative;
    transform: translate(-50%,-50%);
    top:40%;
    left:50%;
    -webkit-border-radius: .05rem;
    border-radius: .05rem;
    -moz-border-radius: .05rem;
    background-clip: padding-box;
    width: 5rem;
    padding:0 .4rem;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 10px #7f838a;
    box-shadow: 0 0 10px #7f838a;
    background: #ffffff;
  }
  .title {
    padding:30px 0px;
    text-align: center;
    position: relative;
    border-bottom: .01rem solid #d2d2d2;
    margin: .31rem 0 .56rem;
  }
  .title h3{
    font-size: .18rem;
    color: #444444;
    position: absolute;
    top: 50%;
    left:10%;
    z-index: 999;
    margin:0px;
    transform: translate(-50%,-50%);
  }
  .main .el-input input{
    border:.01rem solid #d2d2d2;
    background: #f4f4f4;
    height: .54rem;
    border-radius: .06rem;
  }
  .main .el-form-item{
    margin-bottom: .24rem;
  }
  .main .el-form-item__content{
    position: relative;
  }
  .main .el-form-item__content > span{
    position: absolute;
    right: .2rem;
    top: .1rem;
  }
  .main .el-form-item__content .el-button--primary{
    font-family: "Microsoft YaHei";
    font-size: .18rem;
    height: .54rem;
    background: #f4f4f4;
    color: #888888;
    border:none;
    border-radius: .06rem;
  }
  .main .el-form-item__content .bgcolor{
    background: #2184c5 !important;
    color: #ffffff !important;
  }
  .input[type='checkbox'].checkbox{
    opacity:0;
    display:inline-block;
    height:.18rem;
    width: .18rem;
  }
  .main .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100% !important;
  }
  .code .el-input{
    width: 66% !important;
    display: inline-block;
  }
  .code .el-form-item__content > img{
    vertical-align: middle;
    margin:0 .1rem;
  }
  .code .el-form-item__content > span{
    font-size: .13rem;
    color: #888888;
  }
  .main input[type='checkbox'].checkbox {
    opacity:0;
    display:inline-block;
    width: .18rem;
    height: .22rem;
    vertical-align: bottom;
  }
  .main label.checkbox {
    background:url(../../assets/images/remenber1.png) no-repeat;
    display: inline-block;
    margin-left: -21px;
    background-position-y: 3px;
  }
  .main input[type='checkbox'].checkbox:checked + .checkbox {
    background:url(../../assets/images/remenber2.png) no-repeat;
    background-position-y: 3px;
  }
  .main_login{
    display: inline-block;
    float: right;
    color: #888888;
    height: .23rem;
    line-height: .23rem;
    margin-bottom: .82rem;
  }
  .main_login button{
    font-size: .16rem;
    color: #888888;
    background: #ffffff;
    border:none;
  }
  .main_copy{
    position: absolute;
    bottom: .22rem;
    left: 50%;
    font-size: .1rem;
    color: #e0e0e0;
    transform: translate(-50%,-50%);
  }
</style>
