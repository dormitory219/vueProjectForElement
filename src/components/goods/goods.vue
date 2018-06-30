<template>
 <div class="goods">
   <div class="menu-wrapper" ref="menuWrapper">
     <ul>
       <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click='selectMenu(index)'>
          <span v-show="item.type>0" class="icon" :class="supportTypeMap[item.type]"></span>
          <span class="desc" :class="{'current':currentIndex===index}">{{item.name}}</span>
       </li>
     </ul>
   </div>
   <div class="foods-wrapper" ref="foodsWrapper">
     <ul>
       <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodlisthook">
         <h1 class="sctionTitle">{{item.name}}</h1>
         <ul>
           <li @click="selectTheFood(food)" v-for="(food,index) in item.foods" :key="index" class="food-ltem">
             <div class="icon">
               <img :src="food.icon" width="80" height="80">
             </div>
             <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="sellRating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">¥{{food.price}}</span>
                  <span  v-show="food.oldPrice>0" class="oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartControl-Wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
             </div>
           </li>
         </ul>
       </li>
     </ul>
   </div>
   <shop-cart></shop-cart>
   <good-detail :food='selectFood' ref="goodDetails"></good-detail>
 </div>
</template>

<script type='text/ecmascript-6'>
import Axios from 'axios';
import BScroll from 'better-scroll';
import shopCart from '../shopCart/shopCart';
import cartControl from '../cartControl/cartControl';
import goodDetail from '../goodDetail/goodDetail';

const ERR_OK = 0;
 export default {
   data () {
     return {
       scrollY: 0,
       listHeight: [],
       selectFood: {}
     };
   },
   components: {
     shopCart,
     cartControl,
     goodDetail
   },
   props: {
     goods: {type: Object}
   },
   computed: {
       currentIndex () {
         for (let i = 0; i < this.listHeight.length; i++) {
           const listHeight1 = this.listHeight[i];
           const listHeigh2 = this.listHeight[i + 1];
           if (!listHeigh2 || this.scrollY >= listHeight1 & this.scrollY < listHeigh2) {
              return i;
           }
         }
         return 0;
       }
     },
   methods: {
     _initScroll () {
       this.menuScroll = new BScroll(this.$refs.menuWrapper, {
         click: true
       });
       this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
         click: true,
         probeType: 3
         });
       this.foodScroll.on('scroll', (pos) => {
         this.scrollY = Math.abs(Math.round(pos.y));
       });
     },
     _caculateHeight () {
       let foodList = this.$refs.foodlisthook;
       let height = 0;
       this.listHeight.push(height);
       for (let i = 0; i < foodList.length; i++) {
         let list = foodList[i];
         height += list.clientHeight;
         this.listHeight.push(height);
       }
     },
     selectMenu (index) {
       console.log(index);
       let foodList = this.$refs.foodlisthook;
       this.foodScroll.scrollToElement(foodList[index], 600);
     },
     selectTheFood (food) {
       console.log(food);
       this.selectFood = food;
       var goodDetail = this.$refs.goodDetails;
       goodDetail.show();
     }
   },
    created () {
    this.supportTypeMap = ['decrease', 'discount', 'invoice', 'guarantee'];
    Axios.get('/api/goods').then((response) => {
      var data = response.data;
      if (data.error === ERR_OK) {
        this.goods = data.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._caculateHeight();
        });
        console.log(this.goods);
      }
    }).catch((eror) => {

    });
  }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/mixin";
  .goods
     display flex
     position absolute
     top 174px
     left 0px
     bottom 46px
     overflow hidden
     .menu-wrapper
       flex 0 0 80px
       width 80px
       background #f3f5f7
       .menu-item
         display flex
         height 64px
         padding 5px 5px 5px 5px
         line-height 14px
         border-1px(rgba(147,153,159,0.1))
         justify-content center
         align-items center
         overflow hidden
         &.current
           position relative
           z-index 10
           margin-top -1px
           background #ffffff
           font-weight 700
         .icon
            flex 0 0 16px
            width 16px
            height 16px
            margin-right 2px
            background-size 16px 16px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.invoice
              bg-image('invoice_3')
            &.guarantee
              bg-image('guarantee_3')
          .desc
            vertical-align top
            font-size 15px
            text-align center;
            &.current
              font-weight bold
     .foods-wrapper
       flex 1
       .sctionTitle
          width 100%
          height 40px
          text-align left
          line-height 40px
          padding-left 14px
          font-size 12px
          color rgb(147,153,159)
          line-height 36px
          background #f2f5f7
          border-left 2px solid #d9dde1
         .food-ltem
            display flex
            margin 18px
            padding 18px 0 18px 0px
            border-1px(rgba(147,153,159,0.1))
            .icon
              display inline-block
              width 80px
              height 80px
              vertical-align top
            .food-content
              flex 1
              padding-left 5px
              .name
                font-size 14px
                color rgb(7,17,27)
                line-height 14px
              .desc
                margin-top 8px
                font-size 10px
                line-height 10px
                color rgb(147,153,159)
              .extra
                margin-top 8px
                .sellCount
                   font-size 10px
                   line-height 10px
                   color rgb(147,153,159)
                .sellRating
                   font-size 10px
                   line-height 10px
                   color rgb(147,153,159)
              .price
                margin-top 8px
                .nowPrice
                  font-size 14px
                  color red
                  line-height 24px
                .oldPrice
                  font-size 10px
                  text-decoration line-through
                  color rgb(147,153,159)
                  line-height 24px
                  vertical-align top
              .cartControl-Wrapper
                position absolute
                right 0
                bottom 12px

</style>
