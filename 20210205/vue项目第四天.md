   #### 商品列表----购物车
     1. 商品展示界面，字数多，导致每个商品块对不齐
        解决方法：
           1.使用瀑布流
           2. 全局设置一个过滤器
             控制字数的过滤器  在main.js中
            Vue.filter('controllShow',function(str,num){
              //字符串大于num，返回原值
              if(str.length<num){
                return str;
              } else {
                return str.substr(0,num-1)+'...';
              }
              //大于num，截取
            })

     2. 上拉加载更多
        注意：刚进入页面时获取后端数据为赋值，下拉加载后需要添加
        data(){ return {page:0} }
        this.$axios.get().then(res=>{
          // 数据没有10项，我们就默认为到头了
          let{length} = res.data.message;
          if(length<10) {
            this.$toast('没有更多了');
            //没有数据了
            this.allLoaded=true;
            return;
          }

          if(this.page === 1){
            this.goodsList = res.data.message;
          } else {
            this.goodsList = this.goodsList.concat(res.data.message);
          }
          this.page ++;
        }) 

        会出现一个小bug，你稍微滑动一点就会触发上拉，下拉加载，频繁触发会使代码异常，
        解决办法：当加载完数据后，为父容器计算高度
        mouthed() {
          // 父容器高度（可视）=设备高度-父容器的top
          this.wrapperHeight = document.documentElement.getBoundingClientRect().top;
        }

        合并请求 $axios.all([]).then().catch()
          例子： 
            let imgReq = this.$axios.get(`****/${this.goodsId}`);
            let infoReq = this.$axios.get(`xxxx/${this.goodsId}`);
            // 合并请求
            this.$axios.all([imgReq, infoReq]).then(
              // 接收的参数需要分发
              this.$axios.spread((imgRes,infoRes)=>{
                this.imgs = imgRes.data.message;
                this.infos = infoRes.data.message;
              })
            ).catch(console.log)

       图文介绍 商品评论     

    总结：Loadmore中的属性
         1. buttomLoad 函数 加载函数 
         2. bottom-all-loaded  禁止加载函数，默认为false
         3. auto-fill 默认true 自动检测父容器，并标有buttomload直到撑满父容器
         4. pull 拉到未满足70px，drop达到70px，loading加载中
         5. loadmore组件对象的onBottomLoaded() 通知结束loading进入pull状态
         6.在组件上写ref='xxx' ，在js中通过 this.$refs.xxx 获取组件对象（在普通dom上的话就会获取这个dom对象）
         7. 上拉加载更多公式 
          进入检测机制 => 可视高度 + 卷入高度 = 全部数据高度
         8. 暂且不把父子属性混为一谈，可能造成不显示或者
            更新失败的问题 

         9. 客户端渲染和服务端渲染区别
            在浏览器上面加载一个页面  服务器起一个服务 
            页面内容多时，客户端与服务端都会有卡顿现象
              单页面应用，整个就第一次是一个页面响应
               客户端做小型的渲染工作，体验比较好，不会有页面跳转的行为
            性能区别
              客户端渲染机器性能不如服务器
            用户体验
               客户端渲染更优，避免跳转带来的闪烁  
            单页应用和多页应用的区别
               单页面应用： 一次加载整个页面，局部替换（首屏容易卡顿）
               多页面应用： 每次都是一整个页面，页面会跳转闪烁（首屏容易卡顿）
                服务端渲染性能更好，客户端渲染结合单页面应用体验更加 

         10. 前后端分离概念
              传统开发 
                 前端必须依赖后端响应的包含数据的页面  
              前后端分离
                 1. 不依赖后端的运行环境
                 2. 需要响应页面nginx
                 3. 需要请求数据 ajax
                 4. 需要得到数据 json-server模拟数据
                 













                    
               


        
               
            
                    