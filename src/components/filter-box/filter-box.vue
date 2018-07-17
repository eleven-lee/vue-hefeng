<template>
  <transition name="filter-box-fade">
    <div class="filter-box" v-show="showFlag">
      <div class="shade" @click="hide"></div>
      <div class="filter-content">
        <h1 class="title">筛选</h1>
        <h2 class="text">价格区间</h2>
        <div class="price-box">
          <input type="number" class="inp-filtrate">
          <i>-</i>
          <input type="number" class="inp-filtrate">
        </div>
        <div class="split"></div>
        <div class="list-box">
          <ul class="list">
            <li class="item" v-for="(item,index) in productFilterVos" :key="index">
              <h3>{{item.label}}</h3>
              <h3>全部<i class="icon-right"></i></h3>
            </li>
          </ul>
        </div>
        <div class="filter-btn">
          <div class="split2"></div>
          <div class="btn">取消</div>
          <div class="btn">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      productFilterVos: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .filter-box
    position: fixed
    top: 0
    width: 100%
    height: 100%
    z-index: 100
    &.filter-box-fade-enter-active, &.filter-box-fade-leave-active
      transition: all 0.2s
    &.filter-box-fade-enter, &.filter-box-fade-leave-to
      transform: translate3d(100%, 0, 0)
    .shade
      position: relative
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, 0.7)
      z-index: 102
    .filter-content
      position: absolute
      top: 0
      right: 0
      width: 72%
      height: 100%
      background-color: $color-background
      z-index: 102
      .title
        height: 50px
        line-height: 50px
        text-align: center
        font-size: $font-size-medium-x
        color: $color-text
        border-bottom: 1px solid $color-background-d
      .text
        margin-top: 10px
        padding: 10px
        text-align: left
        font-size: $font-size-medium
        color: $color-text
      .price-box
        display: flex
        padding: 0 10px
        .inp-filtrate
          width: 45%
          height: 30px
          border-radius: 3px
          background-color: $color-background-d
          padding-left: 4px
        i
          flex: 1
          text-align: center
          line-height: 30px
      .split
        width: 100%
        height: 4px
        margin-top: 20px
        background-color: $color-background-d
      .list-box
        position: relative
        height: 60%
        .list
          padding-bottom: 10px
          .item
            display: flex
            height: 45px
            line-height: 45px
            padding:0 10px
            border-bottom: 1px solid $color-background-d
            h3
              flex: 1
              font-size: $font-size-small
              &:nth-child(2)
                text-align: right
                padding-right: 20px
            .icon-right
              position: absolute
              right: 10px
              margin-left: 10px
              line-height: 45px
              font-size: 22px
              vertical-align: middle
              color: $color-text-d
      .filter-btn
        position: absolute
        bottom: 0
        width: 100%
        font-size: 0
        .split2
          height: 20px
          width: 100%
          background-color: $color-background-d
        .btn
          display: inline-block
          width: 49%
          height: 50px
          line-height: 45px
          text-align: center
          font-size: $font-size-medium
          color: $color-background
          background-color: $color-theme
          &:nth-child(2)
            color: #666
            background-color: $color-background

</style>
