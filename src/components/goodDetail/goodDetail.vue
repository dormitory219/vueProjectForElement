<template>

<transition name="slide-fade">
   <div v-show="showflag" class="foodDetail" ref='foodDetailWrapper'>
       <div class="food">
            <div class="image-header">
                <img :src="food.image">
                <div  @click="back" class="back">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="foodContentWrapper">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sellCount">{{food.sellCount}}</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="nowPrice">¥{{food.price}}</span>
                    <span class="oldPrice" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
            </div>
            <div class="foodDescWrapper">
                <h1 class="descTitle">商品介绍</h1>
                <p class="foodDesc">{{food.info}}</p>

            </div>
            <div class="foodRatingWrapper">
                    <h1 class="rateTitle">商品评价</h1>
                    <rating-select :desc= "desc" :select-type="selectType" :only-content="onlyContent" :ratings="food.ratings"></rating-select>
            </div>
       </div>
   </div>
</transition>
</template>

<script type='text/ecmascript-6'>

import BScroll from 'better-scroll';
import ratingSelect from '../ratingSelect/ratingSelect';

// const POSTIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

 export default {
   data () {
     return {
         showflag: false,
         selectType: ALL,
         onlyContent: true,
         desc: {
           all: '全部',
           postive: '推荐',
           negative: '吐槽'
       }
     };
   },
   components: {
       ratingSelect
   },
   props: {
       food: {
           type: Object
       }
   },
   methods: {
       show () {
           this.showflag = true;
           this.$nextTick(() => {
               if (!this.scroll) {
                   this._initScroll();
               } else {
                   this._refreshScroll();
               }
           });
           this.selectType = ALL;
           this.onlyContent = true;
       },
       back () {
           this.showflag = false;
       },
       _initScroll () {
            this.scroll = new BScroll(this.$refs.foodDetailWrapper, {
                    click: true
                });
       },
       _refreshScroll () {
           this.scroll.refresh();
       }
   }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus' scope>

 .foodDetail
     position fixed
     background #f3f5f7
     left 0px
     top 0px
     width 100%
     bottom 48px
     z-index 30
    .slide-fade-enter-active
        transition: all .3s ease;
    .slide-fade-leave-active
        transition: all .3s ease;
    .slide-fade-enter, .slide-fade-leave-to
        transform: translateX(-100%);
        opacity: 0;
    .image-header
        position relative
        width 100%
        height 0
        padding-bottom 100%
        img
             position absolute
             top 0px
             left 0px
             width 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #fff
    .foodContentWrapper
       padding 18px
       background #fff
       .title
           line-height 14px
           margin-bottom 18px
           font-size 14px
           color rgb(7,17,27)
       .detail
            margin-bottom 18px
            .sellCount,.rating
                font-size 10px
                color rgb(147,153,129)
            .sellCount
                margin-right 12px
       .price
            .nowPrice
                font-size 10px
                color rgb(240,20,20)
            .oldPrice
                font-size 10px
    .foodDescWrapper
       background #fff
       margin-top 18px
       padding 18px
       .descTitle
           line-height 14px
           margin-bottom 18px
           font-size 14px
           color rgb(7,17,27)
        .foodDesc
            line-height 14px
            font-size 12px
            color rgb(77,85,93)
    .foodRatingWrapper
        background #fff
        margin-top 18px
        padding 18px
        .rateTitle
            font-size 14px

</style>
