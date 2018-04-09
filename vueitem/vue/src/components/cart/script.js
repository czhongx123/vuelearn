import Vue from "vue"
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';

import axios from 'axios';
export default {
	data() {
		return {
			cartlist: [],
			allpay: '',
			paynum: '',
			flag: true,
			daedit: '编辑',
			allchecked: true,
			paylength: ''
		}
	},
	mounted() {
		//获取购物车信息

		axios.get('http://localhost:3000/api/product/cart')
			.then((data) => {

				if(data.data.length > 0) {
					this.flag = false
				} else {
					this.flag = false
				}

				for(var i = 0; i < data.data.length; i++) {

					data.data[i].checked = true

				}
				this.cartlist = data.data;

				console.log(this.cartlist)
				this.allmoney();
				this.checkedlength();

			})
			.catch(function(err) {
				console.log(err)
			})

		//页面操作
		//定义全局变量

	},
	methods: {

		//返回上一页

		goback() {
			window.history.go(-1);
		},
		//编辑

		doaction(edit) {
			//  	this.$router.push('/home');
			console.log(edit);
			if(edit == '编辑') {

				this.daedit = '删除'
			} else {
				//如果为删除的话
				MessageBox.confirm("确定要抛弃我吗？", "亲爱的小主").then(action => {
					var someneeddel = [];
					for(var i = 0; i < this.cartlist.length; i++) {

						if(this.cartlist[i].checked) {
							someneeddel.push(this.cartlist[i].timestamp)

						}

					}
					console.log(someneeddel);
					axios.get('http://localhost:3000/api/product/somedel', {
						params: {
							someneeddel: someneeddel
						}
					}).then((data) => {
						console.log(data.data)

						if(data.data == '1') {

							Toast({
								message: '已删除',
								position: 'center',
								duration: 1000
							});
							setTimeout(function() {

								location.reload();
							}, 100)

						}

					}).catch(function(err) {
						console.log(err);
					})

				})

			}

		},
		//获取选中产品的数量
		checkedlength() {
			var len = 0
			for(var i = 0; i < this.cartlist.length; i++) {
				if(this.cartlist[i].checked) {
					len++
				}

			}
			this.paylength = len;

		},

		//选择所有
		allselect() {
			console.log('2345678')

			if(this.allchecked) {
				for(var i = 0; i < this.cartlist.length; i++) {
					this.cartlist[i].checked = false;

				}

				this.allchecked = false;
			} else {

				for(var i = 0; i < this.cartlist.length; i++) {
					this.cartlist[i].checked = true

				}

				this.allchecked = true

			}
			this.allmoney();
			//			console.log(this.checkedid)
			this.checkedlength();

		},

		//单选框确定价格
		ifselect() {

			this.$nextTick(() => {

				this.allmoney();
				this.checkedlength();

			})

		},

		//改变数量
		numaction(number, index, checked) {
			console.log(number, index, checked)

			this.cartlist[index].num = Number(this.cartlist[index].num) + Number(number);
			if(this.cartlist[index].num <= 1) {
				this.cartlist[index].num = 1;
			}

			this.allmoney();

		},
		//计算所有的价格
		allmoney() {

			var allmoney = 0;

			for(var i = 0; i < this.cartlist.length; i++) {

				if(this.cartlist[i].checked) {

					allmoney += (this.cartlist[i].num) * (this.cartlist[i].price.split('¥')[1])
				}

			}

			this.allpay = allmoney.toFixed(2);

		},
		//单个删除产品
		del(timestamp) {
			console.log(timestamp);

			MessageBox.confirm("确定要抛弃我吗？", "亲爱的小主").then(action => {
				console.log('1234567890-')

				axios.get('http://localhost:3000/api/product/signledel', {
					params: {
						timestamp: timestamp
					}
				}).then((data) => {
					console.log(data.data)

					if(data.data == '1') {

						Toast({
							message: '已删除',
							position: 'center',
							duration: 1000
						});
						setTimeout(function() {

							location.reload();
						}, 100)

					}

				}).catch(function(err) {
					console.log(err);
				})

			})

		},
		//去订单页面
		goorder() {

			//{pid: "1lrrne8", color: "红色", size: "S", num: 2}

			var orderarr = [];
			for(var i = 0; i < this.cartlist.length; i++) {

				if(this.cartlist[i].checked) {

					orderarr.push({
						pid: this.cartlist[i].id,
						color: this.cartlist[i].color,
						size: this.cartlist[i].size,
						num: this.cartlist[i].num,

					})

				}

			}
			localStorage.setItem('carttoorder', JSON.stringify(orderarr))

			this.$router.push('/order');

		}

	},
	computed: {

	},
	components: {

	},
	watch: {

	}
}