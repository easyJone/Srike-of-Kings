import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue';
import CategoryCreate from './views/CategoryCreate.vue';
import CategoryList from './views/CategoryList.vue';

//下段代码解决点击同一路由控制台报错的问题：
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {path: '/category/create', component: CategoryCreate},
        {path: '/category/edit/:id', component: CategoryCreate, props: true},
        {path: "/category/list",component: CategoryList},

      ]
    }
  ]
})
