import {mapGetters} from 'vuex'

export const productlistMixin = {
  computed: {
      ...mapGetters([
        'productlist'
      ])
  },
  mounted() {
  this.handleProductlist(this.productlist)
},
activated() {
  this.handleProductlist(this.productlist)
},
watch: {
  playlist(newVal) {
    this.handleProductlist(newVal)
  }
},
methods: {
  handleProductlist() {
    throw new Error('component must implement handleProductlist method')
  }
}
}
