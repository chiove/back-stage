<template>
  <div class="searchWrapper">
    <div>
      <input type="search" 
        @keyup.enter="getSearch" 
        v-model.trim="searchMsg"  
        :placeholder="holderFun"
      >
      <span @click.stop.pervent="getSearch"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      type:{
        type:String,
        default:null
      },
      holder:{
        type:String,
        default:null
      }
    },
    computed:{
      holderFun(){
        return this.holder
      }
    },
    data() {
      return {
        searchMsg:'',
      }
    },
    watch:{
      searchMsg(val){
        if(val == ''){
          this.getSearch()
        }
      }
    },
     methods: {
      getSearch() {
        // bus.$emit("setSearch",this.searchMsg);
        // if(this.type == 'zt'){
        //   bus.$emit("setSearch",this.searchMsg);
        // }else if(this.type == 'zb'){
        //   bus.$emit("setSearch",this.searchMsg);
        // }else if(this.type == 'state'){
        //   bus.$emit("setSearch",this.searchMsg);
        // }
      }
    },
  }

</script>

<style scoped>
.searchWrapper{
  height: .3rem;
  padding: .11rem 0 .11rem .14rem;
  display: inline;
}
.searchWrapper > div{
  width: 2.69rem;
  height: .3rem;
  display: inline-flex;
  display: -webkit-inline-flex;
  align-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  float: right;
  margin-top: .2rem;
}
.searchWrapper > div input{
  width: calc(100% - .6rem);
  height: 100%;
  padding: 0 .1rem;
  box-sizing: border-box;
  border:.01rem solid #2184c5;
  border-top-left-radius: .03rem;
  border-bottom-left-radius: .03rem;
}
.searchWrapper > div span{
  display: inline-block;
  width: .6rem;
  height: 100%;
  line-height: .3rem;
  background: url('../../assets/images/search2.png') no-repeat center center #2184c5;
  text-align: center;
  font-size: .12rem;
  color: #777777;
  border-top-right-radius: .03rem;
  border-bottom-right-radius: .03rem;
}
</style>