<template>
 <div class="footer">
 	<ul>
 		<router-link  v-for='(item,index) in list' tag='li' :to='item.path'  :key='index'><img :src="($route.path==item.path)?item.img1: item.img "/><em>{{item.title}}</em></router-link>
 		
 		
 	</ul>
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped="scoped" src="./style.scss"></style>