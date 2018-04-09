import Vue from 'vue'
//引入提示信息框
import { Toast } from 'mint-ui';

import axios from 'axios';

export default {
	data() {
		return {
			phone: '',
			code: '',
			phoneState: false,
			psdState: false,

			registerstate: true,
			msg: '发送验证码',
			rand: '', //随机验证码
			password: ''
		}
	},
	mounted() {

	},
	methods: {
		validatePhone(phone) {
			this.registerstate = false

			var phone1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ig;

			if(phone.match(phone1)) {

				this.phoneState = true;

			}

		},
		validatePassword(password) {
			var psd1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ig;

			if(this.password.match(psd1)) {
				this.psdState = true;

			}
		},
		sendCode() {
			if(this.phoneState && this.psdState) {
				this.sendState();

				//生成随机验证码
				var random = Math.floor(Math.random() * 900000 + 100000);
				this.rand = random;
				console.log(random);

				axios.get('http://localhost:3000/api/product/code', {
					params: {
						phone: this.phone,
						code: this.rand
					}
				}).then((data) => {
					console.log(data, '1234567890')

					if(data.data == '1') {
						Toast({
							message: '验证码已发送，请尽快查收',
							position: 'center',
							duration: 1000
						});

					}

				}).catch(function(err) {
					console.log(err);
				})

			} else if(!this.phoneState) {
				Toast({
					message: '请填写正确的手机号',
					position: 'center',
					duration: 1000
				});
				this.phone = '';
			} else {
				Toast({
					message: '请设置正确的密码格式',
					position: 'center',
					duration: 1000
				});
				this.password = '';
			}

		},
		sendState() {
			var num = 60;
			var timer = setInterval(() => {
				num--;
				this.msg = num + '后可重新点击';
				this.phoneState = false;
				this.psdState = false;

				if(num == 0) {
					clearInterval(timer);
					this.msg = '发送验证码';
					this.phoneState = true;
					this.psdState = true;
				}
			}, 1000)

		},

		register() {
			console.log(this.code, '8765431234567')
			
				if(this.code!='' && this.code == this.rand ){
						
					axios.get('http://localhost:3000/api/product/register', {
									params: {
										phone: this.phone,
										password: this.password
			
									}
								}).then((data) => {
									
			
									if(data.data == '0') {
										Toast({
											message: '该用户已注册',
											position: 'center',
											duration: 1000
										});
										this.phone = ''
									}
			
									if(data.data == '1') {
										Toast({
											message: '注册成功',
											position: 'center',
											duration: 1000
										});
			
										this.$router.push('/user');
			
			
								}}).catch(function(err) {
									console.log(err);
								})
						
						
						
						
					
				}else{
					Toast({
									message: '验证码错误',
									position: 'center',
									duration: 1000
								});
					
					
					
				}	
			

								
			
							
		}

	},

	computed: {

	},
	components: {

	},
	watch: {
		phone(newVal, oldVal) {
			//    console.log(newVal)

			if(newVal == "") {
				this.registerstate = true

			} else {

				this.validatePhone(newVal)

			}

		},
		password(newVal, oldVal) {
			//    console.log(newVal)
			this.validatePassword(newVal)
		}

	}
}