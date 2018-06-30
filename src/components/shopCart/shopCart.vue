<template>
 <div  @click="toggleCartlist()" class="shopCart">
     <div class="left-content">
         <div class="logo" :class="{'hightlight':totalCount>0}">
             <div class="logNum"  v-show="totalCount>0" :class="{'hightlight':totalCount>0}">{{totalCount}}</div>
             <div class="circle">
                 <i class="icon icon-shopping_cart" :class="{'hightlight':totalCount>0}"></i>
             </div>
         </div>
         <div class="content">
           <span class="price" :class="{'hightlight':totalCount>0}">¥{{totalPrice}}</span>
           <span class="line"></span>
           <span class="deliveryPrice">另需配送费¥{{deliveryPrice}}</span>
         </div>
     </div>
     <div class="right-content" :class="payClass">
         <span class="minPrice">{{payDesc}}</span>
     </div>
     <!-- 购物车列表 -->
     <transition name='slide-fade'>
        <div class="shopCart-list" v-show="fold">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="list-content">
                <ul class="list-item">
                    <li v-for="(food,index) in selectFoods" :key="index">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>¥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartControl-wrapper">
                            <cart-control :food="food"></cart-control>
                        </div>
                    </li>
                </ul>
            </div>
       </div>
     </transition>
 </div>
</template>

<script type='text/ecmascript-6'>
import cartControl from '../cartControl/cartControl';
 export default {
   data () {
     return {
         fold: false
     };
   },
   components: {
       cartControl
   },
   props: {
      selectFoods: {
           type: Array,
           default () {
               return [
                   {
                       price: 10,
                       count: 8,
                       name: '红莲排骨'
                   }
               ];
           }
       },
       minPrice: {
           type: Number,
           default: 300
       },
       deliveryPrice: {
           type: Number,
           default: 0
       }
   },
   methods: {
       toggleCartlist () {
           if (!this.totalCount) {
               return;
           }
           this.fold = !this.fold;
       }
   },
   computed: {
       totalPrice () {
           let total = 0;
           this.selectFoods.forEach(food => {
               total += food.price * food.count;
           });
           return total;
       },
       totalCount () {
           let count = 0;
           this.selectFoods.forEach(food => {
               count += food.count;
           });
            return count;
       },
       payDesc () {
           if (this.price === 0) {
               return `¥${this.minPrice}元起送`;
           } else if (this.totalPrice < this.minPrice) {
               let diff = this.minPrice - this.totalPrice;
               return `还差¥${diff}`;
           } else {
               return '去结算';
           }
       },
       payClass () {
           if (this.totalPrice < this.minPrice) {
               return 'not-enough';
           } else {
               return 'enough';
           }
       },
       listShow () {
         return true;
       }
   }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    .shopCart
       display flex
       position fixed
       bottom 0px
       left 0px
       width 100%
       height 52px
       background #141d27
       .left-content
         flex 1
         position relative
         .logo
            position relative
            display inline-block
            margin-left 18px
            margin-top -20px
            width 64px
            height 64px
            padding 8px 8px 8px 8px
            border-radius 50%
            box-sizing border-box
            background #141d27
            &.hightlight
              background rgb(0,160,220)
            .logNum
              position absolute
              top 0
              right 0
              width 24px
              height 16px
              line-height 16px
              color #ffffff
              border-radius 16px
              font-size 9px
              text-align center
              background rgba(240,20,20,0.9)
            .circle
              display flex
              flex-direction row
              align-items center
              justify-content center
              width 100%
              height 100%
              background rgba(255,255,255,0.4)
              border-radius 50%
            .icon-shopping_cart
             font-size 30px
             &.hightlight
               color  #ffffff
         .content
             display inline-block
             padding 18px 0 18px 0px
             .price
               font-size 10px
               padding 0 8px 0 0
               color rgba(255,255,255,0.4)
               line-height 20px
               border-right  1px solid rgba(255,255,255,0.4)
               &.hightlight
                 color #ffffff
                 font-size 11px
             .deliveryPrice
               font-size 10px
               padding-left 5
               color rgba(255,255,255,0.4)
               line-height 20px
               vertical-align center

       .right-content
         flex 0 0 105px
         background rgba(255,255,255,0.1)
         text-align center;
         line-height 52px
         font-size 16px
         font-family 700
         color rgba(255,255,255,0.4)
         &.not-enough
           background  rgba(255,255,255,0.4)
         &.enough
           background #00b43c
        .slide-fade-enter-active
           transition: all .3s ease;
        .slide-fade-leave-active
           transition: all .3s ease;
        .slide-fade-enter, .slide-fade-leave-to
           transform: translateY(60px);
           opacity: 0;
        .shopCart-list
           position absolute;
           top -90px
           left 0
           width 100%
           z-index -1
           background-color black

           .list-header
               height 40px
               line-height 40px
               padding 0 18px
               border-bottom 1px solid rbga(7,17,27,0.1)
               background-color #f3f5f7
              .title
                 float left
                 font-size 14px
                 color rgb(7,17,27)
              .empty
                 float right
                 font-size 12px
                 color rgb(0,160,80)
           .list-content
               padding 0 18px
               max-height 217px
               overflow hidden
               background rgba(254,254,254,1.0)
               .name
                  font-size 14px
                  color rgb(7,17,27)
                  line-height 50px
               .price
                   display inline-block
                   margin-left 90px
               .cartControl-wrapper
                   display inline-block
                   float right
                   padding 15px 0 15px  0
</style>
