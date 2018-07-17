<template>
  <div class="index">
    <scroll class="content" ref="scroll" :data="content" @touchmove.prevent>
      <div>
        <div class="search-box-wrapper" @click="search">
          <search-box></search-box>
        </div>
        <div v-if="sliders.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="(item,index) in sliders" :key="index">
                <a href="">
                  <img :src="item.sourcePath" class="img "/>
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="menu-list">
          <ul class="menu-ul">
            <li class="menu-item" v-for="(item,index) in menuList" :key="index">
              <img class="icon" :src="imgPath(item.path)"/>
              <span class="text">{{item.name}}</span>
            </li>
          </ul>
          <div class="notice">
            <div class="title">促销活动</div>
            <ul class="notice-list">
              <li class="item" :class="{'active':animate===true}" v-for="(item,index) in notices" :key="index">
                {{item.title}}
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="adv-img">
          <img :src="advImg"/>
        </div>
        <div class="seckill-wrapper">
          <seckill :seckills="seckills"></seckill>
        </div>
        <split></split>
        <div class="recommend-wrapper" ref="recommendWrapper">
          <h1 class="title">热卖推荐</h1>
          <product-list :productlist="recommend"></product-list>
        </div>
      </div>
    </scroll>
    <search ref="search"></search>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import {getSilder} from 'api/slider'
  import {ERR_OK} from 'api/config'
  import Split from 'base/split/split'
  import Seckill from 'components/seckill/seckill'
  import ProductList from 'base/product-list/product-list'
  import {productlistMixin} from 'common/js/mixin'
  import {getSeckill} from 'api/seckill'
  import SearchBox from 'base/search-box/search-box'
  import Search from 'components/search/search'

  export default {
    mixins: [productlistMixin],
    data() {
      return {
        sliders: [],
        seckills: [],
        recommend: [],
        notices: [],
        pullup: true,
        query: '',
        animate: false
      }
    },
    created() {
      this.menuList = [
        {
          name: '白酒',
          path: 'f1f95c9b-0070-4679-8ad7-41942a6b3ea1'
        },
        {
          name: '葡萄酒',
          path: '481d1631-51ff-4a87-b1ac-9c555f06566e'
        },
        {
          name: '洋酒',
          path: 'de00d676-76d3-44e3-8c19-cdaa1075100a'
        },
        {
          name: '啤酒',
          path: '03138d6c-4ce4-48a2-886f-8b16c027afdd'
        }
      ]
      this._getSlider()
      setInterval(this._getNotice, 3000)
      this._getSeckills()
    },
    computed: {
      content() {
        return this.seckills.concat(this.recommend)
      },
      advImg() {
        return 'https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/39b098a1-f745-466e-a809-5750810d59fa'
      }
    },
    methods: {
      handleProductlist(productlist) {
        const bottom = productlist.length > 0 ? '48px' : ''
        this.$refs.recommendWrapper.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      imgPath(path) {
        return 'https://1919-new-bbc-pro.oss-cn-beijing.aliyuncs.com/' + path
      },
      search() {
        this.$refs.search.show()
      },
      _getSlider() {
        getSilder().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.adList.slice(0, res.data.adList.length - 2)
          }
        })
      },
      _getNotice() {
        this.animate = true
        setTimeout(() => {
          this.notices.push(this.notices[0])
          this.notices.shift()
          this.animate = false
        }, 500)
      },
      _getSeckills() {
        getSeckill().then((res) => {
          if (res.code === ERR_OK) {
            this.notices = res.data.infoButtins
            this.seckills = res.data.seckills.slice(0, 9)
            this.recommend = res.data.singlePromotion[0].voList
          }
        })
      }
    },
    components: {
      Scroll,
      Slider,
      SearchBox,
      Split,
      Seckill,
      ProductList,
      Loading,
      Search
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .index
    .content
      position: fixed
      width: 100%
      top: 0
      bottom: 48px
      overflow: hidden
      .search-box-wrapper
        position: fixed
        width: 100%
        padding: 10px 20px
        box-sizing: border-box
        z-index: 99
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 72%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .menu-list
        border-bottom: 1px solid #f3f3f3
        .menu-ul
          display: flex
          flex-wrap: wrap
          width: 100%
          padding: 10px 0
          .menu-item
            width: 25%
            text-align: center
            margin: 10px 0
            .icon
              display: block
              margin: 0 auto
              width: 48px
              height: 48px
              border-radius: 20px
            .text
              display: block
              margin-top: 10px
              font-size: $font-size-medium
              color: $color-text
        .notice
          display: flex
          height: 50px
          line-height: 50px
          border-top: 1px solid #f3f3f3
          .title
            font-size: 15px
            color: #e7324b
            margin: 0 10px
            font-weight: bold
          .notice-list
            flex: 1
            padding: 0
            overflow: hidden
            .item
              font-size: $font-size-small
              color: #666666
              line-height: 50px
              &.active
                transition: all 0.5s
                margin-top: -25px
      .adv-img
        width: 100%
        min-height: 1
        img
          width: 100%
          height: 100%
      .seckill-wrapper
        width: 100%
        margin: 20px 0
        padding-left: 10px
      .recommend-wrapper
        width: 100%
        .title
          width: 100%
          margin: 0 auto
          padding: 20px 0
          font-size: $font-size-medium-x
          text-align: center
          border-bottom: 1px solid #f3f3f3
          color: $color-text
</style>
