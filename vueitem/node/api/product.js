var express = require('express');
var router = express.Router();
var mysql = require('./../public/javascripts/mysql');
var async = require('async');
var md5 = require('md5')

var SendCode = require("./sendCode.js") //引入验证码模块

//
///* GET home page. */
router.get('/', function(req, res, next) {

	//当前页码数
	let pageNO = req.query.pageNO;
	pageNO = pageNO ? pageNO : 1;

	//			console.log(req.query.sale == undefined);
	//	console.log(req.query.sort);
	//			console.log(sortObj);
	if(req.query.sort == "-1") {
		//		console.log('121')
		var sale = -1;
	} else if(req.query.sort == "1") {
		//		console.log('11')
		var sale = 1;

	} else {
		var sale = 0;
	}
	//	console.log(sale);

	//总页数
	let page = 0;
	//每页显示的数据量
	let pageSize = 3;
	var limitNum = pageSize;
	//总条数
	let count = 0;
	var queryObj = {};
	var showObj = {};

	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "产品列表"
	}

	mysql.connect((db) => {
		async.series([
			(callback) => {

				mysql.find(db, "product", queryObj, showObj, (data) => {
					count = data.length;
					page = Math.ceil(count / pageSize);
					pageNO = pageNO < 1 ? 1 : pageNO;
					pageNO = pageNO > page ? page : pageNO;

					callback(null, "") //null代表没有错误

				})
			},
			(callback) => {
				var skipNum = (pageNO - 1) * pageSize;
				var pageCode = pageNO;
				var sortObj = {
					sale: sale * 1
				};
				//				console.log('1234567');
				//				console.log(sortObj);
				//				console.log(skipNum);

				if(sale == "0") {
					mysql.findFenye1(db, "product", queryObj, showObj, pageSize, skipNum, pageNO, (data) => {
						callback(null, data);
					})
				} else {
					mysql.findFenyeSort(db, 'product', queryObj, showObj, limitNum, skipNum, pageCode, sortObj, (data) => {
						//						console.log(data);
						callback(null, data);
					})
				}

			}
		], (err, result) => {
			//			console.log(result);

			var dataobj = {
				result: result[1],
				pageNO: pageNO,
				page: page,
				sort: sale,
				count: count,
				pageSize: pageSize,
				userInfo: [userInfo]
			}

			res.send(dataobj)
			//			res.render('product', dataobj);

			db.close();
		})

	})

});

//批量删除

router.post('/delsign', function(req, res, next) {

	let arr = req.body.id.split(',');

	mysql.connect((db) => {

		var deleteObj = {};
		for(var i = 0; i < arr.length; i++) {
			deleteObj = {
				shopId: arr[i]
			}

			mysql.deleteOne(db, "product", deleteObj, (result) => {

				res.send('1');
				db.close();

			})
		}

	})

})

//产品搜索
router.post('/search', function(req, res, next) {

	let obj = req.body;

	console.log(obj)

	var userInfo = {
		loginname: req.session.name,
		loginid: req.session.key,
		title: "产品列表"
	}

	mysql.connect((db) => {
		var queryObj = {
			$or: [

				{
					title: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					shopId: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					props: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					orgPrice: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					price: {
						$regex: obj.con,
						$options: "i"
					}
				},
				{
					sale: {
						$regex: obj.con,
						$options: "i"
					}
				}

			]
		};
		var showObj = {};
		//		console.log(queryObj)
		mysql.find(db, "product", queryObj, showObj, (result) => {

			console.log(result);

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}

			res.send(dataobj)

			db.close();

		})

	})

})

//添加产品页面
router.get('/add', function(req, res, next) {
	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "产品管理"
	}
	var dataobj = {

		userInfo: [userInfo]
	}
	res.render('addproduct', dataobj);

});

//确认添加产品
router.post('/addproductAction', function(req, res, next) {

	console.log(req.body)
	mysql.connect((db) => {
		var insertData = req.body;
		var queryObj = {
			shopId: insertData.shopId
		};
		insertData.sale = Number(insertData.sale);
		var showObj = {};

		mysql.find(db, "product", queryObj, showObj, (data) => {

			if(data.length) {
				//该产品已存在
				res.send("0");
				db.close();
			} else {

				mysql.insert(db, "product", insertData, (result) => {
					//可以添加
					res.send("1")
					db.close();
				})

			}
		})

	})
})

//修改产品信息
router.get('/modifyproduct', function(req, res, next) {

	var userInfo = {
		loginname: req.session.name,
		loginkey: req.session.key,
		title: "修改产品信息"
	}
	var obj = req.query;

	var queryObj = {
		shopId: obj.shopId
	};
	console.log(queryObj)
	var showObj = {};
	mysql.connect((db) => {
		mysql.find(db, "product", queryObj, showObj, (result) => {

			var dataobj = {
				result: result,
				userInfo: [userInfo]
			}
			console.log(dataobj)
			res.render('productrefresh', dataobj);

			//			res.render('tips', dataobj);
			db.close();

		})
	})

});
//确认更新产品信息
router.post('/modifyproductAction', function(req, res, next) {
	console.log(req.body)
	mysql.connect((db) => {
		var updateObj = req.body;
		updateObj.sale = Number(updateObj.sale);
		var whereObj = {
			shopId: updateObj.shopId
		};

		mysql.updateOne(db, "product", whereObj, updateObj, (result) => {

			res.send('1');
			db.close();
		})

	})

});
//删除产品信息
router.post('/delproduct', function(req, res, next) {
	var obj = req.body;

	mysql.connect((db) => {
		var deleteObj = {
			shopId: obj.shopId
		}

		mysql.deleteOne(db, "product", deleteObj, (result) => {

			res.send("1");
			db.close();

		})

	})

});

//============================产品信息=================================
router.get('/pop', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "pop", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/new', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "new", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/sell', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "sell", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/kind', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "kind", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

router.get('/detail', function(req, res, next) {
	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "detail", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});
//订单
router.get('/order', function(req, res, next) {
	var queryObj = {
		paystate: "2"
	};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});
//======获取验证码======
router.get('/code', function(req, res, next) {

	console.log(req.query);
	var obj = req.query;

	SendCode.aliyun(obj.phone, "陈中孝", "SMS_123665504", obj.code, (data) => {
		console.log(data)
		res.send("1") //必需要为字符串1
	})

});
//=====注册=====
router.get('/register', function(req, res, next) {
	var obj = req.query;

	mysql.connect((db) => {
		mysql.find(db, "buyuser", {
			phone: obj.phone
		}, {
			_id: 0
		}, (data1) => {

			if(data1.length > 0) {
				res.send('0')
				db.close();

			} else {

				var inserData = {
					phone: obj.phone,
					password: md5(obj.password)

				}

				//无责插入
				mysql.insert(db, 'buyuser', inserData, (result) => {
					res.send('1')
					db.close();

				})

			}

		})
	})

});

//====登录======
//=====注册=====
router.get('/buyuser', function(req, res, next) {
	var obj = req.query;

	mysql.connect((db) => {
		mysql.find(db, "buyuser", {
			phone: obj.phone,
			password: md5(obj.password)
		}, {
			_id: 0
		}, (data1) => {

			if(data1.length > 0) {
				res.send('1')
				db.close();

			} else {

				res.send('0')
				db.close();

			}

		})
	})

});

//直接购买商品
router.get('/directsalt', function(req, res, next) {
	var cartdata = req.query;
	console.log(req.query)
	mysql.connect((db) => {
		mysql.find(db, "detail", {}, {
			_id: 0
		}, (data1) => {

			for(var i = 0; i < data1.length; i++) {

				if(cartdata.pid == data1[i].result.itemInfo.iid) {
					var title = data1[i].result.itemInfo.title;
					var oldPrice = data1[i].result.itemInfo.oldPrice;
					var price = data1[i].result.itemInfo.price;
					var shopname = data1[i].result.shopInfo.name;

				}
			}
			var inserData = {
				id: cartdata.pid,
				color: cartdata.color,
				size: cartdata.size,
				num: Number(cartdata.num),
				img: cartdata.img,
				title: title,
				oldPrice: oldPrice,
				price: price,
				shopname: shopname,
				timestamp: cartdata.timestamp,
				paystate: cartdata.paystate
			}

			//无责插入
			mysql.insert(db, 'cart', inserData, (result) => {
				res.send('1')
				db.close();

			})

		})
	})

});

//获取订单信息
//router.get('/order', function(req, res, next) {
//	var queryObj = {
////		paystate: "2"
//	};
//	var showObj = {
//		_id: 0
//	}
//	mysql.connect((db) => {
//		mysql.find(db, "cart", queryObj, showObj, (data) => {
//			res.send(data)
//
//			db.close();
//		})
//	})
//});

//获取购物车信息
router.get('/cart', function(req, res, next) {
	var queryObj = {
		//		paystate: "1"
	};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			res.send(data)

			db.close();
		})
	})
});

//单件删除产品
router.get('/signledel', function(req, res, next) {
	console.log(req.query.timestamp)
	var deleteObj = {
		timestamp: req.query.timestamp
	}

	mysql.connect((db) => {

		mysql.deleteOne(db, "cart", deleteObj, (result) => {

			res.send('1');
			db.close();

		})
	})

});
//批量删除产品
router.get('/somedel', function(req, res, next) {
	console.log(req.query.someneeddel)

	var someneeddel = req.query.someneeddel

	mysql.connect((db) => {

		var deleteObj = {};
		for(var i = 0; i < someneeddel.length; i++) {
			deleteObj = {
				timestamp: someneeddel[i]
			}

			mysql.deleteOne(db, "cart", deleteObj, (result) => {

				res.send('1');
				db.close();

			})
		}

	})

	//	var deleteObj={
	//		timestamp:req.query.timestamp
	//	}
	//	
	//	mysql.connect((db) => {
	//		
	//		mysql.deleteOne(db, "cart", deleteObj, (result) => {
	//
	//				res.send('1');
	//				db.close();
	//
	//			})
	//	})

});

//更新购物车产品数量
router.get('/updatedetail', function(req, res, next) {
	console.log('gengxin cart')
	var cartdata = req.query;
	console.log(cartdata, "cartdata")

	var queryObj = {
		id: cartdata.pid,
		color: cartdata.color,
		size: cartdata.size,
	};
	var showObj = {
		_id: 0
	}

	var whereObj = queryObj;

	mysql.connect((db) => {

		mysql.find(db, "detail", {}, {
			_id: 0
		}, (data1) => {

			for(var i = 0; i < data1.length; i++) {
				if(cartdata.pid == data1[i].result.itemInfo.iid) {
					var title = data1[i].result.itemInfo.title;
					var oldPrice = data1[i].result.itemInfo.oldPrice;
					var price = data1[i].result.itemInfo.price;
					var shopname = data1[i].result.shopInfo.name;

				}
			}
			var inserData = {
				id: cartdata.pid,
				color: cartdata.color,
				size: cartdata.size,
				num: Number(cartdata.num),
				img: cartdata.img,
				title: title,
				oldPrice: oldPrice,
				price: price,
				shopname: shopname,
				timestamp: cartdata.timestamp,
				paystate: cartdata.paystate
			}

			mysql.find(db, "cart", queryObj, showObj, (data) => {

				if(data.length > 0) {
					//有责更新
					var initnum = data[0].num;
					var allnum = Number(initnum) + Number(cartdata.num);
					var updateObj = {
						id: cartdata.pid,
						color: cartdata.color,
						size: cartdata.size,
						num: allnum,
						img: cartdata.img,
						title: title,
						oldPrice: oldPrice,
						price: price,
						shopname: shopname,
						timestamp: cartdata.timestamp,
						paystate: cartdata.paystate
					}
					mysql.updateOne(db, "cart", whereObj, updateObj, (result1) => {

						res.send('1');
						db.close();
					})

				} else {
					//无责插入
					mysql.insert(db, 'cart', inserData, (result) => {
						res.send('1')
						db.close();

					})

				}

			})

		})

	})

});

//获取购物车产品数量
router.get('/cartnum', function(req, res, next) {

	var queryObj = {};
	var showObj = {
		_id: 0
	}
	mysql.connect((db) => {
		mysql.find(db, "cart", queryObj, showObj, (data) => {
			//			console.log(data.length,'data.length');
			var numboj = {
				num: data.length
			}
			res.send(numboj);
			db.close();
		})
	})
});

module.exports = router;