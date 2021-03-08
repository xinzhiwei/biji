#####　webpack基础2
   1  "scripts": {
        // key值代表npm run 后面加的那个字段  value值为webpack打包命令 ### -o 后面的输出的是一个文件夹
        "***": "webpcak */** -o */**"
      }

      如上在package.json中的scripts中进行如上配置，显示太out，
      可以新建webpcak.config.js 来配置webpcak
       例子： 
          webpcak.json 中
          "scripts": {
             "***": "webpcak"
           }

           新建webpack.config.js文件，做webpcak的配置文件
            module.exports = {
              // 入口entry为对象 
              entry: {
                // 入口可以有一个，也可以有多个
                "main": "./main.js"
              },
              // 输出对象
              output: {
                filename: "./build"
              },
              watch: true,  // 文件监视改的，自动产出build.js
            }
      
      注意：如果配置完后，修改内容后，在执行npm run build命令后，
            页面修改后，刷新网页，webpcak会自动打包

      新加：优化webpcak打包
        新建 webpack.prod.config.js 文件  生产环境
             webpack.dev.config.js 文件   开发环境

             webpcak.json 文件中scripts也需要配置
               "scripts": {
                 "dev": "webpack --config ./webpack.dev.config.js",
                 "prod": "webpack --config ./webpack.prod.config.js"
               }
              
    使用css， 在main.js中引入 main.css文件后，打包会出现异常， 显示 Module parse failed: Unexpected token   ,you may need on appropriate loader to handle this file type
     此时需要安装 cssloader，
     npm install css-loader style-loader -D    

  ### 自动生成html  
     先安装 npm install html-webpcak-plugin -D  
     使用时需要先引入
     在webpcak.config.js
       const HtmlWebpackPlugin = require("html-webpcak-plugin"); 
       module.exports={
         plugins: [
           // 插件的执行顺序与元素有关
           new HtmlWebpackPlugin({
             template: './src/index.html', // 参照物
           })
         ]
       }      

  ### webpcak-dev-server
      1. 先安装 npm install webpcak-dev-server --save-dev 
         在webpcak.config.js 配置
          --open // 自动打开浏览器 
          --hot  // 热更新
          --inline // 自动刷新
        "scripts": {
          "dev": "webpack-dev-server --open --hot --inline --config"
        }    