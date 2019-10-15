import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue';
import CategoryCreate from './views/CategoryCreate.vue';
import CategoryList from './views/CategoryList.vue';
import ItemCreate from './views/ItemCreate.vue';
import ItemList from './views/ItemList.vue';

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
        {path: '/category/edit/:id', component: CategoryCreate, props: true},//这里props：true表示将动态参数注入到组件内。
        {path: "/category/list",component: CategoryList},

        {path: '/item/create', component: ItemCreate},
        {path: '/item/edit/:id', component: ItemCreate, props: true},//这里props：true表示将动态参数注入到组件内。
        {path: "/item/list",component: ItemList},

      ]
    }
  ]
})
