// require配置
require.config({
  // baseUrl
  //paths: 用来配置一下常用的文件、文件夹路径
  // 注意：paths里面的配置，也是相对于baseUrl的
  paths: {
    // ***: '地址'
  }
  //shim
})

// require(['***'],function(){
//   console.log('首页');
// })

// 注意：在define([],function) 或者 require([],function(){}) 写文件地址的时候是以require所在的js文件所在目录进行查找的
require(['user'],function(userIndex){
  console.log('首页');
  userIndex();
})