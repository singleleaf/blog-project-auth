<template>
  <div class='whole-wrap'>
    <div class="head">
      <div class="head-wrap">
        <nav class="nav-head">
          <nav-head></nav-head>
        </nav>
        <div class="search-box">
          <div>
            <el-input placeholder="请输入内容"
                      v-model="keyword">
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="getArticleList"></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <slide-play></slide-play>
    </div>
    <div class="main-body">
      <article-list :articleList="articleList"
                    :totalPage="totalPage"
                    @pageChange="pageChange"></article-list>
      <!--  <router-view></router-view> -->
    </div>

    <body-footer></body-footer>
  </div>
</template>
<script>
import NavHead from './NavHeader.vue'
import BodyFooter from './BodyFooter.vue'
import SlidePlay from '@/components/SlidePlay.vue'
import ArticleList from '@/views/article/ArticleList'
export default {
  name: 'LayOut',
  components: {
    NavHead,
   BodyFooter,
   SlidePlay,
   ArticleList
  },
  data() {
      return {
        articleList:[],
        inputSeach:'',
        keyword: '',
        page: 1,
        totalPage: 0


      }
    },

  mounted(){
    this.getArticleList()
  },
   methods:{
    // 分页
    pageChange(page) {
      this.page = page
      // console.log(this.page);
       this.getArticleList()
    },
    //获取文章列表
      getArticleList(){
        this.axios.get('/c/getArticleList',{
          params:{
            keyword:this.keyword,
            page: this.page


          }

        }).then(res =>{
          var data =res.data
          this.articleList =data.data.list
          this.totalPage = res.data.data.count
          // console.log(data)
          // console.log(this.articleList)
           console.log(data.data.count)


        })
      }
   }
}
</script>
<style scoped lang="less">
@width:62.5%;
.whole-wrap{
  color: #2c3e50;
  background: #f4f4f5;
}
.head-wrap{
  position: relative;;
  width:@width;
  margin:auto;
}
.nav-head{
  position: absolute;
  left: 0;
  top: 0;
}
.search-box{
  position: absolute;
  top: 15px;
  right: 0px;
  background: transparent;
  /deep/
  .el-input__inner{
   background: transparent;
    border: none;
    color: white;
    display: inline-block;
    width: 168px;
    padding: 0px 10px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    border: 1px solid white;
  }
    /deep/
  .el-input-group__append{
  color: white;
  background: transparent;
  padding: 0px 10px;
}
}
.main-body{
  width:@width;
  margin:auto;
  padding: 25px 0px 20px;
}




</style>
