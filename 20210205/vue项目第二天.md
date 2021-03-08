如何注册全局组件
  a.在main.js文件中
    import My** from './component/My**';
    Vue.component(My**.name, My**); 
     注意：My**.name是组件的名称  export default下的name属性
  
  注意：1.工作中，页面下面固定一个下面导航，到时显示内容被下面的导航盖住了，如何解决
     显示内容样式加一个margin-bottom即可  
        
        2.工作中，会遇到，url带参的情况，改变参数会重新获取数据，但是会有bug，你收到改参数后，第一次回车没有效果，第二次回车才会获取数据
          解决：使用组件内路由守卫 beforeRouteUpdate(to,from,next){
            let { id } = to.query;
            this.$axios().then().catch();
            next();
          } 
      

1.moment.js 处理日期过滤
  日期格式为
   time: 2015-04-16T04:05:34.000Z如何转换为年月日
       {{ time | convertTime('YYYY-MM-DD') }}

   moment.js使用：
      1. 下载 
      2. 在main.js配置管理器
         import Moment from 'moment';
         Vue.filter('convertTime',function(data,formatStr){
           return Moment(data).format(formatStr);
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

        template中使用 <vue-preview>  
        

3.mint-ui 图片懒加载 lazy-load


4.全局过滤器使用 
  Vue.filter("**",function(原数据){
    return **;
  })
  过滤器调用  {{ ** }}  可以增加参数 **('##1','##2')

5.路由根据历史记录返回 this.$router.go(-1);

 总结：1. v-html 里绑定的样式只能使用全局样式来修改
       （即v-html样式在scoped 的里面不起作用）
       2. 跳转的开发步骤 
          a.去哪里  
          b.配置导航
          c.显示数据(是否需要获取路由参数)
       3. 路由传参 params模式和query模式
          params格式：
            <router-link :to='{name: "***", params: {id: **.**}}'>
            {title: '', className:'',route:''}

            router.js 中 path: '/**/##/:id' //id是上面跳转时的params里的参数 
            获取参数 this.$route.params

          query格式：
             在跳转是的对象里加参数
             {title: '', className:'',route:'', query: {categoryId: **}}

             router.js 中path后不用写   
             获取参数 this.$route.query

       4. 如果对象obj里有id值，现在先获取对象里的id值，可以使用ES6中的解构赋值， 写法：let {id} = obj;    