<template>
    <div class="rating">
        <div class="rating-type">
            <span class="block positive" @click="select(2)" :class="{'active':this.cSelectType === 2}">{{cDesc.all}}<i class="count">{{cRatings.length}}</i></span>
            <span class="block positive" @click="select(0)" :class="{'active':this.cSelectType === 0}">{{cDesc.positive}}<i class="count">{{positives.length}}</i></span>
            <span class="block negitive" @click="select(1)" :class="{'active':this.cSelectType === 1}">{{cDesc.negitive}}<i class="count">{{negitives.length}}</i></span>
        </div>
        <div class="switch" :class="{'on':cOnlyContent}" @click="toggleContent">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>           
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGITIVE = 1;
const ALL = 2;
export default {
    data(){
        return {
            cRatings: this.ratings,
            cSelectType: this.selectType,
            cOnlyContent: this.onlyContent,
            cDesc: this.desc
        }
    },
    props: {
        ratings: {
            type: Array,
            default() {
                return []
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
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negitive: '不满意'
                }
            }
        }
    },
    watch: {
        'ratings': function(val) {
            this.cRatings = val;
        }
    },
    computed: {
        positives() {
            return  this.cRatings.filter((item) => {
                return item.rateType === POSITIVE;
            })
        },
        negitives() {
            return  this.cRatings.filter((item) => {
                return item.rateType === NEGITIVE;
            })
        }
    },
    methods: {
        select(type) {
            this.cSelectType = type;
            this.$emit('ratingFood',type)
        },
        toggleContent() {
            console.log('ffff')
            this.cOnlyContent = !this.cOnlyContent
            this.$emit('sContent',this.cOnlyContent)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">  
   .rating 
    .rating-type 
        padding: 18px 0 
        margin: 0 18px 
        border-bottom: rgba(7,17,27,0.2)
        font-size: 0
        .block 
            display: inline-block
            padding: 8px 12px 
            border-radius: 2px 
            margin-right: 8px 
            color: rgb(77,85,93) 
            font-size: 12px
            &.active 
                color: #fff
            .count 
                font-size: 8px 
                margin-left: 2px
                line-height: 16px               
            &.positive 
                background: rgba(0,160,220,0.2)
                &.active 
                  background: rgb(0,160,220,0.2)  
            &.negitive 
                background: rgba(77,85,93,0.2)
                &.active 
                  background: rgb(77,85,93,0.2)
    .switch 
        padding: 12px 18px 
        line-height: 24px 
        border-bottom: 1px solid rgba(7,17,27,0.1)
        color: rgb(147,153,159)
        font-size: 0
        &.on
           .icon-check_circle
               color: #00c850
        .icon-check_circle
            display: inline-block
            vertical-align: top
            font-size: 24px 
            margin-right: 4px 
        .text 
            font-size: 12px 
            display: inline-block
            vertical-align: top  



</style>