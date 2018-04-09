import Vue from "vue"
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';

import axios from 'axios';
export default {
	data() {
		return {
			orderlist: [],
			needpay: ''
		}
	},
	mounted() {
		//获取购物车信息
		

		var urlfrom = location.hash.split('?')[1];

		axios.get('http://localhost:3000/api/product/detail')
			.then((data) => {

				if(urlfrom == 'paynow') {
					var fromarr = JSON.parse(localStorage.getItem('paynow'))

				} else {
					var fromarr = JSON.parse(localStorage.getItem('carttoorder'))

				}

				console.log(fromarr, 'fromarr')
				

				var arr = [];

				for(var i = 0; i < data.data.length; i++) {

					for(var j = 0; j < fromarr.length; j++) {

						if(fromarr[j].pid == data.data[i].result.itemInfo.iid) {

							for(var k = 0; k < data.data[i].result.skuInfo.skus.length; k++) {

								if(fromarr[j].color == data.data[i].result.skuInfo.skus[k].style && fromarr[j].size == data.data[i].result.skuInfo.skus[k].size) {

									arr.push({
										id: fromarr[j].pid,
										color: fromarr[j].color,
										size: fromarr[j].size,

										num: fromarr[j].num,
										price: data.data[i].result.itemInfo.price.split('¥')[1],
										oldPrice: data.data[i].result.itemInfo.price.split('¥')[1],
										title: data.data[i].result.itemInfo.title,
										shopnum: data.data[i].result.shopInfo.name,
										img: data.data[i].result.skuInfo.skus[k].img

									})

								}

							}

						}

					}

				}
				console.log(arr, 'arr');

				this.orderlist = [...new Set(arr)]

				var pay = 0;
				for(var i = 0; i < arr.length; i++) {

					pay = Number(pay) + Number((arr[i].price) * (arr[i].num))
				}
				console.log(pay)
				this.needpay = pay.toFixed(2);

			})
			.catch(function(err) {
				console.log(err)
			})

		//页面操作
		//定义全局变量

	},
	methods: {
		goback() {
			window.history.go(-1);
		},

	},
	computed: {

	},
	components: {

	},
	watch: {

	}
}