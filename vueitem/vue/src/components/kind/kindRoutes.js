

import Search from "@/components/search"
import Kind from "@/components/Kind"
import Footer from "@/components/footer"
export default[
	{
		path:'/kind',
		name:'kind',
		components:{
			header:Search,
			content:Kind,
			footer:Footer
		}
	}
]
