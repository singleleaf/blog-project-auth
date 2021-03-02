<template>
  <div class="content-wrap">
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="articleList"
      tooltip-effect="dark"
      :default-sort="{ prop: 'date', createTime: 'descending' }"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="createTime"
        sortable
        label="日期"
        :formatter="timeFormatter"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column prop="title" align="center" label="文章标题">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toEdit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row._id)"
            >删除</el-button
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

    <div>
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :total="sumList"
      >
      </el-pagination>
    </div>
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
      sumList: 0,
      status: 0,
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
          var data = res.body;
          this.articleList = data.list;
          this.sumList = data.count;
        });
    },

    toEdit(id) {
      this.$router.push(`editArticle/${id}`);
    },
    toDel(id, list) {
      let params = {
        id
      };
      let url = "/delArticle";
      if (list) {
        params.list = list;
        url = "/delArticleBatch";
      }
      this.axios.post(url, params).then(res => {
        // console.log(res.data)
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
    // 搜索
    handleSearch() {
      this.page = 1;
      this.getArticleList();
    },
    handleDel(id) {
      this.$confirm(
        "此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
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
      this.$confirm(
        "此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.toDel(null, this.selectedList);
        })
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
    handlePageChange(curPage) {
      this.page = curPage;
      this.getArticleList();
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
  margin: 15px;
}
</style>
