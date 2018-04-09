<template>
 <div class="hometab">
 	<!--切换按钮-->
 	<ul class="tabtit">
 		<li v-for='(item,index) in list ' :key='index' :class='{active:isactive[index]}' @click="change(index,item.sort)"><span>{{item.title}}</span></li>
 	</ul>
 	<!--切换内容-->
 	<ul class="tabcon">
 		<router-link  v-for="(item,index) in tabconlist " :key='index' tag='li' :to='{name:"detail",params:{pid:item.iid}}'>
 			<img v-lazy="item.show.img" class="pic" />
 			<p class="contit">{{item.title}}</p>
 			<p class="condetail">
 				<span>{{item.price}}</span>
 				<em><img src="./../../assets/tabicon.png" class="icon" /></em>
 				<strong>{{item.cfav}}</strong>
 			</p>
 		</router-link>
 	</ul>
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>