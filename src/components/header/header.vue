<template>
 <div class="header">
   <!-- start: 上容器区域 -->
   <div class="content-wrapper">
     <!-- start: 左边图片区域 -->
     <div class="avatar">
       <img width="64" height="64" :src="seller.avatar">
     </div>
    <!--end: 左边图片区域 -->
     <!-- start: 右边内容区域 -->
     <div class="content">
       <div class="title">
         <span class="brand"></span>
         <span class="name">{{seller.name}}</span>
       </div>
       <div class="desc">
         <span class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
       </div>
       <div v-if="seller.supports" class="support">
         <i class="icon" :class="supportTypeMap[seller.supports[0].type]"></i>
         <span class="text">{{seller.supports[0].description}}</span>
       </div>
     </div>
     <!-- end: 右边内容区域 -->
     <!-- start: 右边按钮 -->
     <div v-if="seller.supports" class="support-count"  @click="showPop">
       <span class="count">{{seller.supports.length}}个</span>
       <i class="icon-keyboard_arrow_right"></i>
     </div>
     <!-- end: 右边按钮 -->
   </div>
   <!-- end: 上容器区域 -->

   <!-- start: 下公告区域 -->
   <div class="ad-wrapper" @click="showPop">
     <span class="ad-icon"></span>
     <span class="ad-title">{{seller.bulletin}}</span>
     <i class="icon-keyboard_arrow_right adclick"></i>
   </div>
   <!-- end: 下公告区域 -->

   <!-- start: 底部背景图 -->
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%">
   </div>
   <!-- end: 底部背景图 -->

   <!-- start: 弹出层  -->
   <transition name="fade">
      <div class="detail" v-show="detailShow">
         <div class="detail-wrapper clearfix">
            <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
                <star :size="48" :score="3.5"></star>
            </div>

            <!-- start:优惠信息分割线 -->
            <div class="discountInfo">
              <div class="leftline"></div>
              <div class="title">优惠信息</div>
              <div class="rightline"></div>
            </div>
            <!-- end:优惠信息分割线 -->
            <!-- start:优惠信息内容 -->
            <div class="discountInfoDesc">
                <ul v-if="seller.supports" class="support">
                  <li class="supportType" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="supportTypeMap[seller.supports[index].type]"></span>
                    <span class="desc">{{item.description}}</span>
                  </li>
                </ul>
            </div>
            <!-- end:优惠信息内容 -->
            <!-- start:商家公告分割线 -->
            <div class="selleADInfo">
              <div class="leftline"></div>
              <div class="title">商家公告</div>
              <!-- <div>商家公告分割线商家公告分割线商家公线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线线商家线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线公告分割线商家公告分割线商家公告分割线线商家公告分割线商家公告分割线商家公告分割线告分割线商家公告分割线商家公告分割线</div> -->
              <div class="rightline"></div>
            </div>
            <!-- end:商家公告分割线 -->
            <!-- start:商家公告 -->
            <div class="selleADInfoDesc">
              <p class="desc">{{seller.bulletin}}</p>
            </div>
            <!-- end:商家公告 -->
        </div>
      </div>
      <div @click="hidePop" class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
   <!-- end: 弹出层 -->
   </transition>
 </div>
</template>

<script type='text/ecmascript-6'>
 import star from '../../components/star/star.vue';
 export default {
   data () {
     return {
       detailShow: false
     };
   },
    props: {
       seller: {type: Object}
    },
    methods: {
      showPop () {
        this.detailShow = true;
      },
      hidePop () {
        this.detailShow = false;
      }
    },
    components: {
      star
    },
    created () {
      this.supportTypeMap = ['decrease', 'discount', 'invoice', 'guarantee'];
    }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/mixin";
@import "../../common/stylus/base";
 .header
     position relative
     overflow hidden
     color #fff
     background rgba(7,17,27,0.5)
     font-size 0
     .content-wrapper
        position relative
        padding 24px 12px 18px 24px
        .avatar
          display inline-block
          vertical-align top
          .img
            border-radius 2px
        .content
          display inline-block
          margin-left 16px
          font-size 14px
          .title
             margin 2px 0 2px 0
             .brand
                display inline-block
                width 30px
                height 18px
                bg-image('brand')
                background-size 30px 18px
              .name
                margin-left 6px
                font-size 16px
                line-height 18px
                font-weight bold
                vertical-align top
          .desc
            margin 0 0 4px 0
            font-size 12px
            line-height 24px

          .support
            .icon
              display inline-block
              width 12px
              height 12px
              margin-right 4px
              background-size 12px 12px
              &.decrease
                bg-image('decrease_1')
              &.discount
                bg-image('discount_1')
              &.invoice
                bg-image('invoice_1')
              &.guarantee
                bg-image('guarantee_1')
            .text
              font-size 10px
              vertical-align top
        .support-count
          position absolute
          right 12px
          bottom 14px
          padding 0 8px
          height 24px
          line-height 24px
          border-radius 14px
          background rgba(0,0,0,0.2)
          font-size 12px
          .count
            font-size 10px
          .icon-keyboard_arrow_right
            font-size 12px
            line-height 24px
     .ad-wrapper
       position relative
       height 28px
       line-height 28px
       background-color rgba(0,0,0,0.2)
       padding 0 22px 0 12px
       font-size  12px
       white-space nowrap
       overflow hidden
       text-overflow ellipsis
       .ad-icon
          display inline-block
          width 22px
          height 12px
          background-size 22px 12px
          margin-right 5px
          margin-top 8px
          vertical-align top
          bg-image('bulletin')
       .ad-title
          font-size 12px
       .adclick
          position absolute
          width 25px
          height 25px
          line-height 25px
          text-align center
          font-size 10px
          top  0px
          right 4px
          font-size 20px
     .background
       position absolute //absolue针对父视图，100%布局整个父容器
       left 0
       top 0
       width 100%
       height 100%
       z-index -1
       filter blur(10px)
     .detail
       display flex
       flex-direction column
       position fixed  //fix是针对视图窗口，100%可布局整个窗口
       z-index 100
       top 0
       left 0
       width 100%
       min-height 100%
       background rgba(7,17,27,0.8)
       backdrop-filter blur(10px)
       &.fade-enter-active,
       &.fade-leave-active
         transition: opacity 0.5s
       &.fade-enter
       &.fade-leave-to
         opacity: 0

       .detail-wrapper
         flex-grow 1
         width 100%
         .detail-main
           margin-top 64px
           padding-bottom 64px
           width 100%
           font-size 12px
           .name
             line-height 10px
             text-align center
             font-size 16px
             font-weight 700
           .star-wrapper
             margin-top 18px
             padding 2px 0
             text-align center
           .discountInfo
             display flex
             flex-direction row
             margin-top 28px
             padding 0 30px 0 30px
             .leftline
               flex 1
               border-bottom 1px solid rgba(255,255,255,0.2)
               margin-bottom  8px
             .title
               padding 0 12px 0 12px
               font-size 18px
               text-align center
             .rightline
               flex 1
               border-bottom 1px solid rgba(255,255,255,0.2)
               margin-bottom 8px
           .discountInfoDesc
              margin-top 24px
              padding 0 40px 0 40px
              li
                margin-bottom 6px
                .icon
                  display inline-block
                  width 16px
                  height 16px
                  margin-right 4px
                  background-size 16px 16px
                  &.decrease
                    bg-image('decrease_2')
                  &.discount
                    bg-image('discount_2')
                  &.invoice
                    bg-image('invoice_2')
                  &.guarantee
                    bg-image('guarantee_2')
                .desc
                  font-size 12px
                  font-weight 200
                  color rgb(255,255,255)
                  margin-left 6px
                  vertical-align top
           .selleADInfo
             display flex
             flex-direction row
             margin-top 28px
             padding 0 30px 0 30px
             .leftline
               flex 1
               border-bottom 1px solid rgba(255,255,255,0.2)
               margin-bottom  8px
             .title
               padding 0 12px 0 12px
               font-size 18px
               text-align center
             .rightline
               flex 1
               border-bottom 1px solid rgba(255,255,255,0.2)
               margin-bottom 8px
           .selleADInfoDesc
             margin-top 24px
             padding 0 40px 0 40px
             line-height 24px
             font-size 12px
       .detail-close
         width 32px
         height 32px
         font-size 32px
         margin 0 auto
         color red

</style>
