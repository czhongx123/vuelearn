import axios from 'axios'
var myajax = {
	axiosGet(option) {
		axios.get(option.url, option.data)
			.then(function(result) {
				option.success(result.data)
			})
			.catch(function(err) {
				option.fail(err)
			})
	}
}

export default myajax;