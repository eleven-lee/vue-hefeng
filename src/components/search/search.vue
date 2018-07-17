<template>
  <transition name="search-fade" @click.stop>
    <div class="search" v-show="showFlag">
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
        <span @click="back" class="cancel">取消</span>
      </div>
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <scroll class="shortcut" ref="shortcut" :data="shortcut">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li @click="addQuery(item.label)" class="item" v-for="(item,index) in hotKey" :key="index">
                  <span>{{item.label}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear">
                <i @click="showConfirm" class="icon-clear"></i>
              </span>
              </h1>
            </div>
          </div>
        </scroll>
      </div>
      <div class="search-result" v-show="query" ref="searchResult">
        <suggest ref="suggest" @blurInput="blurInput" :query="query"></suggest>
      </div>
      <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import Suggest from 'components/suggest/suggest'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        showFlag: false,
        hotKey: [],
        query: ''
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      shortcut() {
        return this.hotKey
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query) {
        this.query = query
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      back() {
        this.showFlag = false
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      _getHotKey() {
        getHotKey(this.query).then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data
          }
        })
      }
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchBox,
      Scroll,
      Confirm,
      Suggest
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    z-index: 100
    &.search-fade-enter-active, &.search-fade-leave-active
      transition: all 0.3s
    &.search-fade-enter, &.search-fade-leave-to
      transform: translate3d(100%, 0, 0)
    .search-box-wrapper
      display: flex
      padding: 10px
      background: $color-theme
      .cancel
        display: inline-block
        font-size: 15px
        line-height: 36px
        width: 40px
        padding-left: 20px
        color: $color-background
    .shortcut-wrapper
      position: fixed
      top: 70px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 15px
            font-size: $font-size-medium
            font-weight: bold
            color: $color-text
            line-height: 1.5
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 1px
            background: #f3f3f3
            font-size: $font-size-small
            color: $color-text
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 70px
      bottom: 0
</style>
