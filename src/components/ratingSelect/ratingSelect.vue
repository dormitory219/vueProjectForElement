<template>
 <div class="ratingSelect">
     <div class="rating-type">
         <div class="firstType">{{desc.all}}

         </div>
         <div class="secondType">{{desc.postive}}

         </div>
         <div class="thirdType">{{desc.negative}}

         </div>

     </div>
     <div class="switch">
         <i class="icon-check_circle"></i>
         <span class="swithText">只看有内容的评价</span>
     </div>

 </div>
</template>

<script type='text/ecmascript-6'>
// const POSTIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
 export default {
   data () {
     return {

     };
   },
   props: {
       ratings: {
           type: Array,
           default () {
               return [];
           }
       },
       selectType: {
           type: Number,
           default: ALL
       },
       onlyContent: {
           type: Boolean,
           default: false
       },
       desc: {
           type: Object,
           default () {
               return {
                   all: '全部',
                   postive: '满意',
                   negative: '不满意'
               };
           }
       }
   }
 };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .ratingSelect
     padding 0 0 0 10px
     .firstType,.secondType,.thirdType
         display inline-block
         padding 5px
         background #f3f5f7
         border-radius 4px
     .switch
         padding 5px
        .swithText
            padding-left 5px
            font-size 10px

</style>
