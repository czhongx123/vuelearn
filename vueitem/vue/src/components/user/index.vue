<template>
 <div class="content">
 	
 	<form action="/api/product/login" method="get" v-show="!islogin">
 		<div class="frombox">
 			<p>美丽说账号</p>
 			<input type="text" class="txt" name="user" placeholder="请输入手机号" v-model="phone" />
 		</div>
 		<div class="frombox">
 			<p>密码</p>
 			<input type="password" class="psd" name="password"  placeholder="输入密码" v-model="password" />
 		</div>
 		
 		<input type="button" class="login" value="登录" @click="login()" :disabled="loginstate"  />
 		<p class="tip"><span>免密登录</span><a class="toregister" @click="register()">注册账号</a></p>
 	</form>
 	<div class="logined" v-show="islogin">
 		<p>欢迎<span>{{buyuser}}</span></p>
 		<p class="logout" @click="logout">退出登录</p>
 		
 	</div>
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped="scoped" src="./style.scss"></style>