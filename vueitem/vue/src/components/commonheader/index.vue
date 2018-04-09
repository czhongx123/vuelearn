<template>
 <div class="header">
 	<ul>
 		<li @click="goback()" class="iconfont icon-fanhui5"></li>
 		<li class="center" >{{title}}</li>
 		<router-link tag='li' :to='path'  class="right">{{right}}</router-link>
 	</ul>
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped="scoped" src="./style.scss"></style>
