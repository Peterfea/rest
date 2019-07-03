<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>
  </div>
</template>

<script>
const LENGTH = 5;
const ST_HALF = 'half'
const ST_ON = 'on'
const ST_OFF = 'off'

export default {
    
  props: {
      size: {
          type: Number
      },
      score: {
          type: Number
      }
  },
  computed:{
      starType(){
          return "star-" + this.size;
      },
      itemClasses(){
          let result = [];
          let score = Math.floor(this.score * 2)/2 // 大于 0.5 取0.5，小于 0.5 取0
          let hasDecimal = score % 1 !== 0 //判断是否有半星的情况（即，分数是否有.5的情况），如果有，则为 true
          let integer = Math.floor(score) //计算有多少颗整星
          for(let i=0;i<integer;i++){ //遍历 interger,有多少个整星，就在数组里面添加多少项
              result.push(ST_ON)
          }
          if(hasDecimal) { //如果有半星，则在数组后面添加半星所对应的类
              result.push(ST_HALF)
          }
          while( result.length < LENGTH) {
              result.push(ST_OFF)
          }
          return result;

      }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .star
        
        .star-item 
            display: inline-block
            background-repeat: no-repeat
        &.star-48
            .star-item
                width: 20px
                height: 20px
                margin-right: 22px
                background-size: 20px 20px
                &:last-child 
                    margin-right: 0
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width: 15px
                height: 15px
                margin-right: 16px
                background-size: 15px 15px
                &:last-child 
                    margin-right: 0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24
            .star-item
                width: 10px
                height: 10px
                margin-right: 3px
                background-size: 10px 10px
                &:last-child 
                    margin-right: 0
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
                



</style>