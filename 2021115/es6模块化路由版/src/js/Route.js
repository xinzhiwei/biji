define([], function() {
  function Route(option) {
    this.routes = option.routes;
    this.init();
  }
  Route.prototype = {
    constructor:Route,
    init() {
      var _that = this;
      // 1. 监听路由变化
      window.addEventListener('hashchange',function(){
         // 1.1 获取最新的hash值
         var hash = location.hash.substring(1);

         // 1.2 将hash跟本地保存的路由中的path进行匹配，匹配到指定路由，就执行指定模块的代码
         var route = _that.routes.find(item=>{
           return item.path === hash;
         });

         // 如果找不到符合条件的元素，那么route值为空
         if(route) {
           route.component();
         }
      });
    }
  }

  return Route;
})