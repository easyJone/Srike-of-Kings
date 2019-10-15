const express = require("express");


const app = express();

//挂载中间件：
app.use(express.json());//可以访问req.body
app.use(require("cors")());//可以跨域访问
app.use('/uploads', express.static(__dirname + '/uploads'));//静态化中间件

//加载路由文件：
require("./routes/admin/index.js")(app);
require("./plugins/db")(app);



app.listen(3000,() => {
  console.log('http://localhost:3000');
})