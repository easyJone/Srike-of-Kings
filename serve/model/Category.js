//数据库模型文件：
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {type:String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: "category"},
});

module.exports = mongoose.model("category", schema);