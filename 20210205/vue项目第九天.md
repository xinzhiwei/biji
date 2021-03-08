   vue多页面应用（MAP）
  核心思想：
     2个或者多个vue项目，一次webpack打包，关联用URL联系   
     2个vue项目的index.html通过webpcak的 html-webpack-plugin关联
     main.js文件通过entry js文件入口，来控制打包
  
    webpack操作
       1.多个入口 {main1:'./usermain.js, main2:'./goodsmain.js'}
       2.多个html插件

    注意事项：
      // 文件名
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每页都会引入所有的js脚本 manifest页面需要的js  vendor依赖
      chunks: ['manifest', 'vendor', filename],
      inject: true   

    单页面应用修改为多页面步骤：  
       1. 新建项目 vue create 项目名称
       2. 修改项目
            src文件下新建文件夹，把main.js 与路由的index.js文件剪切复制到每个新建的文件夹下，其他删除如下
            src
             project
              project1  // 项目1
                index.js  // 路由js
                main.js   // 入口js.
                app.vue
                index.html

              project2 // 项目2 
                index.js  // 路由js
                main.js   // 入口js
                app.vue
                index.html

       3.webpack中修改入口文件
          module.exports = {
            context:***,
            entry: {
              project1: './src/project/project1/main.js',
              project2: './src/project/project2/main.js',
            },

            // html页面的配置
            new HtmlWebpackPlugin({
              filename: project1.index.html,
              template: path.join(__dirname, './src/project/project1/index.html'),
              inject: true,
              // 入口时间就是entry的key
              chunks:['manifest','vendor','project1'],
              minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
              },
              chunksSortMode: 'dependency'
            }),
            new HtmlWebpackPlugin({
              filename: project2.index.html,
              template: path.join(__dirname, './src/project/project2/index.html'),
              inject: true,
              // 入口时间就是entry的key
              chunks:['manifest','vendor','project2'],
              minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
              },
              chunksSortMode: 'dependency'
            })
          }  

     4. 跨域的问题
         在vue.config.js webpack配置文件中
          devServer: {
            historyApiFallaback: true,
            noInfo: true,
            overlay: true,
            proxy: {
              '/api': {
                targget: 'http://*******',
                pathRewrite: {'^/api': ''},
                changeOrigin: true  //必须加，否则是访问自己
              }
            }
          }  

      5. 预渲染
         单页应用（spa）  首先加载index.html
         在单页面应用中预渲染部分，静态数据，不变化的页面(如关于我的)


         

   总结
     SEO 搜索引擎的优化 
     SSR 服务端渲染  

     骨架屏的webpack插件编写， apply函数可以参与webpack插件的执行
        plugin('编译')
          操作文件assers[文件名] = {source内容函数，size大小函数}
        介入其他插件留下的世界函数
        webpack按顺序执行

      多页面应用 MPA
          js入口多入口
          html插件做多插件
            配置其不同的filename 和template 属性
            chunks描述各自引入的资源

      预渲染是在spa 单页面应用中可以解决局部页面的SEO问题
       提前生成页面， URL 匹配直接返回该页面          
       生成xxx.html页面 该页面SEO得到优化  

      跨域
        开发 webpack proxy-middleware代理
        生产的话 使用 nginx代理 
