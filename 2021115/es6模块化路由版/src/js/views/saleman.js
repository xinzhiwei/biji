define(['jquery','server/salemanService', 'views/add'], function($,salemanService, addSaleman) {
  return function() {
    // console.log('调用了销售');
    // 渲染出一个销售列表页面
    var str = `<div>
                  <div>操作：
                    <button class="add">添加</button>
                    <button>查询</button>
                  </div>
                  <table border="2" cellpadding="30">
                    <thead>
                      <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${salemanService.getList().map(item=>{
                        return `<tr>
                          <td>${item.name}</td>
                          <td>${item.age}</td>
                          <td><button>编辑</button></td>
                        </tr>`
                      }).join("")}
                    </tbody>
                  </table>
                </div>`;

    // 添加操作
    var $salemanAdd = $(str);
    // 进行添加操作
    $salemanAdd.on("click", ".add", function(){
      addSaleman();
    });

    $('.main .content').html($salemanAdd);
  }
});