import * as types from './mutations-types.js'
import homeData from '@/api/homeData.js'

export default {
	bannerlistaction(context) {
		homeData.bannerlist((data) => {
		console.log(data,'aaaaaaaaaaaaaaaaaaaaa')
			context.commit({
				type: types.BANNER_LIST_MUTATION,
				result: data
			})
		})
	}
}