
import Vue from 'vue'
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);


import homeData from '@/api/homeData.js'
import axios from 'axios';
export default {
	
	data() {
		return {
			list: [{
					title: '流行',
					sort: "pop"
				},
				{
					title: '新款',
					sort: "new"
				},
				{
					title: '精选',
					sort: "sell"
				}
			],
			tabconlist: [],
			isactive:[true,false,false]
			
			

		}
	},
	mounted() {
		homeData.tablepoplist(this.requestPopListSuccess)

	},
	methods: {
		requestPopListSuccess(data){
			this.tabconlist=data
		},
		
		change(index, sort) {

			//tab 头部切换
			for(let i = 0; i < 3; i++) {
				this.isactive[i]=false;
			
				this.isactive[index]=true;

			}

			var url = "http://localhost:3000/api/product/" + sort;

			axios.get(url)
				.then((data)=>{			
					this.tabconlist = data.data;
				})
				.catch(function(err) {
					console.log(err)
				})

		}

	},
	computed: {

	},
	components: {

	},
	watch: {

	}
}