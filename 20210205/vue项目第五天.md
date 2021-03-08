#### vue父子组件传参
  1.子向父通信
    传递函数
      父组件
        <son :sonMsg="msg"></son>
      子组件
        props: ['sonMsg']
        
    EventBus
      使用EventBus进行父子组件传参
      用法：1.新建一个EventBus.js
            import Vue from 'vue'
            let Bus = new Vue();
            export default Bus;

          2. app.vue 使用EventBus
            import Bus from './EventBus';
            created() {
              // 父先监听
              Bus.$on('changeStus',function(data) {
                this.stus = data;
              })
            }

          3.子组件
             import Bus from './EventBus';
             methods: {
               change() {
                 // 该机制其实就是保持父组件的函数
                 this.$emit('changeStus', 参数)
               }
             } 

      官方推荐：
        子组件
          this.$emit('changeDat',参数)；

        父组件
          <son :changeDat="changeDat">
          changeDat(参数) {}               
              
       

  2.子接收数据处理展示
    vue中数据流是从父到子的向下的数据流
      当父组件的属性发生改变，子组件使用了该属性会同步

  3.子接收数据更新  

  4.异步加载async

  5.vue进入离开动画
    进入动画 v-enter-active 包涵下面2个
      插入前    插入后     
      v-enter  v-enter-to
    离开动画 v-leave-active 包涵下面2个
       移除前    移除后
      v-leave  v-leave-to

    v指的是transition标签里的name属性值  

    使用  主要过渡的元素外部要价格tarnsition标签
       <tarnsition name='fade'>11</transition>  
          样式部分
           /* 元素被移除前默认有一个透明度1的显示的 */
          .fade-leave{
             opacity:0;
          }
          .fade-enter-active {
            animation: bounce-in 1s;
          }
          @keyFrames bounce-in{
            0%{
              transform: treanslate3d(0,0,0);
            }
          }

  总结：
     1.计算属性computed 
      子组件可以通过接收父组件的属性，并computed起来，用新的结果作为return的展示（监视并添油加醋即修改信息）

      2.如果希望有自己的个性数，不能直接在data中赋值如：
        props:['img']
        data() {return { img: this.img }}  // 错误写法
        可以使用computed，展示的时候以父组件属性为主，computed数据为辅

      

