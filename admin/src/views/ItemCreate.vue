<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}物品</h1>
    <el-form :model="model" ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{id ? "保存" : "新建"}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      model: {},
      parentObjs: []
    };
  },
  methods: {
    afterUpload(res) {
      //图片上传后函数
      // console.log(res);
      this.$set(this.model,'icon', res.url);
    },
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.post("/rest/items/edit", this.model);
      } else {
        //发送请求
        res = await this.$http.post("/rest/items/create", this.model);
      }
      this.$router.push("/item/list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    },
    async fetch() {
      //获取某一分类的数据详情
      const res = await this.$http.get("/rest/items/getDetail", {
        params: { id: this.id }
      });
      this.model = res.data;
    },
    async fetchParents() {
      //获取所有数据提取为上级分类的选择数据
      const items = await this.$http.get("/rest/items/list");
      this.parentObjs = items.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>