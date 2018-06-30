<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- <router-view/> -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import Axios from 'axios';

const ERR_OK = 0;

export default {
  data () {
     return {
       seller: {}
     };
  },
  name: 'App',
  components: {
    'v-header': header
  },
  created () {
    Axios.get('/api/seller')
    .then((response) => {
      var data = response.data;
      if (data.error === ERR_OK) {
        this.seller = data.seller;
        console.log(this.seller);
      }
    })
    .catch((eror) => {

    });
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .tab
        display flex
        width 100%
        height 40px
        line-height 40px
        .tab-item
            flex 1
            text-align center
            & > a
              display :block
              font-size 14
              color rgb(77,85,93)
              &.active
                 color rgb(240,20,20)
</style>
