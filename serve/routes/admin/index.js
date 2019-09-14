//后台路由管理文件：
module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../model/Category");

  //创建分类接口
  router.post('/categories', async (req, res) => {
    // 定义接口存储数据库，返回数据：
    const model = await Category.create(req.body); //若使用req.body需加载express.json()中间件
    res.send(model);
  })

  //修改分类接口
  router.post('/categories/edit', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  })

  //获取分类列表接口
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10); //限制返回数据条数
    res.send(items);
  })

  //获取某一分类详情接口
  router.get('/categories/getDetail', async (req, res) => {
    const model = await Category.findById(req.query.id);
    res.send(model);
  })


  app.use("/admin/api", router);
}