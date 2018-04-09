<template>
 <div class="content">
 	
 	<form action="/api/product/register" method="get">
 		<div class="frombox">
 			<p>您的手机号码是？</p>
 			<input type="text" class="txt" name="user" v-model="phone" placeholder="请输入手机号" />
 		</div>
 		<div class="frombox">
 			<p>请设定密码</p>
 			<input type="password" class="psd" name="password" v-model="password" placeholder="请设定密码" />
 		</div>
 		<div class="frombox">
 			<p>验证码</p>
 			<div class="codeitem">
	 			<input type="text" class="code" name="code" v-model="code"  placeholder="输入验证码" />
	 			<p class="sendcode"  @click="sendCode()"  >{{msg}}</p>
 			</div>
 		</div>
 		
 		<input type="button" class="register" :disabled="registerstate" @click="register()" value="一键注册" />
 		<p class="tip"><a href="#/user" class="login" >账号密码登录</a><a  >免密登录</a></p>
 	</form>
 	
 </div>
</template>
<script src="./script.js"></script>
<style lang="scss" scoped="scoped" src="./style.scss"></style>