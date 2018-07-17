<template>
  <div class="product-list">
    <ul>
      <li class="product-item" v-for="(item,index) in productlist" :key="index">
        <img class="img" :src="imgPath(item.logo)"/>
        <div class="name">{{item.name}}</div>
        <div class="price">
          <span class="nowPrice">￥<strong>{{proPrice(item.finalPrice)}}</strong></span>
          <span class="oldPrice">{{proPrice(item.marketPrice)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  const priceExp = /(\d\d)$/

  export default {
    props: {
      productlist: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      imgPath(url) {
        return `https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/${url}`
      },
      proPrice(price) {
        price = price.toString().replace(priceExp, '.$1')
        return price
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .product-list
    width: 100%
    ul
      display: flex
      flex-wrap: wrap
      background: #f3f3f3
      .product-item
        width: 49%
        padding: 5px
        margin-right: 2%
        margin-bottom: 2%
        box-sizing: border-box
        background: $color-background
        &:nth-child(2n)
          margin-right: 0
        .img
          display: inline-block
          width: 100%
        .name
          height: 40px
          margin-top: 6px
          font-size: $font-size-medium
          color: $color-text
          line-height: 1.5
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
        .price
          margin-top: 6px
          .nowPrice
            display: inline-block
            font-size: $font-size-small
            color: $color-theme
            strong
              font-size: $font-size-medium
          .oldPrice
            display: inline-block
            float: right
            text-decoration: line-through
            font-size: $font-size-small
            color: $color-text-d

</style>
