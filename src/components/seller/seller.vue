<template>
 <div class="seller" ref="sellerWrapper">
   <div class="sellContent">
     <div class="introduceSection">
       <span class="name">{{seller.name}}</span>
       <div class="descWrapper">
         <star :size="36" score="seller.foodScore" class="star"></star>
         <span>（{{seller.ratingCount}}）</span>
         <span class="monthCount">月售{{seller.sellCount}}单</span>
       </div>
       <div class="priceWrapper">
         <div class="price1">
           <span class="priceTitle">起送价</span>
           <span class="priceNum">{{seller.minPrice}}元</span>
         </div>
         <div class="price2">
           <span class="priceTitle">商家配送</span>
           <span class="priceNum">{{seller.deliveryPrice}}元</span>
         </div>
        <div class="price3">
           <span class="priceTitle">平均配送时间</span>
           <span class="priceNum">{{seller.deliveryTime}}分钟</span>
         </div>
       </div>
     </div>
     <div class="bulletinSection">
         <span class="title">公告与活动</span>
         <p class="desc">{{seller.bulletin}}</p>
     </div>
     <div class="pictureSection">
       <span class="title">商家实景</span>
       <div class="picWrapper" ref="picWrapper">
         <div class="content">
           <ul>
             <li v-for="(pic,index) in seller.pics" :key="index" class="item">
               <img class="pic" :src="pic" width="120px" height="90px">
             </li>
           </ul>
         </div>

       </div>
     </div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll';
import Axios from 'axios';
import star from '../star/star';
const ERR_OK = 0;

 export default {
   data () {
     return {

     };
   },
   props: {
     seller: {
       type: Object
     }
   },
   components: {
     star
   },
   created () {
    Axios.get('/api/seller').then((response) => {
      var data = response.data;
      if (data.error === ERR_OK) {
        this.ratings = data.ratings;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
          click: true,
          probeType: 3
          });
          this.picScroll = new BScroll(this.$refs.picWrapper, {
          click: true,
          probeType: 3,
          scrollX: true,
          scrollY: false
          });
        });
      }
    }).catch((eror) => {

    });
  }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/mixin";

 .seller
    position absolute
    top 174px
    bottom 0
    background #f3f5f7
    left 0;
    width 100%
    overflow hidden
    .sellContent
      margin-top 1px
      .introduceSection
        padding 18px
        background #fff
        .name
          font-size 14px
          color  rgb(7,17,27)
          padding-bottom 10px
        .descWrapper
          padding 10px
          .star
            display inline-block
          .monthCount
            font-size 10px
        .priceWrapper
          display flex
          padding-top 10px
          .price1,.price2,.price3
            flex 1;
            text-align center
            span
              display block
            .priceTitle
              font-size 10px
              padding-bottom 5px
            .priceNum
              font-size 24px
      .bulletinSection
        margin-top 20px
        padding 18px
        background #fff
        .title
          font-size 14px
          color rgb(7,17,27)
        .desc
          font-size 12px
          padding 8px 0 16px 10px
          line-height 20px
          color rgb(240,20,20)
          border-1px(rgba(147,153,159,0.1))
      .pictureSection
        margin-top 20px
        padding 18px
        background #fff
        overflow hidden
        white-space nowrap
        .title
          font-size 14px
          color rgb(7,17,27)
          padding-bottom 20px
        ul
          padding-top 20px
          .item
              display inline-block
              padding-right 20px
              flex 0 0 90px
</style>
