<template>
  <div class="seckill">
    <h2 class="seck-title ">
      <i class="icon-seckill"></i>限时秒杀</h2>
    <div class="item-wrapper" ref="itemWrapper">
      <ul class="item-list" ref="itemList">
        <li v-for="(item,index) in seckills" :key="index" class="seck-item">
          <img v-lazy="proImg(item)" class="img"/>
          <div class="price">
            <span class="newPrice"><small>￥{{proPrice(item.seckillPrice)}}</small></span><span
            class="oldPrice">￥{{proPrice(item.marketPrice)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      seckills: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      'seckills'() {
        this.$nextTick(() => {
          this._initSeckills()
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initSeckills()
      })
    },
    methods: {
      proImg(item) {
        return 'https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/' + item.productLogo
      },
      proPrice(price) {
        price = price.toString().replace(/(\d\d)$/, '.$1')
        return price
      },
      _initSeckills() {
        if (this.seckills.length) {
          let seckWidth = 110
          let margin = 6
          let width = (seckWidth + margin) * this.seckills.length - margin
          this.$refs.itemList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.seckScroll) {
              this.seckScroll = new BScroll(this.$refs.itemWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.seckScroll.refresh()
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .seckill
    .seck-title
      font-size: $font-size-medium
      color: $color-text
      font-weight: bold
      vertical-align: bottom
      .icon-seckill
        display: inline-block
        font-size: 16px
        margin-right: 6px
        vertical-align: bottom
    .item-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      margin-top: 12px
      .item-list
        font-size: 0
        .seck-item
          display: inline-block
          margin-right: 6px
          &:last-child
            margin-right: 0
          .img
            display: inline-block
            width: 110px
            height: 110px
            background-size: 110px 110px
            background-repeat: no-repeat
          .price
            margin-top: 8px
            text-align: center
            font-size: $font-size-medium-x
            .newPrice
              display: block
              color: $color-theme
              small
                font-size: $font-size-small
            .oldPrice
              display: block
              font-size: $font-size-small
              color: $color-text-d
              text-decoration: line-through
</style>
