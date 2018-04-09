import Vue from "vue"

import axios from 'axios';
export default {
  data(){
    return {
     title:'',
     right:'',
     path:''
    }
  },
  mounted(){
				
				var urlfrom=location.hash.split('/')[1];
				console.log(urlfrom)
			
				
		
				switch (urlfrom){
					case 'user':
											this.title='登录';
											this.path='/findpsd';
											this.right='忘记密码';
											this.$router.push('/user');
						break;
						case 'register':
											this.title='新用户注册';
											this.path='/register';
											this.right='';
											this.$router.push('/register');
						break;
					default:
						break;
				}
				
				
			
				
				
    
  },
  methods:{
    goback(){
    	window.history.go(-1);
    },
    doaction(){
    	this.$router.push('/home');
    }
    
  },
  computed:{
    
  },
  components:{
   
  },
  watch:{
    
  },
  updated:{}
}
