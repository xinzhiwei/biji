    ######### vue第七天
  1.mixin混入
    应用场景 
       组件a，b，2个都需要c的数据，但是
       其中只有一个需要发送请求c
    mixin 将公共的行为 混入到组件中

    mixin的基本使用：
      1. 新建mixin.js （命名为my_mixin.js）
         export default {  // 相当于组件影子
           created() {
             setTimeout(()=>{
               this.$axios.get().then(res=>{
                 console.log(res)
               })
             },1000)
           }
         }  

      2. app.vue中使用
         a. 引入mixin文件
         import mixin from '@/my_mixin';  
         export default {
           mixins: [mixin];
           name: 'App'
         }

         其他组件使用也可也，如son.vue组件
         import mixin from '@/my_mixin';  
         export default {
           mixins: [mixin];
           name: 'Son'
         }

      3. 可以在继承到vue上做成全局
         在main.js中
          import myMixin from '@/my_mixin';
          Vue.mixin(myMixin);

    vue中mixin的使用2：
        1. 项目下新建mixin文件，（名称myPlugin.js）
           // 可以使用对象也可以使用方法。此处使用方法
           let myOptions;
           function MyPlugin(options){
             myOptions = options;
             return MyPlugin;
           }
           // 注意此处我们把mixin设计成为插件，需要有install函数
           myPlugin.install = function(Vue){
             // mixin名
             Vue.mixin({
               created() {
                  // 判断当前组件名
                  if(this.$options.name ==='about' || this.$options.name ==='about') {
                    // 根据vuex去调用，改变数据（谁改）？
                    this.$store.dispacth('addByAct');
                  }
               }

             }) 
           }
           export default MyPluginl

        2. main.js中引入mixin
           // 配置插件
           import MyPlugin from './myPlugin.js';
           Vue.use(MyPluginl);

        3.组件中可以使用，此处我们使用的是vuex，组件通过调用store即可获取数据      



  2.history
    1.如果不希望看到url中有#，可以使用history
    url上面有#是不会跳转的他只是个锚点值，锚点值改变不会触发路由跳转
    2.package.json中，如果存在main: '**',与module:'##';
      此时会以module为主（module优先级高于main） 
    只有调用go || forward 函数，才会根据历史记录更换页面
    切换的过程会触发popstate事件

    3.history可以做滚动
    history模式。可以使用history.pushState改变URL
    只有调用go || forward 函数，才会根据历史记录更换页面
    切换的过程会触发popstate事件
    
    使用history
      1.在router.js路由文件下 
      export default new Router({
        mode: 'history', //去除了#的history模式
                        // 基于h5中的history.pushState函数（加历史记录）
      })

  3.骨架屏原理
    针对首屏加载比较慢时才需要骨架屏
     例子： 在 <div id='app'>
                  <div>页面数据没加载时显示</div>
               </div>
    不同页面也具有不同的骨架屏
     例子： 路由骨架屏
        

  总结：
    1.mixin适合做公共性的，不建议做太可视化的页面
    2. vue-router简单的实现原理
      hash：1.安装插件是监听hashchange事件监视_router
            2.处理routes获取到path关联组件
            3.等待hashchange触发，匹配routes中的数据
            最终得到matched赋值给_route 
            4.触发了_route的监听行为，router-vew这个组件此时获取到_router，来昨晚渲染的内容(User)

       a. Vue.use初始化，给route添加监视更改后更新视图 
       b. 禁用组件其他事件，对click进行操作，router-link
           在页面会转化成 <a href="#/***"></a>
       c. 将/*** 匹配所以路由规则routes得到matched
          export default new Router({
            routes:[   // 路由规则
              {
                path: '/***',
                name: '***',
                component: ***,  // 对应的matched
              }
            ]
          }) 

       d. 将matched保存到route 供未来router-view使用  （会触发a步骤，实现更新视图）
         视图更新后就会触发router-view，视图更新，调用组件render函数，获取_router，渲染_router保存到matched组件（以其父组件的名义，其就等同于其父使用路由匹配组件）


