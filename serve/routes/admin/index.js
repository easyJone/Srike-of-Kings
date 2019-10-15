//后台路由管理文件：
module.exports = app => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true //合并参数以便req能获取到rest/resoutce
  });

  //创建分类接口
  router.post('/create', async (req, res) => {
    // 定义接口存储数据库，返回数据：
    const model = await req.Model.create(req.body); //若使用req.body需加载express.json()中间件
    res.send(model);
  })

  //修改分类接口
  router.post('/edit', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  })

  //删除分类接口
  router.post('/delete', async (req, res) => {
    await req.Model.findByIdAndDelete(req.body.id);
    res.send({
      code: 200,
    });
  })

  //获取分类列表接口
  router.get('/list', async (req, res) => {
    const option = {};
    if(req.Model.modelName === 'Category') {//判断是否需要关联到集合并返回
      option.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(option).limit(10); //限制返回数据条数
    res.send(items);
  })

  //获取某一分类详情接口
  router.get('/getDetail', async (req, res) => {
    const model = await req.Model.findById(req.query.id);
    res.send(model);
  })


  app.use("/admin/api/rest/:resource",(req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);//改categories为Category的转换插件
    req.Model = require(`../../model/${modelName}`);
    next();
  }, router);

  const multer = require("multer");
  const upload = multer({dest: __dirname + '/../../uploads'});//为保证目录正确,先dirname再向外查找.
  app.post('/admin/api/upload',upload.single('file'),(req,res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file);
  })
}