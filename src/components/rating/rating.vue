<template>
 <div class="ratings" ref="ratingWrapper">
   <div class="ratings-content">
     <div class="overView">
       <div class="leftView">
         <h1 class="score">{{seller.score}}</h1>
         <div class="title">综合评分</div>
         <div class="rank">高于周边商家{{seller.rankRate}}%</div>
       </div>
       <div class="rightView"></div>

       <div class="rightView">
         <div class="score-wrapper">
           <span class="title">服务态度</span>
           <star :size="36" score="seller.score"></star>
           <span class="score">{{seller.score}}</span>
         </div>
          <div class="score-wrapper">
           <span class="title">商品评分</span>
           <star :size="36" score="seller.foodScore"></star>
           <span class="score">{{seller.foodScore}}</span>
         </div>
         <div class="delivery-wrapper">
           <span class="deliveryTitle">送达时间</span>
           <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
         </div>
       </div>
     </div>
     <div class="rating-list">
       <rating-select class="ratingSelect"></rating-select>
       <div class="rating-wrapper">
         <ul>
           <li v-for="(rating,index) in ratings" :key="index" class="item">
             <div class="cellLeftView">
               <img :src="rating.avatar">
             </div>
             <div class="cellRightView">
               <div class="userNameWrapper">
                 <span class="userName">{{rating.username}}</span>
                 <span class="rateTime">{{rating.rateTime}}</span>
               </div>
               <div class="ratingStarWrapper">
                 <star :size="24" score="3.5" class="itemStar"></star>
                 <span class="deliveryTime">{{seller.deliveryTime}}分钟送达</span>
               <p v-show="rating.text" class="desc">{{rating.text}}</p>
               </div>
             </div>
           </li>
         </ul>
       </div>
     </div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import star from '../star/star';
import ratingSelect from '../ratingSelect/ratingSelect';
import Axios from 'axios';
import BScroll from 'better-scroll';

const ERR_OK = 0;
 export default {
   data () {
     return {
       ratings: []
     };
   },
   components: {
     star,
     ratingSelect
   },
   props: {
     seller: {
       type: Object
     }
   },
    created () {
    Axios.get('/api/ratings').then((response) => {
      var data = response.data;
      if (data.error === ERR_OK) {
        this.ratings = data.ratings;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingWrapper, {
          click: true,
          probeType: 3
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
 .ratings
   position absolute
   top 174px
   bottom 0
   background #f3f5f7
   left 0;
   width 100%
   overflow hidden
   .overView
     display flex
     flex-direction row
     padding 18px 18px 18px 0
     margin-top 20px
     width 100%
     background #fff
     .leftView
       flex 0 0 137px
       padding 12px 0
       width 137px
       border-right  1px solid rgba(7,17,27,0.1)
       text-align center
       .score
         font-size 30px
         color rgb(255,153,0)
       .title
         font-size 18px
         padding-top 18px
         color rgb(7,17,27)
       .rank
         font-size 10px
         color rgb(7,17,27)
         padding-top 18px
      .rightView
        padding 6px
        .score-wrapper
          padding 0 0 5px 0
          .title
            font-size 14px
            color rgb(7,17,27)
          .star
             display inline-block
             padding 5px 0 5px 0
          .score
             color rgb(255,153,0)
             padding-left 5px
        .delivery-wrapper
          display block
          .deliveryTitle
             font-size 12px
             color rgb(7,17,27)
          .deliveryTime
             font-size 12px
             color rgb(147,153,129)
   .rating-list
     background #fff
     margin-top 20px
     .ratingSelect
       padding 18px
     .rating-wrapper
       padding 0px
       .item
          display flex
          padding 20px
          border-1px(rgba(147,153,159,0.1))
          .cellLeftView
            img
              flex 0 0 28px
              width 28px
              height 28px
              border-radius 14px
          .cellRightView
              flex 1
              padding-left 20px
              .userNameWrapper
                padding-bottom 10px
                .username
                  font-size 10px
                  color rgb(7,17,27)
                .rateTime
                  float  right
                  padding-right 10px
                  font-size 10px
                  color rgb(147,153,159)
              .ratingStarWrapper
                 .itemStar
                  display inline-block
                  padding-bottom 10px
                 .deliveryTime
                   padding-left 10px
                   font-size 12px
                   color rgb(147,153,159)
              .desc
                   font-size 12px
                   rgb(7,17,27)
                   line-height 18px
</style>
