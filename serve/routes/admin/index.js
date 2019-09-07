//后台路由管理文件：
module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../model/Category");
  router.post('/categories', async (req, res) => {
    // 定义接口存储数据库，返回数据：
    const model = await Category.create(req.body); //若使用req.body需加载express.json()中间件
    res.send(model);

  })

  app.use("/admin/api", router);
}