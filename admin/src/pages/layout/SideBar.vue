<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" :default-active="$route.path" router>
      <el-submenu
        v-for="(item, i) in $router.options.routes"
        v-show="item.children"
        :index="item.path"
      >
        <template slot="title">{{ item.meta.title }}</template>
        <el-menu-item v-for="(sec, j) in item.children" :index="sec.path">{{
          sec.meta.title
        }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
<script>
export default {
  name: "sidebar",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getRouter() {
      // console.log('tag', '')
      // console.log($router)
    }
  }
};
</script>
