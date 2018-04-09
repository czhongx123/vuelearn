<template>
 <div class="content">
 <!--	{{pid}}-->
 <!--轮播-->	
<mt-swipe :auto="0">
  <mt-swipe-item v-for='(item,index) in detailid.itemInfo.topImages
' :key='index'><img v-lazy='item'/></mt-swipe-item>
  
</mt-swipe>
 	
 	
 <div class="detailcon">
 	<p class="detailtit">{{detailid.itemInfo.title}}</p>
 	<div class="detailitem">
 		<span class="price">{{detailid.itemInfo.price}}</span>
 		<span class="oldprice">{{detailid.itemInfo.oldPrice}}</span>
 		<span class="discound">{{detailid.itemInfo.discountDesc}}</span>
 		
 	</div>
 	<div class="detailinfo" >
 		
 		<span>{{detailid.columns[0]}}</span>
 		<span>{{detailid.columns[1]}}</span>
 		<span>{{detailid.itemInfo.extra.deliveryTime}}小时发货</span>
 		<span>{{detailid.itemInfo.extra.sendAddress}}</span>
 		
 	</div>
 </div>
 
 <!--购物车数量-->
 
 <router-link to='/cart' class="tocart">
 	<em class="cartnum">{{cartnum}}</em>
 </router-link>
 
 
 
 <!--穿着效果-->
 <div class="sellshow">
 	<p>{{detailid.detailInfo.detailImage[0].key}}</p>
 	<img v-for='(item,index) in detailid.detailInfo.detailImage[0].list '  :key='index' v-lazy="item" />
 </div>
 	
 <!--底部信息-->	
 <ul class="detailfooter">
 	<li class="seller" ><a href="#" ><span></span><em>客服</em></a></li>
 	<li class="shopID"><a href="#" ><span></span><em>店铺</em></a></li>
 	<li class="inheart"><a href="#" ><span></span><em>收藏</em></a></li> 	
 	<li class="addcart"><a @click="select(1)" >加入购物车</a></li>
 	<li class="buy"><a @click="select(2)" >购买</a></li>
 </ul>
 	
 <!--点击弹出窗口-->	
 	
 	<div class="select" v-if="isHide">
 		<div class="selectitem">
 		
	 		<div class="selectinfo">
	 			<img :src="curimg" />
	 			<div class="selectcon">
	 				<p class="selecttit">{{selectid.title}}</p>
	 				<p class="selecttips">
	 					<span>￥{{(selectid.skus[0].nowprice/100).toFixed(2)}}</span>
	 					<em>库存{{stocknum}}件</em>
	 				</p>
	 				<p class="tips">请选择颜色、尺码</p>
	 			</div>
	 			<div class="close" @click="close()">╳</div>
	 		</div>
 		
 		
 		
	 		<div class="color">
	 			<p>颜色:</p>
	 			<p class="coloritem">
	 				<span v-for="(item,index) in color" :key='index'  @click="selectstyle('color',index)" :class="currentColor == index ? 'active': ''" ref="colorItem" >{{item}}</span>
	 						
	 			</p>
	 		</div>
	 		<div class="size">
	 			<p>尺码:</p>
	 			<p class="sizeitem">
	 				
	 				<span v-for="(item,index) in size" :key='index'  @click="selectstyle('size',index)" :class="currentSize == index ? 'active': ''">{{item}}</span>				 							
	 			</p>
	 		</div>
	 		<div class="quanty">
	 			<p>数量:</p>
	 			<p class="sizeitem">
	 				<span @click="dobuynum(1)" class="minus">-</span>
	 				<em>{{buynum}}</em> 				
	 				<span @click="dobuynum(2)">+</span> 				
	 			</p>
	 		</div>
	 		
	 	
	 		
	 		<p class="buysure" @click="surebuy()">确定</p>
 		</div>
 	</div>
 	
 	
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>