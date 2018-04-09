<template>
 <div class="content">
 	<div class="orderheader">
	 	<ul>
	 		<li @click="goback()" class="iconfont icon-fanhui5 back"></li>
	 		<li class="center" >订单确认</li>
	 		<li @click="doaction(daedit)" class="right">我的订单</li>
	 	</ul>
 	
 	</div>
 	<form action="">
 		
 		<div class="address">
		请填写收货地址
		</div>
		
		<div class="orderlist" v-for="(item,index) in orderlist " :key='index' >
			<div class="ordertit">
				<p>{{item.shopname}}</p>
				<a href="">联系商家</a>
			</div>
			<div class="ordercon">
				<div class="contop">
					<img :src="item.img" alt="" />
					<div class="orderconcenter">
						<p class="tit">{{item.title}}</p>
						<p class="style">
							<span>颜色：<em>{{item.color}}</em></span>
							<span>尺码：<em>{{item.size}}</em></span>
							
						</p>
						<p class="pricelist">
							<span class="price">{{item.price}}</span>
							<span class="oldPrice">{{item.oldPrice
	}}</span>
							<span>x<em></em>{{item.num}}</span>
						</p>
						
					</div>
				</div>
				
				<div class="msg">
					<p><span>配送方式:</span><em></em><strong>无</strong></p>
					<p><span>快递运费:</span><em></em><strong>￥0.00</strong></p>
					<p ><span>价格合计:</span><em></em><strong class="allprice">¥<em>{{((item.num)*(item.price)).toFixed(2)}}</em></strong></p>
					<input type="text" placeholder="给卖家留言" />
					
				</div>
				
			</div>
		
		
		
		</div>
		
		
		<div class="bottom">
			<p class="alert">请不要相信任何人通过短信，QQ等发送的所谓的"退款链接"</p>
			<p class="topay">
				<span>应付款:</span>
				<em>¥</em>
				<em>{{needpay}}</em>
				<a href="" >提交订单</a>
			</p>
		</div>
 		
 		
 	</form>
	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>