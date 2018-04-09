

import Search from "@/components/search"
import Home from "@/components/home"
import Footer from "@/components/footer"
export default[
	{
		path:'/home',
		name:'home',
		components:{
			header:Search,
			content:Home,
			footer:Footer
		}
	}
]
