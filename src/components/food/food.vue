<template>
    <div class="food" v-show="showFlag" ref="food">
       <div class="food-content">
           <div class="image-header">
               <img :src="food.image" alt="">
               <div class="back" @click="hideDetail">
                   <i class="icon-arrow_lift"></i>
               </div>
           </div>
           <div class="content">
               <h1 class="title">{{food.name}}</h1>
               <div class="detail">
                   <span class="sell-count">月售{{food.sellCount}}</span>
                   <span class="rating">好评率{{food.rating}}%</span>
               </div>
               <div class="price">
                   <span class="now">￥{{food.price}}</span>
                   <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
               </div>
               <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
               </div>
               <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
           </div>
           <split v-show="food.info"></split>
           <div class="info" v-show="food.info">
               <h1 class="title">商品信息</h1>
               <p class="text">{{food.info}}</p>
           </div>
           <split></split>
           <div class="rating">
               <h1 class="title">商品评价{{selectTypes}}</h1>
               <rating :select-type="selectTypes" :only-content=
               "onlyContents" :desc="descs" :ratings="food.ratings" @ratingFood="ratingChange" @sContent="contentChange"></rating>
               <div class="rating-wrapper">
                   <ul class="ratings" v-show="food.ratings && food.ratings.length">
                       <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
                           <div class="user">
                               <span class="name">{{rating.username}}</span>
                               <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                           </div>
                           <div class="time">{{rating.rateTime | formatDate}}</div>
                           <p class="text">
                               <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                               {{rating.text}}
                           </p>
                       </li>
                   </ul>
                   <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
               </div>
           </div>
       </div>
    </div>  
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol'
import rating from '../rating/rating'
import split from '../split/split'
import {formatDate} from '../../common/js/date'

const POSITIVE = 0;
const NEGITIVE = 1;
const ALL = 2;

export default {
    data() {
        return {
            showFlag: false,
            selectTypes: ALL,
            onlyContents: true,
            descs: {
                all: '全部',
                positive: '满意',
                negitive: '吐槽'
            }
        }
    },
  props: {
      food: {
          type: Object
      }
  },
  methods: {
      show() {
          this.showFlag = true; 
          this.selectType = ALL;
          this.onlyContent = true;
                this.$nextTick(() => {
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food,{
                        click: true
                        })
                    }else { //这样只会初始化一次，不会每次展示列表的时候，都会初始化一次
                        this.scroll.refresh();
                    }
                    
                }) 
      },
      hideDetail() {
         this.showFlag = false 
      },
      addFirst() {
          Vue.set(this.food, 'count', 1)
      },
      needShow(type, text) {
          if(this.onlyContents && !text) {
            return false
          }
          if(this.selectTypes === ALL) {
              return true
          } else {
              return type === this.selectTypes
          }
      },
      ratingChange(data){
          this.selectTypes = data;
          this.$nextTick(() => {
              this.scroll.refresh();
          })       
      },
      contentChange(data){
          this.onlyContents = data;
          this.$nextTick(() => {
              this.scroll.refresh();
          })
      }
  },
  filters: {
      formatDate(time) {
          let date = new Date(time)
          return formatDate(date,'yyyy-MM-dd hh:mm')
      }
  },
  components: {
      cartcontrol,
      split,
      rating
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">  
        .food 
            position: fixed
            left: 0
            top: 0
            bottom: 48px 
            z-index: 30
            width: 100%
            background: #fff
            opacity: 1 
            .image-header 
                position: relative 
                width: 100%
                height: 0 
                padding-top: 100% 
                img 
                    position: absolute 
                    top: 0 
                    left: 0
                    width: 100% 
                    height: 100% 
                .back
                    position: absolute 
                    top: 10px 
                    left: 0
                    .icon-arrow_lift 
                        display: block 
                        padding: 10px
                        font-size: 20px
                        color: #ffffff
            .content 
                position: relative
                padding: 18px 
                .title 
                    line-height: 14px 
                    margin-bottom: 8px 
                    font-size: 14px 
                    font-weight: 700 
                    color: rgb(7,17,27)
                .detail 
                    margin-bottom: 18px 
                    line-height: 10px 
                    font-size: 0
                    .sell-count,.rating 
                        font-size: 10px 
                        color: rgb(147,153,159)
                    .sell-count 
                        margin-right: 12px 
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 14px
                        color: rgb(240,20,20)
                    .old
                        text-decoration: line-through
                        color: rgb(147,153,159)
                        font-size: 10px
                .cartcontrol-wrapper 
                    position: absolute 
                    right: 12px 
                    bottom: 12px 
                .buy 
                    position: absolute 
                    right: 18px 
                    bottom: 18px 
                    z-index: 10
                    height: 24px 
                    line-height: 24px 
                    padding: 0 12px 
                    box-sizing: border-box 
                    border-radius: 12px 
                    font-size: 10px 
                    color: #fff 
                    background: rgb(0,160,220)
            .info
                padding: 18px 
                .title 
                    line-height: 14px
                    margin-bottom: 16px 
                    font-size: 14px
                    color: rgb(7,17,27)
                .text 
                    color: rgb(77,85,93)
                    line-height: 24px
                    font-size: 12px
                    padding: 0 8px
            .rating 
                padding-top: 18px 
                .title 
                    line-height: 14px
                    margin-left: 18px 
                    font-size: 14px
                    color: rgb(7,17,27)
                .rating-wrapper 
                    padding: 0 18px 
                    .rating-item 
                        position: relative 
                        padding: 16px 0 
                        border-bottom: 1px solid rgba(7,17,27,0.1)
                        .user 
                            position: absolute 
                            right: 0
                            top: 16px 
                            line-height: 12px
                            font-size: 0
                            .name 
                                display: inline-block 
                                margin-right 6px
                                vertical-align: top
                                font-size 10px
                                color rgb(147,153,159)
                            .avatar 
                                border-radius: 50%
                        .time
                            margin-bottom 6px
                            line-height 12px
                            font-style 10px
                            color rgb(147,153,159)
                            font-size 12px
                        .text 
                            line-height 16px
                            font-size 12px
                            color rgb(7,17,27)
                            .icon-thumb_up,.icon-thumb_down 
                                margin-right 4px 
                                font-size 12px 
                                line-height 16px
                            .icon-thumb_up 
                                color rgb(0,160,220)
                            .icon-thumb_down 
                                color rgb(147,153,159)
                    .no-rating 
                        padding 16px 0
                        font-size 12px 
                        color: rgb(147,153,159)

</style>