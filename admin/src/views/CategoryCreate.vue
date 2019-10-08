<template>
  <div>
    <h1>{{id ? "编辑" : "新建"}}分类</h1>
    <el-form :model="model" ref="form" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择上级分类">
          <el-option v-for="item in parentObjs" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.post("/categories/edit", this.model);
      } else {
        //发送请求
        res = await this.$http.post("/categories", this.model);
      }
      this.$router.push("/category/list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    },
    async fetch() {
      //获取某一分类的数据详情
      const res = await this.$http.get("/categories/getDetail", {
        params: { id: this.id }
      });
      this.model = res.data;
    },
    async fetchParents() {
      //获取所有数据提取为上级分类的选择数据
      const items = await this.$http.get("/categories");
      this.parentObjs = items.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style lang="" scoped>
</style>