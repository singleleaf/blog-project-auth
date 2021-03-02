<template>
  <div>
    <div class="form-item flex-wrapper">
      <span>文章标题：</span>
      <el-input
        class="title"
        v-model="article.title"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="form-item">
      <span>文章分类：</span>
      <el-select v-model="article.category" placeholder="请选择分类">
        <el-option
          v-for="(item, i) in categories"
          :key="item.value"
          :label="item.categoryName"
          :value="item._id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="form-item">
      <span>文章标签：</span>
      <el-select
        multiple
        filterable
        allow-create
        default-first-option
        v-model="article.tag"
        placeholder="请选择标签"
      >
        <el-option
          v-for="(item, i) in tags"
          :key="item.value"
          :label="item.tagName"
          :value="item._id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="form-item">
      <!-- markdown插件 -->
      <mavon-editor
        id="mark"
        ref="md"
        @change="markdownChange"
        @imgAdd="imgAdd"
        v-model="article.content"
        codeStyle="atom-one-dark"
        class="mark-editor"
      />
    </div>
    <el-button type="primary" @click="submit">发布</el-button>
    <el-button
      type="warning"
      v-if="this.detail.status !== 0"
      @click="saveDraft"
      >{{ this.detail.status === undefined ? "存为草稿" : "保存" }}</el-button
    >
    <!-- <span v-text="detail"></span> -->
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
export default {
  name: "ArticleForm",
  props: {
    detail: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      // 现有的所有分类
      categories: [],
      // 现有的所有标签
      tags: [],
      article: {
        id: null,
        title: "",
        category: "",
        tag: [],
        content: "",
        html: "",
        status: 0
      }
    };
  },

  watch: {
    detail: {
      handler(newObj, oldObj) {
        console.log(newObj);
        let detail = newObj;

        if (!this.detail.tagId) {
          article.tag = [];
        } else {
          this.article.tag = this.detail.tagId.map(item => {
            return item._id;
          });
        }
        this.article.title = detail.title;
        this.article.category = detail.categoryId;
        this.article.html = detail.html;
        this.article.content = detail.content;
        this.article.status = detail.status;
        this.article.id = detail._id;
      },
      deep: true //动态属性监控不到的解决
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.initData()
  },
  mounted() {
    this.getArticleOptions();
    //  this.initData()
    // 去服务端生成七牛token
    // this.fetchUploadToken();

    //  console.log(this.detail)
  },
  methods: {
    markdownChange(markdown, html) {
      this.article.html = html;
    },
    getArticleOptions() {
      this.axios.get("/getArticleOptions").then(res => {
        let data = res.body;
        this.categories = data.categoryList;
        this.tags = data.tagList;
      });
    },
    postArticle() {
      this.axios.post("/postArticle", this.article).then(res => {
        console.log(res.data);
        if (res.status === 200) {
          if (res.data.list.id) {
            //  清空文章内容
            this.article = {
              id: null,
              title: "",
              category: "",
              tag: "",
              content: "",
              html: "",
              status: 0
            };

            this.$router.push({
              path: `/EditArticle/${id}`
            });
          }
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    saveDraft() {
      console.log("存为草稿");
      this.article.status = 1;
      this.postArticle();
    },
    fetchUploadToken() {
      this.axios.get("/getQiniuToken").then(res => {
        if (res.status === 200) {
          this.token = res.data.token;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    imgAdd(pos, file) {
      this.file = file;
      this.pos = pos;

      let key = this.file.name;
      //调用七牛的接口将图片上传至七牛
      let observable = qiniu.upload(this.file, key, this.token);
      observable.subscribe(
        this.uploadNext,
        this.uploadError,
        this.uploadComplete
      );
      return false;
    },
    uploadNext(res) {
      // ...
    },
    uploadError(err) {
      alert(err);
    },
    uploadComplete(res) {
      // 取得七牛返回的url
      //  url = 'http://你七牛的外链默认域名/' + res.key
      // ptusx73o5.bkt.clouddn.com
      let url = "http://pzz0ro2he.bkt.clouddn.com/" + res.key;

      this.$refs.md.$img2Url(this.pos, url);
    },

    submit() {
      this.article.status = 0;
      this.postArticle();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
><style scoped>
.topic {
  font-size: 22px;
  font-weight: bold;
  color: #79a1fb;
}

.form-item {
  margin: 10px 0;
}
.selector {
  width: 500px;
}

.flex-wrapper {
  display: flex;
  flex-wrap: nowrap;
}

span {
  line-height: 38px;
  margin-right: 4px;
}

.title {
  flex: 1;
}
.mark-editor {
  height: 500px;
}
</style>
