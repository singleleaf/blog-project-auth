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
        label="创建时间"
        sortable
        width="180"
        :formatter="timeFormatter"
      >
      </el-table-column>
      <el-table-column label="文章标题" sortable width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
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
    <div style="margin-top: 20px"></div>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000"> -->
    <!-- </el-pagination> -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DraftList",
  data() {
    return {
      articleList: [],
      inputSeach: "",
      keyword: "",
      page: 1,
      status: 1,
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
          var data = res.data;
          this.articleList = data.data.list;

          console.log(this.articleList);
          console.log(data.data.count);
        });
    },

    toEdit(id) {
      this.$router.push({
        name: "EditArticle",
        params: {
          id: id
        }
      });
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
