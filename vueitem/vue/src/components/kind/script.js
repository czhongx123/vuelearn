
import axios from 'axios';
export default {
  data(){
    return {
     kindlist:[]
    }
  },
  mounted(){
			axios.get('http://localhost:3000/api/product/kind')
    			.then((data)=>{
    				this.kindlist=data.data
    			})
    			.catch(function(err){
    				console.log(err)
    			})
    
  },
  methods:{
    
    
  },
  computed:{
    
    			
    
    
    
  },
  components:{
   
  },
  watch:{
    
  }
}
