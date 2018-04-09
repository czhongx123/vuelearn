import * as types from './mutations-types.js'
export default{
	[types.BANNER_LIST_MUTATION](state,data){
		state.bannerlist=data.result
	}
}



