define(['Route', 'views/saleman', 'views/add'], function(Route, viewsSaleman, viewsAdd) {
  var router = new Route({
    routes: [
      {
        path: '/saleman',
        componet: viewsSaleman
      },
      {
        path: '/add',
        component: viewsAdd
      }
    ]
  })
})