<template>
  <div>
    <div class='whole-wrap'>
      <el-row :gutter="15">
        <el-col :span="6"
                v-for='article in articleList'>
          <div class="grid-content bg-white">
            <!-- <img src="@/assets/images/pic1.jpg"
               alt=""> -->
            <div class="article-con">
              <!-- <label>{{article.categoryId.categoryName}}</label> -->
              <h6>{{article.title}}</h6>
              <!--
            <p>{{article.content}}
            </p> -->
              <mavonEditor class="mavon-box"
                           codeStyle="dark"
                           :value="article.content"
                           :toolbarsFlag="toolbarsFlag"
                           :subfield="toolbarsFlag"
                           defaultOpen="preview"></mavonEditor>
              <span>{{ article.createTime? timeFormatter(article.createTime) : '' }}</span>
              <a @click="toDetail(article._id)">阅读全文</a>

            </div>

          </div>
        </el-col>

      </el-row>
      <div class="empty"
           v-if="!articleList.length">没有相应的文章</div>
      <!--  <span>{{totalPage}}</span> -->

    </div>
    <div>
      <el-pagination background
                     layout="prev, pager, next,total"
                     :total="totalPage"
                     :page-size="8"
                     @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'
export default {
  name: 'ArticleList',
  components:{
    mavonEditor,
  },
  props:{
    articleList:{
      type:Array

    },
     totalPage: {
      type: Number,
      default: 0
    }
  },

  data() {
   return {
      toolbarsFlag: false,



      }
  },
  mounted(){


  },
   methods:{
    timeFormatter(cellValue) {
      return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    },
     handlePageChange(currPage) {
      this.$emit('pageChange', currPage)
      console.log(currPage)
    },
     toDetail(id) {
      this.$router.push(`/ArticleDetail/${id}`)
    },


   }
}
</script>
<style scoped lang="less">
@color:#0a89a3;
@decordColor:#858585;


.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-row{
    .bg-white{
      background: white;
      border-radius: 0px;
      overflow: hidden;
      border-bottom: 10px solid #f4f4f5;
      img{
        height: 136px;
      }
      .article-con{
        padding: 12px 10px;
        text-align: center;
  
          label, span{
            color: @decordColor;
            font-size: 12px;
          }
          span{
            display:block;
            margin-bottom:10px;
          }
           h6{
             font-size: 15px;
             color:@color;
             margin-bottom: 10px;
             font-weight: normal;
           }
           p{
             font-size: 13px;
             color: #2d3b3e;
             line-height: 1.75;
             padding-bottom: 10px;

           }
           a{
             position: relative;
             font-size: 16px;
             color: @color;
             margin-top: 3px;
             cursor: pointer;
             &::after,&::before{
               content: '';
               position: absolute;
               display: block;
               width: 2px;
              height: 25px;
               background: #e1e1e1;
               top: -3px;
             }
              &::after{
                right: -10px;
              }
              &::before{
                left: -10px;
              }
           }
      }

    }

  }
  /deep/
  .el-pagination.is-background .el-pager {
   li:not(.disabled).active{
    background-color: #0a89a3;
  }
  li:not(.disabled):hover{
    color: #0a89a3;
  }
  }
   

.mavon-box {
   min-height: auto;
    min-width: auto;
   /deep/
   .v-note-panel.shadow{
    box-shadow: none!important;
   }

   /deep/
   .v-show-content{
    padding:0px!important;
    background: white!important;
    height: 180px!important;
    overflow: hidden!important;
    .hljs-left >p:first-child{
      display: -webkit-box;
      -webkit-box-orient: vertical;
       -webkit-line-clamp: 3;
       overflow: hidden;
       font-size: 13px;
    }
    
   }
   /deep/
   .v-show-content img{
    height:86px;
    max-width: auto;
    width: 100%;
   
   }
  
   

}



</style>
