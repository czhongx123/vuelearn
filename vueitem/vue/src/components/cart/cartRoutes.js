

import Search from "@/components/search"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
export default[
	{
		path: '/cart',
      name: 'cart',
      components:{
      	content:Cart,
      	footer:Footer
      }
	}
]
