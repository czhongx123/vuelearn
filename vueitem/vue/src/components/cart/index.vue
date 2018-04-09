<template>
 <div class="content">
 	<div class="header">
 	<ul>
 		<li @click="goback()" class="iconfont icon-fanhui5"></li>
 		<li class="center" >购物车</li>
 		<li @click="doaction(daedit)" class="right">{{daedit}}</li>
 	</ul>
 	
 </div>
 	<div class="topemptybox"> 		
 	</div>
 	
 	<div class="emptycar" v-show="flag">
 		<p>您的购物车还空着呢，</p>
 		<p>美物这么多，快去看看吧</p>
 		<router-link to='/home'  >去逛逛</router-link>
 	</div>
 	
 	<form class="carcon" v-show="!flag" >
	
	 	<div class="product" v-for="(item,index) in cartlist" :key='index' >
	 		<div class="protit">
	 			<p class="tit1">
	 				<input type="checkbox" :value="item.timestamp" v-model="item.checked" @click='ifselect()' />
	 			</p>
	 			<p class="shop">店铺：<span>{{item.shopname}}</span></p>
	 			<p class="shopprice">合计：<span><em>¥</em>{{ item.checked  ? ( item.num*(item.price.split('¥')[1])).toFixed(2) : 0 }}</span></p>
	 			<em class="iconfont icon-icon--2"></em>
	 		</div>
	 		<div class="procon">
	 			<p class="con1">
	 				<input type="checkbox" :value="item.timestamp" v-model="item.checked" @click='ifselect()' />
	 			</p>
	 			
	 			<img :src="item.img"  />
	 			<div class="prodeil">
	 				<p class="prodeiltit">{{item.title}}</p>
	 				<p class="style">
	 					<span>颜色:<em>{{item.color}}</em></span>
	 					<span>尺码:<em>{{item.size}}</em></span>
	 				</p>
	 				<p class="num">
	 					<em @click="numaction(-1,index,item.checked)">-</em>
	 					<span>{{item.num}}</span>
	 					<em @click="numaction(1,index,item.checked)">+</em>
	 				</p>
	 			</div>
	 			<div class="priceaction">
	 				<span class="price" >{{item.price}}</span>
	 				<em class="oldPrice">{{item.oldPrice}}</em>
	 				<em class="iconfont icon-lajitong" @click="del(item.timestamp)"></em>
	 			</div>
	 			
	 		</div>
	 		
	 	</div>
 		<div class="emptybox">
 			
 		</div>
 		<div class="payitem">
 			<p class="all" >
 				<input type="checkbox" v-model="allchecked" @click="allselect()"/>
 			</p>
 			<div class="allprice">
 				<p>合计:<span>¥<em>{{allpay}}</em></span></p>
 				<p>不含运费，优惠扣减</p>
 			</div>
 			<p class="pay" @click="goorder()">
 				去结算(<span>{{paylength}}</span>)
 			</p>
 		</div>
 	
 		
 		
 		
 	</form>
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>