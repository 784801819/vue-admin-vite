<script setup lang="ts">
import { ElMessage } from "element-plus"
const clickShow = () => {
  ElMessage('哈哈哈哈哈！')
}
</script>

<template>
  <div class="about">
    <h1>This is an about page <span>1</span></h1>
    <el-button @click="clickShow">Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <TestView />
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: 12px;
  span {
    color: red;
  }
}
</style>