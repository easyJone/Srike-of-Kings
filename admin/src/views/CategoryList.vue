<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="名称" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/category/edit/${scope.row._id}`)">编辑</el-button>
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
    async _queryData() {
      const items = await this.$http.get("/categories");
      this.tableData = items.data;
    }
  },
  created() {
    this._queryData();
  }
};
</script>

<style lang="" scoped>
</style>