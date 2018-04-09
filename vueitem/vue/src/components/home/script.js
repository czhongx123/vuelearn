import Banner from './../banner'
import Hometab from './../hometab'
import axios from 'axios';
import Vue from 'vue'


import { mapState } from 'vuex'
import  * as types from '@/store/mutations-types.js'

export default {
  data(){
    return {
     
    }
  },
  mounted(){
		 this.$store.dispatch('bannerlistaction')
    
  },
  methods:{
    
    
  },
  computed:{
    	test(){
      return "111111"
   	 },
//		  ...mapState(
//		  	['bannerlist']
//		  )
  },
  components:{
   "v-banner":Banner,
	'v-hometab':Hometab
  },
  watch:{
    
  }
  
  
}
