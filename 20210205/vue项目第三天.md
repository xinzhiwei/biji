  1.骨架屏

     请求数据还没有回来，页面显示的白屏
     如何优化：1.前端加上loading
       在main.js公共模块内加拦截器
        Vue.prototype.$axios = axios；
        Axios.defaults.baseURL='';
         // 拦截器
         // 1.请求发起钱显示loading
            Axios.interceptors.request.use(function(config){
              // 不变配置  可变，可以设置公共的请求头操作
              MintUI.Indicator.open({
                text:""
              });
              return config; // config: {header}
            })

         // 2.响应回来后关闭loading
            Axios.interceptors.response.use(function(response){
              MintUI.Indicator.close();
              // response: {config:{}, data:{}}
              return response;
            })

    2.vue-preview 图片预览插件
     使用：
      1. 下载 npm i vue-preview -S
      2. 把vue-preview插件配置到main.js中
        import VuePreview from 'vue-preview';
        Vue.use(VuePreview);
        //使用时也可以不配置可以不写下面的内容
        Vue.use(preview,{
          mainClass:'',
          barsSize:{},
          captionEl:false,
          ...
        });          

  总结：使用插槽slot时，如何设置插槽里内容的样式
         1.使用者本身可以对传入的slot元素设置样式
         2.接收到这个dom的组件，能给slot以后的元素设置样式，而不能给slot设置样式  
          修改slot样式例子：
           <div class=''icon>
             <slot name='icon'></slot>
           </div>        
           icon img{
             ....
           }

      query与params
                               
        1. query： 
             /xxx?id=1    
             path:'/xxx'   路由配置规则   
             this.$router.query.id   组件接收
             to: {query:{id:1}}     传递
        2. params：
             /xxx/1      
             path:'/xxx/:id'  路由配置规则
             this.$router.params.id   组件接收
             to: {params:{id:1}}     传递

      使用vue-preview 图片预览插件时
         注意：使用某些插件的时候，尽肯能减小使用的成本，用最简单的dom先实现功能，再对比自己代码和属性

      slot不是真实存在的，它只是一个插槽，样式是无法在slot上设置的。我们可以通过slot外加一个父标签设置 
        <div class='icon'>
          <slot><slot>
        </div>
        通过 .icon来定位slot传过来的标签进行样式设置,如果外面传来的是img标签，写法如下
        .icon img {}   
