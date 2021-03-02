<template>
  <div>
    <nav-header />
    <el-container>
      <side-bar />
      <el-container class="content-body">
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.content-body {
  padding: 15px 0px;
}
.el-header {
  background-color: #5b8cff;
  color: #fff;
  line-height: 60px;
  font-size: 20px;
}

.el-aside {
  color: #333;
}
.el-main {
  height: calc(100vh - 60px - 20px);
}
</style>
<script>
import navHeader from "./NavHeader.vue";
import sideBar from "./SideBar.vue";

export default {
  name: "Layout",
  components: {
    navHeader,
    sideBar
  }
};
</script>
