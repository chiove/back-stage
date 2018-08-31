<template>
  <div class="allhtgl">
    <div class="allhtgl_list">
      <a v-for="(list,index) in item" :href="list.url">
        <img :src="list.img">
        <p class="actives">{{list.name}}</p>
      </a>
      <a :href="active">
        <img src="../../assets/images/fhsy.png">
        <p class="actives">返回主页</p>
      </a>
    </div>
  </div>
</template>
<script>
 export default {
  name: 'allhtgl',
  data:function(){
    return {
      item:[],
    }
  },
  computed: {
    active() {
      return window.g.url2+'/#/indexs'
    }
  },
  created(){
    /*this.getData()*/
  },
  methods:{
    getData(){
      var self = this
      if(sessionStorage.getItem("content")){
        var content = JSON.parse(sessionStorage.getItem("content"))
        self.$axios({
            method: 'post',
            url: window.g.url+'/cms/appcenter/init/list',
            params:content
          }).then((res) => {
             if(res.data.code ==40001){
                self.item = res.data.content;
             }
        });
      }
    }
  },

}
</script>
<style>
.allhtgl{
  font-size: .16rem;
  width:100%;
  z-index: 9999999;
}
.allhtgl_list{
  font-size: 0;
  width: 100%;
  box-sizing: border-box;
  padding: .06rem .12rem;
}
.allhtgl_list a{
  text-align: center;
  display: inline-block;
  width: 1.25rem;
  padding:  .26rem 0;
  font-size: 0;
  margin: 0 .11rem;
}
.allhtgl_list a img{
  width: 1rem;
  height: 1rem;
  border-radius: .14rem;
}
.allhtgl_list p{
  display: inline-block;
  font-size: .16rem;
  font-family: "Microsoft YaHei";
  color: #668ca3;
  padding:.05rem .07rem;
  margin-top: .07rem;
  cursor: pointer;
  white-space: nowrap;
}
.actives,.allhtgl_list p:hover{
  color: #ffffff !important;
  border-radius: .45rem;
  padding:.05rem .07rem;
  background: linear-gradient(to bottom, #3cb8fd, #458af5 100%);
}
</style>
