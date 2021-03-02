<template>
  <div class="content-wrap">
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <el-table
      :data="articleList"
      :default-sort="{ prop: 'date', order: 'descending' }"
      tooltip-effect="dark"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="timeFormatter"
        label="创建时间"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column label="文章标题" sortable width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="recovery(scope.row._id)"
            >恢复至草稿箱</el-button
          >
          <el-button size="mini" type="danger" @click="handleDel(scope.row._id)"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      style="margin:15px 0px"
      size="middle"
      type="danger"
      @click="delArticleBatch"
      >批量删除</el-button
    >
    <el-button size="middle" type="warning" @click="recoveryArticleBatch"
      >批量编辑</el-button
    >
    <div style="margin-top: 20px"></div>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination> -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      inputSeach: "",
      keyword: "",
      page: 1,
      status: 2,
      selectedList: []
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    //获取文章列表
    getArticleList() {
      this.axios
        .get("/getArticleList", {
          params: {
            keyword: this.keyword,
            page: this.page,
            status: this.status
          }
        })
        .then(res => {
          var data = res.data.data;
          this.articleList = data.list;
          console.log(data);
          // console.log(this.articleList)
          //  console.log(data.data.count)
        });
    },

    recovery(id) {
      this.$confirm("此操作将把文章恢复至草稿箱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定发送删除请求
          this._recovery(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    recoveryArticleBatch() {
      this.$confirm("此操作将把文章恢复至草稿箱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定发送删除请求
          this._recovery(null, this.selectedList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _recovery(id, list) {
      let params = {
        id
      };
      let url = "/recoveryArticle";
      if (list) {
        params.list = list;
        url = "/recoveryArticleBatch";
      }
      this.axios.post(url, params).then(res => {
        console.log(res.data);
        if (res.data.errcode === 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });

          // 重新加载数据(刷新数据)
          this.getArticleList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    toDel(id, list) {
      let params = {
        id,
        truly: true //判断是否完全删除，true为真的时候完全删除
      };
      let url = "/delArticle";
      if (list) {
        params.list = list;
        url = "/delArticleBatch";
      }
      this.axios.post(url, params).then(res => {
        //console.log(res.data)
        if (res.status === 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          // 重新加载数据(刷新数据)
          this.getArticleList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将把文章彻底删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定发送删除请求
          this.toDel(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delArticleBatch() {
      this.$confirm("此操作将把文章彻底删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.toDel(null, this.selectedList);
        })
        .catch(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item._id;
      });
      //  console.log(this.selectedList)
    },
    timeFormatter(row, column, cellValue, index) {
      return moment(new Date(cellValue)).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style scoped>
.content-wrap {
  width: 100%;
  /* margin: 15px; */
}
</style>
