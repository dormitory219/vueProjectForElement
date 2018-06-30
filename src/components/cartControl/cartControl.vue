<template>
 <div class="cartControl">
     <transition name="move">
       <div @click.stop="decreaseCart()" v-show="food.count>0" class="cart-decrease">
           <span class="inner icon-remove_circle_outline"></span>
       </div>
     </transition>
     <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
     <div @click.stop="addCart()" class="cart-add icon-add_circle"></div>
 </div>
</template>

<script type='text/ecmascript-6'>
import Vue from 'vue';
 export default {
   data () {
     return {

     };
   },
   props: {
       food: {
           type: Object
       }
   },
   methods: {
       addCart () {
           if (!this.food.count) {
              Vue.set(this.food, 'count', 1);
           } else {
              this.food.count++;
           };
       },
       decreaseCart () {
           if (!this.food.count) {
              Vue.set(this.food, 'count', 1);
           } else {
              this.food.count--;
           };
       }
   }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 .cartControl
    .cart-decrease
       display inline-block
       padding 0 10 0 10
       transition all 0.45s linear
       &.move-transition
         opacity 1
         transform translate3d(0,0,0)
       .inner
            display inline-block
            line-height 20px
            font-size 20px
            color rgb(0,160,220)
            transform rotate(0)
            transition all 0.45s linear
       &.move-enter,&.move-leave
         opacity 0
         transform translate3d(24px,0,0)
      .inner
         transform rotate(180deg)
    .cart-count
       display inline-block
       vertical-align top
       width 12px
       text-align center;
       font-size 10px
       padding-top 4px
       color rgb(147,153,159)
    .cart-add
       display inline-block
       font-size 20px
       padding 0 10 0 10
       color rgb(0,160,220)

</style>
