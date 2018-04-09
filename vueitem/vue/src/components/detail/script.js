import Vue from "vue";
import axios from 'axios';

//引入轮播图
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//引入提示信息框
import { Toast } from 'mint-ui';



//引入懒加载
import { Lazyload } from 'mint-ui'
Vue.component(Lazyload);

export default {
	props: ['pid'],
	data() {
		return {
			currentColor: 100,//用于获取当前颜色
			currentSize: 100,
			curimg:'',		//显示当前照片
			detailid: [],
			selectid: [],
			stocknum: '',
			color: [],
			size: [],
			buynum: 1,
			isShow: true,
			isHide: false,
			isSelect: 0,
			cartnum: '',
			selectitem: [],
			selectcolor: "",
			selectsize: "",
			selectnum: "",
			selectinfo: [],
			buyflag: false,
			isselectok: false,
			selectcon: {},
			paystate:1  //1为去购物车，2为去支付

		}
	},
	mounted() {
		//http://m.meilishuo.com/detail/mls/v1/h5?iid=1lroidq
		var id = this.pid;

		axios.get('http://localhost:3000/api/product/detail')
			.then((data) => {

				var curid = [];
				for(var i = 0; i < data.data.length; i++) {

					if(id == data.data[i].result.itemInfo.iid) {
						curid.push(data.data[i])

					}
				}

				this.detailid = curid[0].result;
				this.selectid = curid[0].result.skuInfo;
				this.selectinfo = curid[0].result.skuInfo.skus;
				this.curimg=this.detailid.itemInfo.topImages[0];
				var snum = 0;
				var curcolor = [];
				var cursize = [];
				for(var i = 0; i < curid[0].result.skuInfo.skus.length; i++) {
					snum += Number(curid[0].result.skuInfo.skus[i].stock);
					curcolor.push(curid[0].result.skuInfo.skus[i].style);
					cursize.push(curid[0].result.skuInfo.skus[i].size);

				}

				this.stocknum = snum;
				this.color = [...new Set(curcolor)];
				this.size = [...new Set(cursize)];

			})
			.catch(function(err) {
				console.log(err);
			})

		//获取购物车产品的数量
		axios.get('http://localhost:3000/api/product/cartnum')
			.then((data) => {			
//				console.log(data);
				this.cartnum = data.data.num;
			})
			.catch(function(err) {
				console.log(err);

			})

	},
	methods: {
		//操作数量
		dobuynum(num) {
			if(num == 1) {
				if(this.buynum != 1) {

					this.stocknum = Number(this.stocknum) + 1
				}
				//上下顺序不能颠倒
				this.buynum == 1 ? this.buynum = 1 : this.buynum--;

			}
			if(num == 2) {
				this.buynum = Number(this.buynum) + 1

				//				this.buynum++;
				this.stocknum--;
			}

			console.log(this.buynum, "qi buy")

		},
		//关闭弹出窗
		close() {
			this.isHide = false;

		},

		//打开弹窗
		select(style) {
			this.isHide = true;
			if(style == 2) {
				this.buyflag = true;
			}

		},

		//选择商品
		selectstyle(style, index) {

			//设定选中的样式
			if(style == 'color') {
				this.currentColor = index

			}
			if(style == 'size') {
				this.currentSize = index

			}

			this.$nextTick(() => {

				//获取选中产品的库存数量
				var selectstyle = [];

				if(document.querySelectorAll("span.active").length == 2) {
					selectstyle.push(document.querySelectorAll("span.active")[0].innerHTML);
					selectstyle.push(document.querySelectorAll("span.active")[1].innerHTML);

					this.isselectok = true;

					for(var j = 0; j < this.selectinfo.length; j++) {

						for(var k = 0; k <= 2; k++) {
							//获取仓库的数量的值	
							if((selectstyle[0] == this.selectinfo[j].style && selectstyle[1] == this.selectinfo[j].size) || (selectstyle[1] == this.selectinfo[j].style && selectstyle[0] == this.selectinfo[j].size)) {

								this.stocknum = this.selectinfo[j].stock
								this.selectcon = this.selectinfo[j];
								this.curimg=this.selectinfo[j].img;
							}

						}

					}

				}

			})

		},

		//确认产品
		surebuy() {

			if(this.isselectok) {

				if(this.stocknum == 0) {

					Toast({
						message: '该商品已售罄，请继续选择其他类型的商品',
						position: 'center',
						duration: 1000
					});

				} else {
					if(this.buyflag) {
						//跳转到订单页面
						//this.$router.push('/order')
						console.log("去订单")
						this.paystate=2;
						this.selectcon.buynum = this.buynum;

						this.selectcon.pid = this.pid;
						console.log(this.selectcon);
						//获取事件戳，作为产品添加的标志id
						var timestamp=new Date().getTime();
		
						console.log(timestamp);
									


						
							var data=[{
								pid: this.pid,
									color: this.selectcon.style,
									size: this.selectcon.size,
									num: this.selectcon.buynum
							}]
							
						localStorage.setItem('paynow',JSON.stringify(data))
																
						this.$router.push('/order?paynow')
		
						
						
					} else {
						//返回到详情页,添加商品到购物车

						this.selectcon.buynum = this.buynum;

						this.selectcon.pid = this.pid;
						console.log(this.selectcon);
						//获取事件戳，作为产品添加的标志id
						var timestamp=new Date().getTime();
		
						console.log(timestamp);



//						var order = JSON.parse(localStorage.getItem('buycaritem'))

//						if(order) {
//
//							for(var i = 0; i < order.length; i++) {
//								if(order[i].pid == this.pid && order[i].size == this.selectcon.size && order[i].style == this.selectcon.style) {
//
//									order[i].buynum = Number(order[i].buynum) + Number(this.selectcon.buynum)
//
//									console.log('一样')
//									localStorage.setItem('buycaritem', JSON.stringify(order))
//
//								} else {
//
//									order.concat([this.selectcon]);
//
//									var cc = order.concat([this.selectcon]);
//
//									localStorage.setItem('buycaritem', JSON.stringify(cc));
//
//								}
//
//							}
//
//						} else {
//
//							localStorage.setItem('buycaritem', JSON.stringify([this.selectcon]))
//
//						}

						//console.log(order);	
						//将总数量更新到购物车
						//将产品id，颜色，尺寸，数量发送过去，后台接受存入数据库
						axios.get("http://localhost:3000/api/product/updatedetail", {
								params: {
									pid: this.pid,
									color: this.selectcon.style,
									size: this.selectcon.size,
									num: this.selectcon.buynum,
									img: this.selectcon.img,
									timestamp:timestamp,
									paystate:this.paystate
								}
							})
							.then((data) => {
//								console.log(data);
								console.log('加入购物车成功');
							
								if(data.data == '1') {
									console.log("插入成功")
									
									Toast({
									message: '已添加至购物车',
									position: 'center',
									duration: 1000
									});
									
							setTimeout(function(){
								
								location.reload();
							},100)
									
									
									
								}

							})
							.catch(function(err) {
								console.log(err);
							})

						

					}
				}

			} else {

				Toast({
					message: '请选择商品类型和尺寸',
					position: 'center',
					duration: 1000
				});

			}

		}

	},
	computed: {

	},
	components: {

	},
	watch: {

	}
}