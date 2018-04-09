import myajax from './mytool/myajax.js'
export default {
  bannerlist(cb){//请求首页banner的数据
    var option = {
      url: "http://localhost:3000/api/banner",
      data: {
        params:{}
      },
      success: function(data){
        cb(data)
      },
      fail:function (err){
        console.log(err)
      }
    }
    myajax.axiosGet(option)
  },
  tablepoplist(cb){//请求首页banner的数据
    var option = {
      url: "http://localhost:3000/api/product/pop",
      data: {
        params:{}
      },
      success: function(data){
        cb(data)
      },
      fail:function (err){
        console.log(err)
      }
    }
    myajax.axiosGet(option)
  }
  
  
  
}
