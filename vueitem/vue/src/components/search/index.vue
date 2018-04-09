<template>
	<div class="header">
		<div class="search">
			<a href="/home" class="logo"></a>
			<mt-search v-model="value" cancel-text="取消" placeholder="套装">
			</mt-search>
			<a href="/user" class="user"></a>
		</div>
	</div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>