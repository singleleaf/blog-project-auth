<template>
  <div class="page-404">
    出错了
    <!-- <img :src="`${$assetsPublicPath}static/image/page/404/cover@2x.png`" /> -->
    <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </el-button>
  </div>
</template>

<style scoped>
.page-404 {
  background-color: #555555;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
