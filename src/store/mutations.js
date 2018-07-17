import * as types from './mutation-types'

const mutations = {
  [types.SET_PRODUCTLIST](state, productList) {
    state.productList = productList
  }
}

export default mutations
