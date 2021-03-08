###  vue-cli2 vue-cli3
  ##主要，路由重定向
       routes: [
         {
           path: "",
           redirect: "/index", 重定向
         }
       ]

   1. vue中 v-for 中的key作用
      key的作用主要是高效的更新虚拟DOM（diff算法）
       没有key的话，数据插入一个值后，数据会一对一，当遇到插入值时会把插入的值占用当前位置的值，然后依次类推，别插入的值会占用下一个位置，有key的话每个值都有一个位于的key，没有的就是新插入的，只处理新加入的会快很多
       key值最好使用每项的id，不太建议使用index下标
        

   2. $emit和$on进行组件之间的传值
      $emit 与$on 的事件必须在一个公共的实例上面，才能够触发
       需求： 有ABC三个主角，同时挂载到入口组件内，
              将A 组件数据传递到C，再将B组件的数据传递给C  （评级组件传值）

        $emit与$on的使用 
        1.与ABC三组件同级新建公共组件Event组件
           var Event = new Vue(),
        2.组件AB中使用中间组件调用$emit
          组件A  Event.$emit("b-msg", this.b);
          组件B  Event.$emit("a-msg", this.a); 

        3.组件C接收产生
          Event.$on("a-msg",(a)=>{
            console.log(a, "A组件传的参数");
          })  
          Event.$on("b-msg",(b)=>{
            console.log(b, "B组件传的参数");
          })

          注意：$on的第一个参数为在$emit时的事件名，参数2为回调函数
        
                


      

   3. vue-router导航守卫
      a.vue-router的导航守卫 --- 在导航完成后获取数据 
        数据获取期间获取loading

      b. 导航完成之前获取数据 
         to 进人之后的路由  from 从哪里进来 next下步到哪里
         ***(){}

         组件内导航
         beforeRouteEnter(to,from,next){
           组件进入前，不能获取实例this,守卫执行前，组件实例还没要被创建（不可以使用this）
           但是可以使用next
           axios.get().then(res=>{
             next(vm=>vm.***)
           })
         }

         beforeRouteUpdate(to,from,next){
           当前路由改变，但是该组件被复用时调用
         }

         beforeRouteLeave(to,from,next){
           导航离开该组件的对应路由时调用
           使用场景：离开页面时清除定时器
           next(); 表示放行
         } 

   4. vue-cli2.x脚手架使用
      npm i vue-cli -g 安装   vue -V 查看版本
      https://github.com/vuejs/vue.cli/tree/v2#vue-cli
      vue init 模板名称 项目名称
        1.Project name: 项目名称
        2.Project description  项目描述
        3.Author  作者
        4.Vue build 如何编译， 第一选项为大部分人使用的编译  第二位只编译vue文件
        5.Install vue-router  是否安装router  
        6.Use ESLint to lint your code  是否使用eslint来检查你的代码
        7.Set up unit tests 是否使用单元测试
        8.Setup e2e tests with Nightwatch 是否使用e2e测试
        9.选择使用npm还是yarn包管理工具

        src
          main.js 项目入口文件  导入模块
          app.vue 入口组件
          components 公共组件
          assets src的静态资源
          pages 业务组件放置处
        static 公共的静态资源

        @符号相当于src目录

      模板有： webpcak 建议使用webpcak
              webpack-simple
              browserify
              pwa
              simple 单独html文件中最简单的vue模板

   5. vue-cli3x脚手架的使用
      vue-create **  创建vuecli3模板
      vue ui 使用UI图型创建项目

   6. vue 传参 provide和inject

   7. RESTfull 接口api  
       RESTfull是一种软件框架风格

       响应时设置状态码
       1** 信息 服务器收到请求，需要请求者继续执行
       2** 成功， 操作被成功接收并处理
       3** 重定向 需要进一步的操作完成请求
       4** 客户端错误 请求包涵语法错误或无法完成请求
       5** 服务器错误 服务器在处理请求的过程中发生错误
       