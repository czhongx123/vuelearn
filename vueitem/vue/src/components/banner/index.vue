<template>
 <div class="banner">
 	<mt-swipe :auto="4000">
  <mt-swipe-item v-for="(item,index) in bannerList">
  		<a href="#"  :key='index'><img v-lazy="item.img" alt="" /></a>
  	
  </mt-swipe-item>
  
</mt-swipe>
 	
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped="scoped" src="./style.scss"></style>