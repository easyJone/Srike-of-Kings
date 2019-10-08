<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/category/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //请求列表数据：
    async _queryData() {
      const items = await this.$http.get("/categories");
      this.tableData = items.data;
    },
    //删除数据：
    remove(row) {
      this.$confirm(`是否确认删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.post("/categories/delete", {
          id: row._id
        });
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this._queryData();
        }
      }).catch(() => {});
    }
  },
  created() {
    this._queryData();
  }
};
</script>

<style lang="" scoped>
</style>