import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'

import { Lazyload } from 'mint-ui'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem,Lazyload);

import homeData from '@/api/homeData.js'

import axios from 'axios';
export default {
  data(){
    return {
      bannerList:[]
    }
  },
  mounted(){
//		var url="http://localhost:3000/api/banner";
//		axios.get(url)
//       .then((data)=>{
//       	console.log(data.data.result)
//       	this.bannerList=data.data.result
//       })
                   
				homeData.bannerlist(this.requestBannerListSuccess);
		
    
  },
  methods:{
    requestBannerListSuccess(data){
//    console.log("bannerlist", data)
      this.bannerList = data.result;
    }
    
  },
  computed:{
    
  },
  components:{
   
  },
  watch:{
    
  }
}
