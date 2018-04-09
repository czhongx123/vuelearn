<template>
	<div id="app">
		<!--<img src="./assets/logo.png">-->
		<router-view name='header'></router-view>
		<router-view name='content'></router-view>
		<router-view name='footer'></router-view>

	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	@import '~@/lib/reset.scss';
	#html,
	body,
	#app {
		@include rect(100%, 100%);
	}
	
	#app {
		@include flexbox();
		@include flex-direction(column);
		.header {
			@include rect(100%, 0.45rem);
			border-bottom: 0.001rem solid #eee;
		}
		.content {
			@include flex();
			@include rect(100%, auto);
			overflow: auto;
		}
		.footer {
			    border-top: 1px solid #e5e5e5;
			@include rect(100%, 0.5rem);
			@include background-color(#fafafa);
			ul {
				@include rect(100%, 100%);
				@include flexbox();
				@include justify-content();
				@include align-items();
				li {
					@include flexbox();
					@include flex-direction(column);
					@include justify-content();
					@include align-items();
					@include flex();
					
				}
			}
		}
	}
	
	img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
	
	
	
</style>