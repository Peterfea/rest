<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li v-for="(food,index) in good.foods" :key="index" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>                 
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="foodDetail"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../../shopcart/shopcart'
import cartcontrol from '../../cartcontrol/cartcontrol'
import food from '../../food/food'

const ERR_OK = 0;
export default {
  data(){
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
    this.$http.get('/api/goods').then( res => {
      res = res.body;
      if(res.errno === ERR_OK){
        this.goods = res.data;
        this.$nextTick(()=>{ //当我们需要操作 DOM的时候，需要调用这个接口，在它的回调函数里面，去写相应的操作逻辑
              this._initScroll()   
              this._calculateHeight()      
        })   
        
      }
    })
  },
  mounted() {
    
  },
  methods: {
    // 滚动初始化
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3 //这个属性的作用可以在滚动的时候，实时告诉我们滚动的位置
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height)
      for (let i=0;i<foodList.length;i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    },
    selectMenu(index) {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el,300)
    },
    selectFood(food, event) {
      this.selectedFood = food
      this.$refs.foodDetail.show()
    }
  },
  computed: {
    currentIndex() {
      for ( let i=0;i<this.listHeight.length;i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]
        if(!height2 || (this.scrollY < height2 && this.scrollY >= height1)){
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components: {
    shopcart,cartcontrol,food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixin.styl"
.goods
  display: flex
  position: absolute 
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f5f3f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      line-height: 14px
      padding: 0 12px
      &.current
        position: relative
        background: #fff;
        margin-top: -1px
        z-index: 10
        font-weight: 700
        .text
          border: none
      .icon
        display: inline-block
        width: 12px
        height: 12px
        vertical-align: top
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        font-size: 12px
        vertical-align: middle
        font-size: 12px
        border-bottom: 1px solid rgba(7,17,27,0.1)
  .foods-wrapper
    flex: 1
    background: #fff
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147,153,159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      &:last-child
        border: none 
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        position: relative
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rga(7,17,27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
        .desc
          margin-bottom: 8px
          line-height: 16px
        .extra
          line-height: 10px
          .count
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
          right: 0
          bottom: 12px






</style>
