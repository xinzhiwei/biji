### vue项目第一天
   1.路由权限控制
     路由对象加上meta给全局路由守卫来做参照条件
     例子：{path:'/**',name:'##',component:##,meta:{$$:true}}
     router.beforeEach(function(to,from,next){
       if(!to.meta.$$){
         next();
       } else{}
     })

   2.嵌套路由
      变化的视图中包含变化的视图
      代码层面：
        router-view中包含router-view
        路由children路由

  3.拦截器
    axios.interceptors.use(fn);
    请求发起前               响应回来后  
    a.操作请求体数据        a.操作响应数据
      transformRequest 
    b.基本URL baseURL
    c.params查询字符串参数
    d.操作请求头  

    拦截器的使用场景：一次代码公共使用

  4.vue-cli3  
     vue插件必须具备install函数
     function Installer() {
       // 自身初始化
     }

     Installer.install = function(Vue) {
       // 接收Vue的构造函数，给原型挂载属性或者注册全局组件或者管理器
       // 1.注册全局组件
       Vue.component('test',{
         template:`<h1>这是个全局组件</h1>`;
       })
       // 2. 挂载属性
       let log = function() {
         console.log('我们自己的插件的log函数');
       }
       Object.defineProperty(Vue.prototype.'$log', {
         // 设置$log属性时的行为， || 或者不能设置
         set:function(newV){
           console.log('不允许修改');
           // log = newV; 修改log函数
         }
         get: function() {
           return log;
         }
       });
     }

     export default Installer;

     main.js 中引入自己的插件安装器
     import Installer from '@/plugins/installer';
     Vue.use(Installer);