 #####  vuex
   1.补充:实现淡入淡出效果   
    // 属性mode="out-in"表示元素先离开，在进入（默认为同时进出）
   <transition name="fade" mode="out-in">
     <组件></组件>
   </transition>
  样式部分
    .fade-enter-active, .fade-leave-active{
      transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {
      opacity:0;
    }

   2.Vuex 管理全局共享数据（vuex可以有多个小仓库，module）
      a.数据仓库 state
      
      b.改变仓库数据的方法 mutation
        同步操作state，异步的话要使用action

      c.获取仓库数据  getter

      d.业务行为 调用改变方式 action（调用mutation）
        组件中调用action
        this.$store.dispatch(某个action, 参数)

      e. modules 模块
         如果使用模块的话，写法如下
         文件夹store 下新建store.js 和num.js文件
          store.js
            import Vue from 'vue';
            import Vuex from 'vuex';
            import num from './num';
            Vue.use(Vuex);
            let store = new Vuex.Store({
              modules: {
                num:num
              }
            })
            export default store;
          num.js文件
            export defaule {
              state:{},
              getters:{},
              mutations:{},
              actions:{}
            }  

   3.Vuex的使用
     新建store.js
      import Vue from 'vue';
       // 1.引入vuex对象
      import Vuex from 'vuex';
      Vue.use(Vuex);
       // 2.创建stroe对象     
      let store = new Vuex.Store({
        // 配置 module:{state,getter,mutation,action}
        state:{
          num:1;
        },
        getter:{
          getNum(state){ // getter离state很近
            return state.num;
          },
          getText(state){
            return ;
          }
        },
          // 更改mutation与state也很近，第一个参数为state
        mutation:{ 
           addNum(state){
             return state.num ++;
           }
        },
        action:{
          // $store.getters||commit||state, data
          addByNumAction({commit},num){
            setTimeout(()=>{
              commit('addNum',num);
            },1)
          }
        }
      })
      //导出store
      export default store;

      组件中使用getter
        {{getMyNum}}
        注意：getter结合computed使用
        computed: {
          getMyNum() {
            this.$store.getter.getNum;
          }
        }

      组件中使用mutation
        通过action调用mutation  
      methods:{
        addByNum(){
          this.$store.commit('addNum', 5);
        }
      }

      组件内调用action
      methods:{
        addByNumAsync(){
          this.$store.dispatch('addByNumAction', 5);
        }
      }  

    4.辅助函数
       ...mapActions ...mapGetters  ...mapMutations

       使用：
        {{getNum}}
        1.引入 import { mapGetters } from 'vuex';
        computed:{
          ...mapGetters([
            'getNum',
            'getText'
          ])
        } 

      总结：
         1.action中有可能去发送请求（异步）
           万一异步行为存在与mutation中的话会
           导致本次改的数据的记录丢失

         2. 开发中必须要踩得坑
            业务中给state添加属性，但是state中没有这个属性
            此时在mutation中我们要手动添加双向绑定
            vue双向绑定原理 Object.defineProperty

            mutation:{
              addProps(state,name){
                if(!state.name) {
                  Vue.set(state, 'name',name)
                    // 实例对象.$xxx;
                    // 构造函数对象.xxx
                } else {
                  state.name = state；
                }
              }
            } 

         3.跨页面传参的话可以使用本地存储   

         4. webpack配置文件 config---index.js文件中
             productionSourceMap: true, 加快打包速度，增大打包体积，依赖.map文件

         5. ## http-server 工具
            npm i -g http-server 
            npm -o -p 9999