define([], function() {
   var saleman = [
     {name: '小王', age: 30},
     {name: '消化', age:20},
     {name: '马丁尼', age: 25}
   ];

  return {
    getList(){
      return saleman;
    },
    add(name, age){
      saleman.push({name, age});
    },
    update(){},
    del(){}
  }
});