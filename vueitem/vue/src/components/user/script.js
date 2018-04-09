import Vue from 'vue'
//引入提示信息框
import { Toast } from 'mint-ui';

import axios from 'axios';

export default {
  data(){
    return {
     phone:'',
     password:'',
     phoneState:false,
     psdState:false,
     loginstate:true,
     islogin:false,
     buyuser:''
    }
  },
  mounted(){
  	
  	if(localStorage.getItem('buyuser')){
  		this.buyuser=localStorage.getItem('buyuser')
  		this.islogin=true
  	}else{
  		this.islogin=false
  	}
  	
  	
    
  },
  methods:{
  	register(){
  		this.$router.push('/register')
  	},
  	validatePhone(phone) {
			
			var phone1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ig;

			if(phone.match(phone1)) {

				this.phoneState = true;
				this.loginstate=false;

			}

		},
		validatePassword(password) {
			var psd1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ig;

			if(this.password.match(psd1)) {
				this.psdState = true;

			}
		},
    login(){
    
    		if(this.phoneState && this.psdState){
    			
    			
    			
    			
    			axios.get('http://localhost:3000/api/product/buyuser', {
									params: {
										phone: this.phone,
										password: this.password
			
									}
								}).then((data) => {
									
			
									if(data.data == '0') {
										Toast({
											message: '用户名或密码错误',
											position: 'center',
											duration: 1000
										});
										
									}
			
									if(data.data == '1') {
										Toast({
											message: '登录成功',
											position: 'center',
											duration: 1000
										});
			
									localStorage.setItem('buyuser',this.phone)
										setTimeout(()=>{
											
											this.$router.push('/home');
										})
										
			
								}}).catch(function(err) {
									console.log(err);
								})
						
    			
    			
    			
    			
    			
    			
    			
    		}else{
    			
    			Toast({
									message: '用户名或密码格式错误',
									position: 'center',
									duration: 1000
								});
    			
    			
    			
    		}
    	
    	
    	
    	
    },
    logout(){
    	
    	localStorage.removeItem('buyuser');
			this.$router.push('/user');
    	
    	
    }
    
  },
  computed:{
    
  },
  components:{
   
  },
  watch:{
    phone(newVal, oldVal) {
			
			if(newVal == "") {
				this.loginstate = true

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
