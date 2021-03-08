       PWA
  1.自定义指令 directives
     自定义指令： 封装
     自定义指令使用  main.js
         // 使用的时候是v-demo 注册的时候是demo
       Vue.directive('demo', {
          // 指令被编译号，即将运行功能的时候出发
          bind: function(el, binding, vnode) {
            var s = JSON.stringify;
            el.innerHTML = 
              'name:' + s(binding.name) + '<br>' +
                // 计算表达式的结果（vue运行环境内）
              'value:' + s(binding.value) + '<br>' +
                // 原本的表达式
              'expression:' + s(binding.expression) + '<br>' +
              'argument:' + s(binding.argument) + '<br>' +
              'modifiers:' + s(binding.modifiers) + '<br>' +
              'vnode:' + Object.keys(vnode).join(',')
          }
       })

       组件中使用
         <div id="hook-arguments" v-demo:foo.a.b = 'msg'>
           name = demo value= aaaa expression==msg argument = foo
         js
            msg: 'aaaa'

       例题
         1. 按钮点击，让页面出现input元素
         2. input自动获取焦点
         3. 结合指令做 
         html
          <button @click="isShow=!isShow">按钮</button>
          <input type="" name="" v-if="isShow" v-focus>

          <!--方法2-->
          <button @click="addInput">按钮</button>
          <input type="" name="" v-if="isShow" ref=“input>
         js
          export default {
            directive: {
              focus: {
                // bind: 初始化
                // 元素被插入的时候， this.$refs.***
                inserted: function(el) {
                  console.log(el);
                  el.focus()
                }
              }
            },
            data() {
              return {
                isShow: false
              }
            },
            methods: {
              addInput() {
                this.isShow = !this.isShow;
                // 让元素获取焦点
                this.$nextTick(function() {
                  this.$refs.input.focus();
                })

                注意：此处要是不是呀$nextTick的话们不能实现获取焦点 
                 保证再vue异步渲染组件的后续执行需要使用$nextTick()
              }
            }
          }

      总结： $nextTick() 使用场景
          临时插入元素，之前不存在，插入后需要对其进行dom操作


  2.PWA (渐进式/web/application)
    谷歌公司将现有的技术，结合起来推广的一整套的方案
    PWA可以离线浏览web应用， 生成桌面应用等

    service worker
      本质就是浏览器开启的一个线程（类似webworker）， 该线程可以拦截请求，发送请求（类似node服务器）  .

    CacheAPI
      可以存储到浏览器上json数据也可以缓存js文件  

  3.nuxt