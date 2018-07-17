<template>
  <div class="category">
    <div class="search-box-wrapper" @click="search">
      <search-box></search-box>
    </div>
    <div class="category-content" ref="categoryContent">
      <ul class="category-list" ref="categoryList">
        <li @click="selectCategory(item,index)" class="category-item" :class="{'active':currentIndex===index}"
            v-for="(item,index) in categorylist"
            :key="index">{{item.categoryName}}
        </li>
      </ul>
    </div>
    <ul class="product-catalog">
      <li class="item" @click="saleSort" :class="{'active':currentSort === 0}">
        <span>销量</span>
      </li>
      <li class="item" @click="priceSort" :class="{'active':currentSort === 1}">
        <span>价格</span>
        <i class="icon-sort"></i>
      </li>
      <li class="item" @click="filter" :class="{'active':currentSort === 2}">
        <span>筛选</span>
        <i class="icon-filter"></i>
      </li>
    </ul>
    <div class="category-main">
      <scroll :data="menulist" class="main-left">
        <ul class="menu-list">
          <li @click="selectMenu(item,index)" ref="menulist" class="menu-item" :class="{'active':currentItem===index}"
              v-for="(item,index) in menulist"
              :key="index">
            {{item.label}}
          </li>
        </ul>
      </scroll>
      <scroll ref="productList" :data="productlist" class="main-right">
        <product-list :productlist="productlist"></product-list>
      </scroll>
    </div>
    <search ref="search"></search>
    <filter-box ref="filterBox" :productFilterVos="productFilterVos"></filter-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCategorylist} from 'api/category'
  import {ERR_OK} from 'api/config'
  import BScroll from 'better-scroll'
  import Scroll from 'base/scroll/scroll'
  import ProductList from 'base/product-list/product-list'
  import {getProductList} from 'api/products'
  import SearchBox from 'base/search-box/search-box'
  import Search from 'components/search/search'
  import FilterBox from 'components/filter-box/filter-box'

  export default {
    data() {
      return {
        categorylist: [],
        menulist: [],
        currentIndex: 0,
        currentItem: 0,
        productlist: [],
        categoryId: 0,
        value: '',
        query: '',
        sortBy: false,
        currentSort: 0,
        productFilterVos: []
      }
    },
    mounted() {
      this._getCategorylist()
      this.$nextTick(() => {
        this._initCategorylist()
      })
    },
    methods: {
      filter() {
        this.currentSort = 2
        this.productFilterVos = this.categorylist[this.currentIndex].productFilterVos
        // console.log(this.productFilterVos)
        this.$refs.filterBox.show()
      },
      priceSort() {
        this.currentSort = 1
        if (this.sortBy) {
          this.sortBy = false
          this.productlist.sort((a, b) => {
            return b['finalPrice'] - a['finalPrice']
          })
        } else {
          this.sortBy = true
          this.productlist.sort((a, b) => {
            return a['finalPrice'] - b['finalPrice']
          })
        }
      },
      saleSort() {
        this.currentSort = 0
        this.productlist.sort((a, b) => {
          return b['saleVolume'] - a['saleVolume']
        })
      },
      selectCategory(item, index) {
        this.currentIndex = index
        this.currentSort = 0
        this.categoryId = item.categoryId
        this.currentItem = 0
        this._getMenulist(item)
      },
      selectMenu(item, index) {
        this.currentItem = index
        this._getProductList(this.categoryId, item.value)
      },
      search() {
        this.$refs.search.show()
      },
      _initCategorylist() {
        if (this.categorylist) {
          let cateWidth = 50
          let margin = 10
          let width = (cateWidth + margin) * this.categorylist.length - margin
          this.$refs.categoryList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.cateScroll) {
              this.cateScroll = new BScroll(this.$refs.categoryContent, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.cateScroll.refresh()
            }
          })
        }
      },
      _getCategorylist() {
        getCategorylist().then((res) => {
          if (res.code === ERR_OK) {
            this.categorylist = res.data
            let item = res.data[this.currentIndex]
            this._getMenulist(item)
          }
        })
      },
      _getMenulist(item) {
        this.menulist = [{
          label: '全部'
        }]
        this.menulist = this.menulist.concat(item.productFilterVos[0].filterItems)
        this.categoryId = item.categoryId
        this.value = item.productFilterVos[0].filterItems.value
        this._getProductList(this.categoryId, this.value ? '' : this.value)
      },
      _getProductList(categoryId, value) {
        getProductList(categoryId, value).then((res) => {
          if (res.code === ERR_OK) {
            this.productlist = res.data.items.sort((a, b) => {
              return b['saleVolume'] - a['saleVolume']
            })
          }
        })
      }
    },
    components: {
      Scroll,
      ProductList,
      SearchBox,
      Search,
      FilterBox
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .category
    position: relative
    overflow: hidden
    .search-box-wrapper
      padding: 10px
      background: $color-theme
    .category-content
      display: flex
      height: 40px
      width: 100%
      overflow: hidden
      white-space: nowrap
      line-height: 38px
      border-bottom: 1px solid #efefef
      border-top: 1px solid #efefef
      .category-list
        font-size: 0
        .category-item
          display: inline-block
          width: 50px
          margin-right: 10px
          text-align: center
          font-size: 15px
          color: #666666
          &.active
            color: #e7324b
            border-bottom: 2px solid #e7324b
    .product-catalog
      display: flex
      height: 35px
      text-align: center
      .item
        flex: 1
        line-height: 35px
        font-size: 13px
        &.active
          color: $color-theme
    .category-main
      position: fixed
      display: flex
      top: 130px
      bottom: 48px
      width: 100%
      padding-top: 10px
      background: #efefef
      z-index: -1
    .main-left
      flex: 0 0 80px
      width: 80px
      .menu-list
        .menu-item
          padding: 12px 3px
          font-size: 13px
          text-align: center
          border-bottom: 1px solid #efefef
          background: #ffffff
          &.active
            background: #efefef
    .main-right
      flex: 1
      margin-left: 10px
</style>
