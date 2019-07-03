<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" class="tab-link">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment" class="tab-link">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/store" class="tab-link">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/util'
const ERR_OK = 0;
export default {
  data(){
    return {
      seller:{
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created(){
    this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
      res = res.body;
      
      if(res.errno === ERR_OK){
        this.seller = Object.assign({}, this.seller, res.data);
        // this.seller = res.data;
        console.log(this.seller)
      }
    })
    
  },
  components:{
    'v-header':header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tab
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid rgba(7,17,27,0.1)
  .tab-item
    line-height: 40px;
    flex:1;
    text-align: center;
    font-size: 14px;
    color: rgb(77,85,93)
/* .tab{
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid rgba(7,17,27,0.1)
}
.tab-item{
  line-height: 40px;
  flex:1;
  text-align: center;
  font-size: 14px;
  color: rgb(77,85,93)
}
.tab-link{
  color: #000;
}
.router-link-active{
  color: blue;
}
.myActive{
  color: #f00;
} */
</style>
