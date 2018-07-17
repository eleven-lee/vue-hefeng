<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/index">
      <span class="icon icon-home"></span>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/category">
      <span class="icon icon-menu"></span>
      <span class="tab-link">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/order">
      <span class="icon icon-shopping_cart"></span>
      <span class="tab-link">购物车</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/user">
      <span class="icon icon-user"></span>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    position: fixed
    display: flex
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    font-size: $font-size-small
    background: $color-background
    text-align: center
    border-top:1px solid #f3f3f3
    z-index: 99
    .tab-item
      display: flex
      flex: 1
      color: $color-highlight-background
      justify-content: center
      flex-direction: column
      .icon
        font-size: $font-size-large-x
      .tab-link
        margin-top: 2px
      &.router-link-active
        .tab-link, .icon
          color: $color-theme
</style>
