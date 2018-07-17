<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          @beforeScroll="blurInput">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index" v-html="item">
      </li>
    </ul>
    <div v-show="!result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'

  export default {
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        result: []
      }
    },
    methods: {
      refresh() {
        this.$refs.suggest.refresh()
      },
      search() {
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query).then((res) => {
          if (res.code === ERR_OK) {
            this.result = res.data
          }
        })
      },
      blurInput() {
        this.$emit('blurInput')
      }
    },
    watch: {
      query() {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        height: 40px
        line-height: 40px
        font-size: $font-size-small
        border-bottom: 1px solid $color-background-d
        color: $color-text
        overflow: hidden
        no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
