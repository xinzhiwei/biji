// 入口文件
require.config({
  baseUrl: 'js',
  paths: {
    jquery: 'lib/jquery-1.6.4.min',
    server: 'server'
  }
})
require(['jquery', 'views/saleman'],function($, salemanView){
   // $('.aside-item').on('click',function(){})
   // 上述事件绑定方式比较浪费性能，因为页面中有3个元素，所以这种事件会绑定3次
   // 建议： 使用事件委托的方法： 事件委托其实就是把事件绑定到父元素或者祖先元素上面，然后让子元素触发

   // 1.事件委托方法绑定事件
   $('.aside').on('click', '.aside-item', function() {
     // 2. 通过判断元素是否有指定的类名，从而实现要绑定的方法
     if($(this).hasClass('aside-saleman')) {
       // 销售员
       salemanView();
     } else if($(this).hasClass('aside-car')) {
          // 汽车
     } else if($(this).hasClass('aside-shop')) {
       // 经销商
     }
   })
   // 默认点击第一个菜单栏
   $('.aside .aside-item:eq(0)').trigger('click');
})