####  Paw 测试接口和 postman 类似
 1. webpack  打包工具
     作用：将静态的资源文件打包成html，css，js文件

     Commonjs CMD  UMD 前端规范

     包管理器 npm yarn

  2. 模块实现
     a. 下载webpack为项目开发依赖
        npm install webpack@版本号 -D

     b. 创建main.js作为项目的入口文件

     c. 执行下面的打包命令
          webpack 入口文件 -o 出口文件

  3. npm 命令编辑
      在package.json 中可以配置npm 命令 如npm run dev | npm run pro等
      在"scripts": {
        // key值代表npm run 后面加的那个字段  value值为webpack打包命令 ### -o 后面的输出的是一个文件夹
        "***": "webpcak */** -o */**"
      }        
 
    导出的时候可以导出对象
    var app = {
      template: ``;
    }
    export default app; // 导出的是一个组件

    导出一整个对象key导出
    export var num1 = 2;   // 声明并导出
 
    声明再导出
    var num2 = 3;
    export {num2} 

    声明导出一个函数
    export default add() {}

    导入的时候事业  import {**, **, **} from "./**"

    也可以整块导出
    import * as obj from "./**";  使用时使用 obj.add()


