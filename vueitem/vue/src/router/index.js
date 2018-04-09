import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Search from "@/components/search"
//import Home from "@/components/home"
import Footer from "@/components/footer"
//import Kind from "@/components/kind"
import Cart from "@/components/cart"
import User from "@/components/user"
import Detail from "@/components/detail"
import CommonHeader from "@/components/commonheader"
import Register from "@/components/register"
import homeRoutes from '@/components/home/homeRoutes.js'
import kindRoutes from '@/components/kind/kindRoutes.js'
import orderRoutes from '@/components/order/orderRoutes.js'
import cartRoutes from '@/components/cart/cartRoutes.js'

Vue.use(Router)

export default new Router({
  routes: [
  	...homeRoutes
   ,
  	...kindRoutes
    ,
    ...orderRoutes
    ,
  	...cartRoutes
     ,
    {
      path: '/detail/:pid',
      name: 'detail',
      components:{
      	
      	content:Detail
      	
      },
      props:{//解耦
      
      	content:true
      	
      }
    },
    {
      path: '/user',
      name: 'user',
      components:{
      	header:CommonHeader,
      	content:User,
      	footer:Footer
      }
    },
    {
      path: '/register',
      name: 'register',
      components:{
      	header:CommonHeader,
      	content:Register
      	
      }
    },
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '*',
      redirect: "/home"
    }
  ]
})
