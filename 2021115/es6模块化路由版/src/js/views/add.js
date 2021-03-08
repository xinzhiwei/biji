define([
  'jquery',
  'server/salemanService',
  'require',
  'views/saleman'
], function($,salemanService,require) {
  return function() {
    var addStr=`
      <form>
       <label>姓名：</label><input name="name">
       <label>姓名：</label><input age="age">
       <button type="submit">提交</button>
      </form>
    `;

    // 1. 把同步的表单变成异步表单：阻止form的submit事件的默认行为
     var $add = $(addStr);
     $add.on('submit', function(e) {
       e.preventDefault();
       // 2. 自己去获取表单数据，进行数据操作
       var name = $(this).find('input[name=name]').val();
       var age = $(this).find('input[age=age]').val();
       salemanService.add(name, age);

       // 3. 回到saleman页面
       // 方法1： $('.aside .aside-item:eq(0)').trigger('click');
       // 方法2
       require('views/saleman')();
     }); 

    $('.main .content').html($add);
  }
});