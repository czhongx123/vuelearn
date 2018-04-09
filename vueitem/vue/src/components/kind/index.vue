<template>
 <div class="content">
 	<p>本周流行</p>
 	<ul>
 		<li v-for="(item,index) in kindlist" :key='index'>
 			<a :href="item.link">
 				<img :src="item.image" />
 				<span>{{item.title}}</span>
 			</a>
 		</li>
 	</ul>
 </div>
</template>
<script src="./script.js"></script>
<style scoped="scoped" lang="scss" src="./style.scss"></style>