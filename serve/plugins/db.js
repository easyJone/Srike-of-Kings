//连接数据库：
module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.log(err, "数据库连接失败");
    } else {
      console.log("数据库连接成功！");
    }
  })
}