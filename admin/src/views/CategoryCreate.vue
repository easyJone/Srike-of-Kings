<template>
  <div>
    <h1>新建分类</h1>
    <el-form :model="model" ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        model: {}
      }
    },
    methods: {
      async onSubmit() {
        //发送请求
        const res = await this.$http.post("categories",this.model);
        console.log(res);
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>