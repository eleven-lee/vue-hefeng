<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder">
    <i @click="clear" class="icon-delete" v-show="query"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索关键字'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    created() {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box
    display: flex
    align-items: center
    width: 100%
    height 36px
    padding: 0 6px
    background: $color-background
    border-radius: 6px
    box-sizing: border-box
    .icon-search
      font-size: 20px
      color: #666666
    .box
      flex: 1
      line-height: 18px
      margin: 0 5px
      background: rgba(255, 255, 255, 0)
      color: $color-text
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color: #efefef
    .icon-delete
      font-size: 16px
      color: #666666
</style>
